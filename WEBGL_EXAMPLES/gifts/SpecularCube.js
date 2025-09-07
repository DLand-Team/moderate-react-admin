// Specular.js 2013 (c) matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'uniform mat4 u_perspectiveMatrix;\n' +
  'uniform mat4 u_modelMatrix;\n' +
  'uniform mat4 u_viewMatrix;\n' +

  'attribute vec4 a_Position;\n' +
  'attribute vec3 a_Normal;\n' +

  'varying vec4 v_Position;\n' +
  'varying vec3 v_Normal;\n' +

  'void main() {\n' +
  '  mat4 modelViewMatrix = u_viewMatrix * u_modelMatrix;\n' +
  '  v_Position = modelViewMatrix * a_Position;\n' +
  '  gl_Position = u_perspectiveMatrix * v_Position;\n' +
  '  v_Normal = normalize( mat3(modelViewMatrix) * a_Normal);\n' + 
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform mat4 u_fViewMatrix;\n' +
  'uniform vec3 u_lightPosition;\n' +

  'varying vec4 v_Position;\n' +
  'varying vec3 v_Normal;\n' +
  'void main() {\n' +
  '  vec3 normal = normalize(v_Normal);\n' +
  '  vec3 lightPosition = vec3(u_fViewMatrix * vec4(u_lightPosition, 1) - v_Position);\n' +
  '  vec3 lightDir = normalize(lightPosition);\n' +
  '  float lightDist = length(lightPosition);\n' +

  '  float specular = 0.0;\n' +
  '  float d = max(dot(v_Normal, lightDir), 0.0);\n' +
  '  if (d > 0.0) {\n' +
  '    vec3 viewVec = vec3(0,0,1.0);\n' +
  '    vec3 reflectVec = reflect(-lightDir, normal);\n' +
  '    specular = pow(max(dot(reflectVec, viewVec), 0.0), 120.0);\n' +
  '  }\n' +
  '  gl_FragColor.rgb = vec3(0.1,0.1,0.1) + vec3(0.4, 0.4, 0.4) * d + specular;\n' +
  '  gl_FragColor.a = 1.0;\n' +
  '}\n';

// Gloval variables
var g_perspectiveMatrix = new Matrix4();
var g_modelMatrix = new Matrix4();
var g_viewMatrix = new Matrix4();

var g_vertexPositionBuffer;
var g_vertexNormalBuffer;
var g_vertexIndexBuffer;

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

  var perspectiveMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_perspectiveMatrix');
  var modelMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_modelMatrix');
  var viewMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_viewMatrix');
  var lightPositionShaderLocation = gl.getUniformLocation(gl.program, 'u_lightPosition');
  var f_viewMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_fViewMatrix');
  
  gl.enable(gl.DEPTH_TEST);

  gl.clearColor(0, 0, 0, 1);
  sendCubeVertexBuffers(gl);

  var angle = 0;
  
  var tick = function() {
    window.requestAnimationFrame(tick);
    angle += 0.3;

    drawCommon(gl, canvas, angle, perspectiveMatrixShaderLocation, viewMatrixShaderLocation, lightPositionShaderLocation, f_viewMatrixShaderLocation);

    drawCube(gl, canvas, angle, perspectiveMatrixShaderLocation, modelMatrixShaderLocation, lightPositionShaderLocation);
  };
  tick(); 
}

function drawCommon(gl, canvas, angle, perspectiveMatrixShaderLocation, viewMatrixShaderLocation, lightPositionShaderLocation, f_viewMatrixShaderLocation) {

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Clear canvas
  g_perspectiveMatrix.setPerspective(30, canvas.width/canvas.height, 1, 10000);
  g_viewMatrix.setLookAt(0, 3, 10,   0, 0, 0,    0, 1, 0);   // eyePos - focusPos - upVector

  gl.uniformMatrix4fv(perspectiveMatrixShaderLocation, false, g_perspectiveMatrix.elements);
  gl.uniformMatrix4fv(viewMatrixShaderLocation, false, g_viewMatrix.elements);

  gl.uniformMatrix4fv(f_viewMatrixShaderLocation, false, g_viewMatrix.elements);

  var lightPosition = new Float32Array([2, 0, 2]);
  gl.uniform3fv(lightPositionShaderLocation, lightPosition);
}

function drawCube(gl, canvas, angle, perspectiveMatrixShaderLocation, modelMatrixShaderLocation, lightPositionShaderLocation) {
  
  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexPositionBuffer);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexNormalBuffer);
  var a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Normal);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_vertexIndexBuffer);

  g_modelMatrix.setTranslate(0, 0, 0);
  g_modelMatrix.rotate(angle, 0, 1, 0);
  g_modelMatrix.scale(1.0, 1.0, 1.0);

  gl.uniformMatrix4fv(modelMatrixShaderLocation, false, g_modelMatrix.elements);
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0); 
}

function sendCubeVertexBuffers(gl) {
  var cubeVertices = new Float32Array([
     1, 1, 1,  -1, 1, 1,  -1,-1, 1,   1,-1, 1,  // v0-v1-v2-v3 front
     1, 1, 1,   1,-1, 1,   1,-1,-1,   1, 1,-1,  // v0-v3-v4-v5 right
     1, 1, 1,   1, 1,-1,  -1, 1,-1,  -1, 1, 1,  // v0-v5-v6-v1 top 
    -1, 1, 1,  -1, 1,-1,  -1,-1,-1,  -1,-1, 1,  // v1-v6-v7-v2 left
    -1,-1,-1,   1,-1,-1,   1,-1, 1,  -1,-1, 1,  // v7-v4-v3-v2 bottom
     1,-1,-1,  -1,-1,-1,  -1, 1,-1,   1, 1,-1   // v4-v7-v6-v5 back
  ]);

  var cubeNormals = new Float32Array([
    0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,     // v0-v1-v2-v3 front
    1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,     // v0-v3-v4-v5 right
    0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,     // v0-v5-v6-v1 top
   -1, 0, 0,  -1, 0, 0,  -1, 0, 0,  -1, 0, 0,     // v1-v6-v7-v2 left
    0,-1, 0,   0,-1, 0,   0,-1, 0,   0,-1, 0,     // v7-v4-v3-v2 bottom
    0, 0,-1,   0, 0,-1,   0, 0,-1,   0, 0,-1      // v4-v7-v6-v5 back
	]);
   
  var indices = new Uint8Array([
     0,  1,  2,   0,  2,  3,    // front
     4,  5,  6,   4,  6,  7,    // right
     8,  9, 10,   8, 10, 11,    // top
    12, 13, 14,  12, 14, 15,    // left
    16, 17, 18,  16, 18, 19,    // bottom
    20, 21, 22,  20, 22, 23     // back
  ]);

  g_vertexPositionBuffer = gl.createBuffer();
  g_vertexNormalBuffer = gl.createBuffer();
  g_vertexIndexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, cubeNormals, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_vertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return true;
}


