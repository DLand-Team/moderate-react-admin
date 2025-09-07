import 'whatwg-fetch';
import * as d3 from 'd3';

/**
 * Get Demo Data according to Layer type and Data url
 * @param {*} param0 
 */
export const fetchData = ({type = 'BrushArcLayer', url = '../data/counties.json'}) => new Promise((resolve, reject) => {
  switch (type) {
    case 'BrushArcLayer':
    case 'IconLayer':
      fetch(url)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err));
      break;
    
    case 'FadeScatterplotLayer':
    case 'AugmentHexagonLayer':
    case 'ScreenGridLayer':
      fetch(url)
      .then(res => res.json())
      .then(res => {
        const slice = res.slice(0);
        return slice.map((item) => {
          return {
            COORDINATES: [...item.coordinates],
            SPACES: parseInt(item.mass),
          }
        })
      })
      .then(res => resolve(res));
      break;
    case 'Globe':
      fetch(url)
      .then(res => res.json())
      .then(res => {
        const routes = res.routes.slice(0, 1000);
        const {airports} = res;
        return routes.map(route => {
          const startAirport = airports[route[1]];
          const endAirport = airports[route[2]];
          const startLat = startAirport[4];
          const startLng = startAirport[3];
          const endLat = endAirport[4];
          const endLng = endAirport[3];
          return [ startLat, startLng, endLat, endLng ];
        });
      })
      .then(res => resolve(res));
      break;
    case 'IconCSVLayer':
      d3.dsv(",", url, function(d) {
        return {
          coordinates: [ +d.lng, +d.lat ]
        };
      }).then(function(data) {
        resolve(data);
      });
      break;
    case 'TripLayer':
    default:
      resolve([]);
      break;
  }
})