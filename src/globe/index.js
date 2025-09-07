import React, { memo, useEffect, useLayoutEffect, useRef } from 'react';
import SceneManager from './SceneManager';
let raf;
let resizeCanvas;

/**
 * Three Instance Entrance Point
 * @param {*} containerElement 
 */
const threeEntryPoint = ({id, ...otherProps}) => {
  const canvas = document.getElementById(id);
  const sceneManager = SceneManager.getInstance(canvas, otherProps);
  raf = null;
  
  function bindEventListeners() {
    window.addEventListener ("resize", resizeCanvas);

    resizeCanvas();
  }
  resizeCanvas = function() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
  }
  const render = () => {
    sceneManager.update();
    raf = requestAnimationFrame(render);
  }

  bindEventListeners();
  render();

  const cleanFunc = () => {
    const gl = canvas.getContext('webgl');
    gl.clearColor(1.0, 1.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    window.removeEventListener("resize", resizeCanvas);
    cancelAnimationFrame(raf);
    SceneManager.destroyInstance();
  }

  return [cleanFunc];
}

/**
 * Three Cube Class
 */
const ThreeCube = (props) => {
  const {
    data = [], 
    animate = true, 
    id = 'canvasGlobe',
    visType = 'point',
    moon = true
  } = props;

  
  useEffect(() => {
    if (!data.length) return () => {};

    const [cleanFunc] = threeEntryPoint({
      id,
      data,
      animate,
      visType, // 'cube', curve', 'point'
      moon,
    });

    return () => {
      cleanFunc();
    };
  });

  return (
    <canvas 
      id={id}
      // ref={canvasEl}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,1)'
      }}
    />
  );
};

export default ThreeCube;
