import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';

import {LAYER_CONFIGS, INIT_LAYER} from './configs';
import {addMapControl} from './tools';
import {FlyToInterpolator} from 'deck.gl';

import { fetchData } from './fetch';
import optionMenu from './menu';

const LAYER_TYPES = [{
  name: '2.5D/Icon',
  value: 'IconLayer',
}, {
  name: '2.5D/IconCSV',
  value: 'IconCSVLayer',
}, {
  name: '2.5D/Brush',
  value: 'BrushArcLayer',
}, {
  name: '2.5D/Scatter',
  value: 'FadeScatterplotLayer',
}, {
  name: '2.5D/Hexagon',
  value: 'AugmentHexagonLayer',
}, {
  name: '2.5D/Grid',
  value: 'ScreenGridLayer',
}, {
  name: '3D/Globe',
  value: 'Globe',
}, {
  name: '2.5D/Trip',
  value: 'TripLayer',
}];

const PARAMS_TYPES = [{
  name: 'Animation',
  value: true,
}, {
  name: 'Moon',
  value: true,
}];

const GLOBE_SHAPES = [{
  name: 'Curves',
  value: 'curve',
}, 
// {
//   name: 'Points',
//   value: 'point',
// }, 
{
  name: 'CubeMap',
  value: 'cube',
}]

const preventDefault = evt => evt.preventDefault();

const useInit = () => {
  const [layer, setLayer] = useState(INIT_LAYER);
  const [moon, setMoon] = useState(true);
  const [animation, setAnimation] = useState(true);
  const [viewState, setViewState] = useState(LAYER_CONFIGS[INIT_LAYER].INIT_VIEW_STATE);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [globeShape, setGlobeShape] = useState('curve');

  const mapEl = useRef();

  /**
   * App Initialization
   */
  useEffect(() => {
    // event listener
    mapEl.current.addEventListener('contextmenu', preventDefault);
    mapEl.current.addEventListener('mousewheel', preventDefault);

    // fetch data
    fetchData({
      type: layer,
      url: LAYER_CONFIGS[layer].url
    })
    .then((res) => {
      setData(res);
      // dataRef.current = res;
      setRefresh(!refresh);
    })
    .catch(err => console.log(err));

    // menu
    const optionData = {
      rootID: 'menu',
      initData: {
        layer: INIT_LAYER,
        animation: true,
        moon: true,
        shape: 'curve'
      },
      configMap: [{
        title: 'Options',
        content: [{
          property: 'layer',
          name: 'Type',
          setter: setLayer,
          configs: LAYER_TYPES,
          convertType: 'json',
          stateType: 'string',
        }],
      }, {
        title: 'Parameters',
        content: [{
          property: 'animation',
          name: 'Animation',
          setter: setAnimation,
          configs: animation,
          convertType: 'none',
          stateType: 'bool',
        }, {
          property: 'moon',
          name: 'Moon (fixed)',
          setter: setMoon,
          configs: moon,
          convertType: 'none',
          stateType: 'bool',
        }, {
          property: 'shape',
          name: 'Type (Globe)',
          setter: setGlobeShape,
          configs: GLOBE_SHAPES,
          convertType: 'json',
          stateType: 'string',
        }],
      }],
    };

    optionMenu(optionData);

    return () => {
      // remove event listener
      mapEl.current.removeEventListener('contextmenu', preventDefault);
      mapEl.current.removeEventListener('mousewheel', preventDefault);
    }
  }, []);

  const fetchUpdateDataset = async (newLayer) => {
    try {
       const result = await fetchData({
          type: newLayer,
          url: LAYER_CONFIGS[newLayer].url,
        });

        console.log('Data updated')
        setData(result);
        // dataRef.current = result;
        setViewState({
          ...LAYER_CONFIGS[newLayer].INIT_VIEW_STATE,
          transitionInterpolator: new FlyToInterpolator(),
          transitionDuration: 5000
        });
        setRefresh(!refresh);
    } catch (e) {
      console.error(e);
    }
  }

  const handleViewStateChange = ({viewState}) => setViewState(viewState);

  /**
   * Menu selection handler
   */
  useLayoutEffect(() => {
    // fetch data
    // console.log('useLayoutEffect again')
    fetchUpdateDataset(layer);
    // console.log('after fetchUpdateDataset lifecycle', data);

    return () => {
      // console.log('clean again')
      setData([]);
    };
  }, [layer]);

  const addControlHandler = (event) => {
    const map = event && event.target;
    if (map) {
      addMapControl(map);
    }
  };

  return [layer, data, globeShape, viewState, animation, refresh, handleViewStateChange, mapEl, addControlHandler];
}

export {
  useInit
}