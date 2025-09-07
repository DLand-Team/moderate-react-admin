/*
 * @Author: hijiangtao (hijiangtao@gmail.com)
 * @Date: 2019-01-14 20:30:03 
 * @Desc: Trip Layer 
 * @Last Modified time: 2019-01-14 20:30:03 
 */

import { TripsLayer } from '@deck.gl/experimental-layers';
import { CompositeLayer, PolygonLayer } from 'deck.gl';

// Source data CSV
const DATA_URL = {
  BUILDINGS:
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json', // eslint-disable-line
  TRIPS:
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips.json' // eslint-disable-line
};

const LIGHT_SETTINGS = {
  lightsPosition: [-74.05, 40.7, 8000, -73.5, 41, 5000],
  ambientRatio: 0.05,
  diffuseRatio: 0.6,
  specularRatio: 0.8,
  lightsStrength: [2.0, 0.0, 0.0, 0.0],
  numberOfLights: 2,
};

export default class TripMap extends CompositeLayer {
  initializeState() {
    this.state = {
      time: 0,
      raf: null,
    };
  }

  shouldUpdateState({changeFlags}) {
    if (changeFlags.propsChanged || changeFlags.dataChanged || changeFlags.stateChanged) {
      return true;
    }

    return false;
  }

  updateState({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});

    const _animate = () => {
      const {
        loopLength = 1800, // unit corresponds to the timestamp in source data
        animationSpeed = 30, // unit time per second
      } = props;
      const timestamp = Date.now() / 1000;
      const loopTime = loopLength / animationSpeed;
  
      this.setState({
        time: ((timestamp % loopTime) / loopTime) * loopLength,
        raf: window.requestAnimationFrame(_animate),
      });
    }

    if (changeFlags.propsChanged) {
      const {raf} = this.state;
      raf && cancelAnimationFrame(raf);

      _animate();
    }
  }

  renderLayers() {
    const { buildings = DATA_URL.BUILDINGS, trips = DATA_URL.TRIPS, trailLength = 200 } = this.props;

    return [
      new TripsLayer({
        id: 'trips',
        data: trips,
        getPath: d => d.segments,
        getColor: d => (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]),
        opacity: 0.6,
        strokeWidth: 3,
        trailLength,
        currentTime: this.state.time,
        onHover: info => console.log('Hovered:', info),
        onClick: info => console.log('Clicked:', info),
      }),
      new PolygonLayer({
        id: 'buildings',
        data: buildings,
        extruded: true,
        wireframe: false,
        fp64: true,
        opacity: 0.5,
        getPolygon: f => f.polygon,
        getElevation: f => f.height,
        getFillColor: [74, 80, 87],
        lightSettings: LIGHT_SETTINGS,
      }),
    ];
  }
}