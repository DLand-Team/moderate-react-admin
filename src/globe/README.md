# Globe (based on three.js)

## Usage

```javascript
import React from 'react';
import {Globe} from 'glmaps';

const Demo = (props) => {
  return (
    <Globe
      data={props.data}
      animate={true}
      id={'canvasGlobe'}
      visType={'cube'}
      moon={true}
    />
  )
};
```

## Displaying Types Enumberation

* Curve (Animation optional)
* Cube
* Point (Animation optional)

## Properties

### `data` (Array, required)

Should be a JavaScript array, default to `[]`, and there's little differences between different visualization types.

For curves, each element should contain longitude and latitude of both source point and target point, data format should look like:

```javascript
 /**
   * Data format:
   * [
   *   [
   *      source.lat,
   *      source.lng,
   *      target.lat,
   *      target.lng,
   *   ],
   *   ...
   * ]
   */
```

For cubes, each element should contain longitude, latitude and height. `glmaps` uses the first two properties to locate one cube, and height is used to control its scale height and surface's color. 

```javascript
 /**
   * Data format:
   * [
   *   [
   *      lat,
   *      lng,
   *      height,
   *   ],
   *   ...
   * ]
   */
```

For points, each element should contain longitude and latitude of both source point and target point, as well as the progress of current point's movement (between 0 to 1).

### `animate` (Boolean, optional)

Works in animating curve and point.

### `id` (String, required)

### `visType` (String, optional)

### `moon` (Boolean, optional)