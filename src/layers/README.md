# Layers (based on deck.gl)

## 1. ArcLayer

### Usage

```javascript
import React from 'react';
import {ArcLayer} from 'glmaps';

const Demo = (props) => {
  return (
    <ArcLayer
      data={props.data}
      showBrushAnimation={props.showBrushAnimation}
    />
  )
};
```

### Properties

#### Basic Properties

See <http://deck.gl/#/documentation/deckgl-api-reference/layers/arc-layer>

#### `data` (Array, required)

Should be a JavaScript array, default to `[]`. Each element should have a property named `ARC` and follow the data format:

```javascript
[
  {
    ARC: {
      source: [
        120.1551,
        30.27341,
      ],
      target: [
        city.lon,
        city.lat,
      ],
    }
  },
  ...
]
```

#### `showBrushAnimation` (Bool, optional)

Animation switch, control whether arcs should animate from source to target, and disappear in the end. Default to `false`.

## 2. HexagonLayer

### Usage

```javascript
import React from 'react';
import {HexagonLayer} from 'glmaps';

const Demo = (props) => {
  return (
    <HexagonLayer
      data={props.data}
      showAnimation={props.showAnimation}
    />
  )
};
```

### Properties

#### Basic Properties

See <http://deck.gl/#/documentation/deckgl-api-reference/layers/hexagon-layer>

#### `data` (Array, required)

Should be a JavaScript array, default to `[]`. Each element should have properties named `COORDINATES` and `SPACES`:

```javascript
[
  {
    COORDINATES: [longitude, latitude], // location
    SPACES: Number // height
  },
  ...
]
```

#### `showAnimation` (Bool, optional)

Animation switch, control whether hexagon will animate from 0 to `height`. Default to `false`.

## 3. ScatterplotLayer

### Usage

```javascript
import React from 'react';
import {ScatterplotLayer} from 'glmaps';

const Demo = (props) => {
  return (
    <ScatterplotLayer
      data={props.data}
      showWaveAnimation={props.showWaveAnimation}
      speed={props.speed}
    />
  )
};
```

### Properties

#### Basic Properties

See <http://deck.gl/#/documentation/deckgl-api-reference/layers/scatterplot-layer>

#### `data` (Array, required)

Should be a JavaScript array, default to `[]`. Each element should have properties named `COORDINATES` and `SPACES`:

```javascript
[
  {
    COORDINATES: [longitude, latitude], // location
    SPACES: Number // height
  },
  ...
]
```

#### `showWaveAnimation` (Bool, optional)

Animation switch, control whether scatterplot will animate like a wave and fade out in the end. Default to `false`.

#### `speed` (Number, optional)

Fade out speed controller. Default to `0.02`.

## 4. IconLayer

### Usage

```javascript
import React from 'react';
import {IconLayer} from 'glmaps';

const Demo = (props) => {
  return (
    <IconLayer
      data={props.data}
      showCluster={props.showCluster}
    />
  )
};
```

### Properties

#### Basic Properties

See <http://deck.gl/#/documentation/deckgl-api-reference/layers/icon-layer>

#### `data` (Array, required)

Should be a JavaScript array, default to `[]`. Each element should have properties named `COORDINATES`:

```javascript
[
  {
    COORDINATES: [longitude, latitude], // location
  },
  ...
]
```

#### `showCluster` (Bool, optional)

Cluster switch, control whether display icons with cluster calculation. Default to `true`.

## 5. ScreenGridLayer

### Usage

```javascript
import React from 'react';
import {IconLayer} from 'glmaps';

const Demo = (props) => {
  return (
    <IconLayer
      data={props.data}
      coverage={props.coverage}
    />
  )
};
```

### Properties

#### Basic Properties

See <http://deck.gl/#/documentation/deckgl-api-reference/layers/screen-grid-layer>

#### `data` (Array, required)

Should be a JavaScript array, default to `[]`. Each element should have properties named `COORDINATES` and `SPACES`:

```javascript
[
  {
    COORDINATES: [longitude, latitude], // location
    SPACES: Number, // Value mapped to colors
  },
  ...
]
```

#### `coverage` (Number, optional)

Coverage control. Sort data from hight to low, and filter out the top `coverage` rate data to display. Default to `1`.