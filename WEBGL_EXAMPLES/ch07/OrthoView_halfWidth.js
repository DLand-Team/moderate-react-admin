// OrthoView_halfWidth.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ProjMatrix * a_Position;\n' +
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
  // Retrieve the nearFar element
  var nf = document.getElementById('nearFar');

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
  var n =  initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);

  // get the storage location of u_ProjMatrix
  var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  if (!u_ProjMatrix) { 
    console.log('Failed to get the storage location of u_ProjMatrix');
    return;
  }

  // Create the matrix to set the eye point, and the line of sight
  var projMatrix = new Matrix4();
  // Register the event handler to be called on key press
  document.onkeydown = function(ev){ keydown(ev, gl, n, u_ProjMatrix, projMatrix, nf); };

  draw(gl, n, u_ProjMatrix, projMatrix, nf);   // Draw
}

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // Vertex coordinates and color
     0.0,  0.6,  -0.4,  0.4,  1.0,  0.4, // The back green one
    -0.5, -0.4,  -0.4,  0.4,  1.0,  0.4,
     0.5, -0.4,  -0.4,  1.0,  0.4,  0.4, 
   
     0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
    -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
     0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 

     0.0,  0.5,   0.0,  0.4,  0.4,  1.0, // The front blue one 
    -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
     0.5, -0.5,   0.0,  1.0,  0.4,  0.4, 
  ]);
  var n = 9;

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

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}

// The distances to the near and far clipping plane (hundredfold of the real value)
var g_near = 0.0, g_far = 0.5;
function keydown(ev, gl, n, u_ProjMatrix, projMatrix, nf) {
  switch(ev.keyCode){
    case 39: g_near += 0.01; break;  // The right arrow key was pressed
    case 37: g_near -= 0.01; break;  // The left arrow key was pressed
    case 38: g_far += 0.01;  break;  // The up arrow key was pressed
    case 40: g_far -= 0.01;  break;  // The down arrow key was pressed
    default: return; // Prevent the unnecessary drawing
  }
 
  draw(gl, n, u_ProjMatrix, projMatrix, nf);    
}

function draw(gl, n, u_ProjMatrix, projMatrix, nf) {
  // Specify the viewing volume
  projMatrix.setOrtho(-0.3, 0.3, -1.0, 1.0, g_near, g_far);

  // Pass the projection matrix to u_ProjMatrix
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);       // Clear <canvas>

  // Display the current near and far values
  nf.innerHTML = 'near: ' + Math.round(g_near * 100)/100 + ', far: ' + Math.round(g_far*100)/100;

  gl.drawArrays(gl.TRIANGLES, 0, n);   // Draw the triangles
}
