// Wave.js
// Vertex shader program
var VSHADER_SOURCE =
  'uniform mat4 u_perspectiveMatrix;\n' +
  'uniform mat4 u_modelMatrix;\n' +
  'uniform mat4 u_viewMatrix;\n' +
  'uniform float u_time;\n' +
  '\n' +
  'attribute vec4 a_Position;\n' +
  '\n' +  
  'varying vec4 v_Color;\n' +
  '\n' +  
  'void main() {\n' +
  '  vec4 position = a_Position;\n' +
  '  float dist = length( vec3(position));\n' +
  '  float y = sin(dist*20.0 + u_time);\n' +
  '  position.y = y * 0.05;\n' +
  '  mat4 modelViewMatrix = u_viewMatrix * u_modelMatrix;\n' +
  '  gl_Position = u_perspectiveMatrix * modelViewMatrix * position;\n' +
  '\n' +
  '  float c = (y+1.0) * 0.5 * 0.8+0.2;\n' +
  '  v_Color = vec4(c, c, c, 1.0);\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

var g_perspectiveMatrix = new Matrix4();
var g_modelMatrix = new Matrix4();
var g_viewMatrix = new Matrix4();

var g_vertexPositionBuffer;
var g_vertexIndexBuffer;
var g_vertexIndexNum;

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  var perspectiveMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_perspectiveMatrix');
  var modelMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_modelMatrix');
  var viewMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_viewMatrix');
  var timeShaderLocation = gl.getUniformLocation(gl.program, 'u_time');
  
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 1);

  sendGridVertexBuffers(gl);

  var time = 0;
  
  var tick = function() {
    window.requestAnimationFrame(tick);
    time += 0.02;

    gl.uniform1f(timeShaderLocation, time);

    drawCommon(gl, canvas, perspectiveMatrixShaderLocation, viewMatrixShaderLocation);
    drawGrid(gl, perspectiveMatrixShaderLocation, modelMatrixShaderLocation);
  };
  tick(); 
}


function drawCommon(gl, canvas, perspectiveMatrixShaderLocation, viewMatrixShaderLocation) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Clear <canvas>
  g_perspectiveMatrix.setPerspective(30, canvas.width/canvas.height, 1, 10000);
  g_viewMatrix.setLookAt(0, 3, 5,   0, 0, 0,    0, 1, 0);   // eyePos - focusPos - upVector

  gl.uniformMatrix4fv(perspectiveMatrixShaderLocation, false, g_perspectiveMatrix.elements);
  gl.uniformMatrix4fv(viewMatrixShaderLocation, false, g_viewMatrix.elements);
}

function drawGrid(gl, perspectiveMatrixShaderLocation, modelMatrixShaderLocation) {
  
  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexPositionBuffer);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_vertexIndexBuffer);

  g_modelMatrix.setTranslate(0, 0, 0);
  g_modelMatrix.rotate(0, 0, 1, 0);
  g_modelMatrix.scale(1.0, 1.0, 1.0);

  gl.uniformMatrix4fv(modelMatrixShaderLocation, false, g_modelMatrix.elements);
  gl.drawElements(gl.TRIANGLES, g_vertexIndexNum, gl.UNSIGNED_SHORT, 0);
}

function sendGridVertexBuffers(gl) {

  var positionData = [];
  var indexData = [];

  var xnum = 200;
  var znum = 200;
  var width = 5;
  var height = 5;

  for (var z = 0; z < znum; z++) {
    for (var x = 0; x < xnum; x++) {
      positionData.push((x-xnum/2)*width/xnum);
      positionData.push(0);
      positionData.push((z-znum/2)*height/znum);
    }
  }
  for (var z = 0; z < znum-1; z++) {
    for (var x = 0; x < xnum-1; x++) {
      indexData.push(z*xnum+x+0);
      indexData.push(z*xnum+x+1);
      indexData.push(z*xnum+x+xnum+0);

      indexData.push(z*xnum+x+1);
      indexData.push(z*xnum+x+xnum+0);
      indexData.push(z*xnum+x+xnum+1);
    }
  }

  g_vertexPositionBuffer = gl.createBuffer();
  g_vertexIndexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionData), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_vertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);

  g_vertexIndexNum = indexData.length;

  return true;
}


