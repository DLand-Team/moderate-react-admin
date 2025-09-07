import {
  ScatterplotLayer as FadeScatterplotLayer,
  ScreenGridLayer,
  IconLayer,
  HexagonLayer as AugmentHexagonLayer,
  ArcLayer as BrushArcLayer,
  Globe,
  TripLayer,
} from '../index';

import React, { memo, useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import {StaticMap} from 'react-map-gl';
import DeckGL, {FlyToInterpolator} from 'deck.gl';

import {LAYER_CONFIGS, INIT_LAYER} from './configs';
import {addMapControl} from './tools';
import { MAPBOX_TOKEN } from '../devconfigs';

import { fetchData } from './fetch';
import optionMenu from './menu';
import { useInit } from './state';

import './view.scss';

const Layers = {
  BrushArcLayer,
  FadeScatterplotLayer,
  AugmentHexagonLayer,
  ScreenGridLayer,
  IconLayer,
  IconCSVLayer: IconLayer,
  Globe,
  TripLayer,
}

const PaintMap = (props) => {
  const {
    controller = true, 
    baseMap = true,
  } = props;
  const [layer, data, visType, viewState, animation, refresh, handleViewStateChange, mapEl, addControlHandler] = useInit();

  const Layer = Layers[layer];

  const deckRootEl = useMemo(() => {
    return layer === 'Globe' ? (
      <Globe 
        moon={true}
        visType={visType}
        animate={animation}
        data={data} />
    ) : (
      <DeckGL
        // width="100%" 
        // height="100%" 
        layers={[
          new Layer({
            data,
            ...LAYER_CONFIGS[layer],
          }),
        ]}
        viewState={viewState}
        onViewStateChange={handleViewStateChange}
        controller={controller}
      >
        {baseMap && (
          <StaticMap
            onLoad={addControlHandler}
            // reuseMaps
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        )}
      </DeckGL>
    )
  }, [viewState, refresh, visType])

  return (
    <section>
        {/* TitleBar */}
        <div className="title-container">
          <h3>glmaps demo</h3>
          <p>Read codes in <a href="https://github.com/hijiangtao/glmaps">GitHub</a></p>
          <hr/>
          <code>
            git clone git@github.com:hijiangtao/glmaps.git<br/>
            cd glmaps<br/>
            npm install<br/>
            npm run start
          </code>
        </div>
        
        <div ref={mapEl} style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
        }}>
          {/* New Menu */}
          <div id="menu" />

          {/* Map or Globe layer */}
          {deckRootEl}
        </div>
      </section>
  )
}

export default memo(PaintMap);