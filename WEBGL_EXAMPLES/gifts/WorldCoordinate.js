// WorldCoordinateSystem.js (c) matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_mvpMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_mvpMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
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

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

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

  // Set the vertex information
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Set the clear color and enable the depth test
  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);

  // Get the storage locations of uniform variables
  var u_mvpMatrix = gl.getUniformLocation(gl.program, 'u_mvpMatrix');
  if (!u_mvpMatrix) { 
    console.log('Failed to get the storage location of uniform variable');
    return;
  }

  var modelMatrix = new Matrix4();
  var viewMatrix = new Matrix4();
  var projMatrix = new Matrix4();
  var mvpMatrix = new Matrix4();

  // Calculate the view projection matrix
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
  projMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  for (var i = 0; i < 10; i++) {
    var x = Math.random() * Math.pow(-1, i);
    var z = Math.random() * i * 5;
    modelMatrix.setTranslate(x, 0, -z);
    // Calculate a model view projection matrix
    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
    // Set the matrix to u_mvpMatrix
    gl.uniformMatrix4fv(u_mvpMatrix, false, mvpMatrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, n);
  }
}

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // vertex    　　　 color
     0.0,  1.0,   0.0,  0.0,  0.0,  1.0, 
    -0.5, -1.0,   0.0,  0.0,  0.0,  1.0,
     0.5, -1.0,   0.0,  0.0,  1.0,  0.0, 
  ]);
  var n = 3;

  // Create a buffer object
  var vertexColorbuffer = gl.createBuffer();  
  if (!vertexColorbuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);

  return n;
}
