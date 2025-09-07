const LAYER_CONFIGS = {
    BrushArcLayer: {
      id: 'arc-brush',
      getSourcePosition: d => d.source,  
      getTargetPosition: d => d.target, 
      showBrushAnimation: true,
      speed: 0.005,
      url: '../data/counties.json',
      INIT_VIEW_STATE: {
        longitude: -104.96,
        latitude: 40.66033,
        zoom: 3,
        minZoom: 2,
        maxZoom: 16,
        pitch: 45,
        bearing: 0,
      }
    },
    FadeScatterplotLayer: {
      id: 'scatterplot-fade',
      pickable: true,
      opacity: 0.8,
      radiusScale: 10,
      radiusMinPixels: 0,
      radiusMaxPixels: 2000,
      getPosition: d => d.COORDINATES,
      getRadius: () => 14000,
      showWaveAnimation: true,
      url: '../data/meteorites.json',
      INIT_VIEW_STATE: {
        longitude: -104.96,
        latitude: 40.66033,
        zoom: 3,
        minZoom: 2,
        maxZoom: 16,
        pitch: 0,
        bearing: 0,
      }
    },
    AugmentHexagonLayer: {
      id: '3d-heatmap',
      colorRange: [
        [34,93,202],
        [37,102,222],
        [56,115,225],
        [76,129,228],
        [96,143,231],
        [116,157,234],
      ],
      coverage: 1,
      elevationRange: [0, 3000],
      elevationScale: 300,
      extruded: true,
      getPosition: d => d.COORDINATES,
      getElevationValue: d => d.reduce((accumulator, currentValue) => currentValue ? accumulator + currentValue.SPACES : accumulator, 0),
      getColorValue: d => d.reduce((accumulator, currentValue) => currentValue ? accumulator + currentValue.SPACES : accumulator, 0),
      opacity: 1,
      pickable: true,
      radius: 40000,
      upperPercentile: 100,
      showAnimation: true,
      url: '../data/meteorites.json',
      INIT_VIEW_STATE: {
        longitude: -104.96,
        latitude: 40.66033,
        zoom: 3,
        minZoom: 2,
        maxZoom: 16,
        pitch: 45,
        bearing: 0,
      }
    },
    ScreenGridLayer: {
      id: 'screen-grid-layer',
      getPosition: d => d.COORDINATES,
      getWeight: d => d.SPACES,
      cellSize: 10,
      extruded: true,
      gpuAggregation: true,
      pickable: true,
      url: '../data/meteorites.json',
      INIT_VIEW_STATE: {
        longitude: -104.96,
        latitude: 40.66033,
        zoom: 3,
        minZoom: 2,
        maxZoom: 16,
        pitch: 0,
        bearing: 0,
      }
    },
    IconLayer: {
      id: 'icon-layer',
      url: '../data/meteorites.json',
      showCluster: true,
      INIT_VIEW_STATE: {
        longitude: -104.96,
        latitude: 40.66033,
        zoom: 3,
        minZoom: 2,
        maxZoom: 16,
        pitch: 0,
        bearing: 0,
      }
    },
    IconCSVLayer: {
      id: 'general-csv-layer',
      url: '../data/points.csv',
      getPosition: d => d.coordinates,
      showCluster: false,
      INIT_VIEW_STATE: {
        longitude: 108.9398,
        latitude: 37.3416,
        zoom: 4,
        minZoom: 2,
        maxZoom: 16,
        pitch: 0,
        bearing: 0,
      }
    },
    TripLayer: {
      buildings: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json',
      trips: 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips.json',
      loopLength: 1800, // unit corresponds to the timestamp in source data
      animationSpeed: 30,
      INIT_VIEW_STATE: {
        longitude: -74,
        latitude: 40.72,
        zoom: 13,
        maxZoom: 16,
        pitch: 45,
        bearing: 0
      }
    },
    Globe: {
      url: 'https://raw.githubusercontent.com/hijiangtao/awesome-toolbox/master/data/GLOBAL_FLIGHTS.json',
      INIT_VIEW_STATE: {},
    }
  }
  
  const INIT_LAYER = 'ScreenGridLayer';

  export {
      INIT_LAYER,
      LAYER_CONFIGS,
  }