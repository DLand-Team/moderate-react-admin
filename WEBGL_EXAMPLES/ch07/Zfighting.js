// Zfighting.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ViewProjMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ViewProjMatrix * a_Position;\n' +
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

  // Set the vertex coordinates and color (the blue triangle is in the front)
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  //Set clear color and enable the hidden surface removal function
  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);

  // Get the storage locations of u_ViewProjMatrix
  var u_ViewProjMatrix = gl.getUniformLocation(gl.program, 'u_ViewProjMatrix');
  if (!u_ViewProjMatrix) { 
    console.log('Failed to get the storage locations of u_ViewProjMatrix');
    return;
  }

  var viewProjMatrix = new Matrix4();
  // Set the eye point, look-at point, and up vector.
  viewProjMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);
  viewProjMatrix.lookAt(3.06, 2.5, 10.0, 0, 0, -2, 0, 1, 0);

  // Pass the view projection matrix to u_ViewProjMatrix
  gl.uniformMatrix4fv(u_ViewProjMatrix, false, viewProjMatrix.elements);

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Enable the polygon offset function
  gl.enable(gl.POLYGON_OFFSET_FILL);
  // Draw the triangles
  gl.drawArrays(gl.TRIANGLES, 0, n/2);   // The green triangle
    gl.polygonOffset(1.0, 1.0);          // Set the polygon offset
  gl.drawArrays(gl.TRIANGLES, n/2, n/2); // The yellow triangle
}

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // Vertex coordinates and color
     0.0,  2.5,  -5.0,  0.4,  1.0,  0.4, // The green triangle
    -2.5, -2.5,  -5.0,  0.4,  1.0,  0.4,
     2.5, -2.5,  -5.0,  1.0,  0.4,  0.4, 

     0.0,  3.0,  -5.0,  1.0,  0.4,  0.4, // The yellow triagle
    -3.0, -3.0,  -5.0,  1.0,  1.0,  0.4,
     3.0, -3.0,  -5.0,  1.0,  1.0,  0.4, 
  ]);
  var n = 6;

  // Create a buffer object
  var vertexColorbuffer = gl.createBuffer();  
  if (!vertexColorbuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Write the vertex coordinates and color to the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;
  // Assign the buffer object to a_Position and enable the assignment
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);
  // Assign the buffer object to a_Color and enable the assignment
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);

  return n;
}
