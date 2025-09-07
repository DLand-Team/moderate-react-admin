
const animateLines = (map) => {
  const speedFactor = 30; // number of frames per longitude degree
  let animation = null; // to store and cancel the animation
  let startTime = 0;
  let progress = 0; // progress = timestamp - startTime
  let resetTime = false; // indicator of whether time reset is needed for the animation

  // Create a GeoJSON source with an empty lineString.
  const geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [0, 0],
            ],
        },
    }],
  };

  map.addLayer({
    'id': 'line-animation',
    'type': 'line',
    'source': {
        'type': 'geojson',
        'data': geojson,
    },
    'layout': {
        'line-cap': 'round',
        'line-join': 'round',
    },
    'paint': {
        'line-color': '#ed6498',
        'line-width': 5,
        'line-opacity': .8,
    },
  });

  // reset startTime and progress once the tab loses or gains focus
  // requestAnimationFrame also pauses on hidden tabs by default
  document.addEventListener('visibilitychange', () => {
    resetTime = true;
  });

  // animated in a circle as a sine wave along the map.
  function animateLine(timestamp) {
    if (resetTime) {
        // resume previous progress
        startTime = performance.now() - progress;
        resetTime = false;
    } else {
        progress = timestamp - startTime;
    }

    // restart if it finishes a loop
    if (progress > speedFactor * 360) {
        startTime = timestamp;
        geojson.features[0].geometry.coordinates = [];
    } else {
        const x = progress / speedFactor;
        // draw a sine wave with some math.
        const y = Math.sin(x * Math.PI / 90) * 40;
        // append new coordinates to the lineString
        geojson.features[0].geometry.coordinates.push([x, y]);
        // then update the map
        map.getSource('line-animation').setData(geojson);
    }
    // Request the next frame of the animation.
    animation = requestAnimationFrame(animateLine);
  }

  startTime = performance.now();

  animateLine();

}
