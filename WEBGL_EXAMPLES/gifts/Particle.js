// Particle.js (c) 2012 tanaka and matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'uniform mat4 u_perspectiveMatrix;\n' +
  'uniform mat4 u_modelMatrix;\n' +
  'uniform mat4 u_viewMatrix;\n' +
  'uniform vec3 u_lightDir;\n' +
  '\n' +
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  '\n' +  
  'varying vec4 v_Color;\n' +
  'varying vec2 v_TexCoord;\n' +
  '\n' +  
  'void main() {\n' +
  '  mat4 modelViewMatrix = u_viewMatrix * u_modelMatrix;\n' +
  '  gl_Position = u_perspectiveMatrix * modelViewMatrix * a_Position;\n' +
  '\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'uniform float u_Alpha;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_FragColor.rgb = texture2D(u_Sampler, vec2(v_TexCoord.s, v_TexCoord.t)).rgb;\n' +
  '  gl_FragColor.a = u_Alpha;\n' +
  '}\n';

var g_perspectiveMatrix = new Matrix4();
var g_lightDir = new Vector3([0, 0.4, 0.6]);
var g_modelMatrix = new Matrix4();
var g_viewMatrix = new Matrix4();

var g_quadVertexPositionBuffer;
var g_quadVertexIndexBuffer;
var g_quadVertexTexCoordBuffer;

var TEXTURE;
var IMAGE;

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

  // Set texture
  if (!initTextures(gl, "../resources/particle.png")) {
    console.log('Failed to set texture');
    return;
  }

  var perspectiveMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_perspectiveMatrix');
  var modelMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_modelMatrix');
  var viewMatrixShaderLocation = gl.getUniformLocation(gl.program, 'u_viewMatrix');
  var lightDirShaderLocation = gl.getUniformLocation(gl.program, 'u_lightDir');
  var textureSamplerShaderLocation = gl.getUniformLocation(gl.program, 'u_Sampler');
  var alphaShaderLocation = gl.getUniformLocation(gl.program, 'u_Alpha');
  
  init_gl(gl);
  sendQuadVertexBuffers(gl);

  // Create particles
  var particle = new Array(500);
  for (var i = 0; i < particle.length; ++i) {
    particle[i] = new Particle();
    initParticle(particle[i], true);
  }

  var tick = function() {
    window.requestAnimationFrame(tick);
    updateParticle(particle);
    drawCommon(gl, canvas, perspectiveMatrixShaderLocation, viewMatrixShaderLocation, lightDirShaderLocation);
    drawParticle(gl,particle, perspectiveMatrixShaderLocation, modelMatrixShaderLocation, textureSamplerShaderLocation, alphaShaderLocation);
  };
  tick(); 
}


function init_gl(gl) {
  gl.enable(gl.DEPTH_TEST);
  gl.depthMask(false);

  gl.clearColor(0, 0, 0, 1);

  gl.enable(gl.BLEND);
  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
}

function drawCommon(gl, canvas, perspectiveMatrixShaderLocation, viewMatrixShaderLocation, lightDirShaderLocation) {

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);    // Clear <canvas>
  g_perspectiveMatrix.setPerspective(30, canvas.width/canvas.height, 1, 10000);
  g_viewMatrix.setLookAt(0, 3, 10,   0, 2, 0,    0, 1, 0);   // eyePos - focusPos - upVector

  gl.uniformMatrix4fv(perspectiveMatrixShaderLocation, false, g_perspectiveMatrix.elements);
  gl.uniformMatrix4fv(viewMatrixShaderLocation, false, g_viewMatrix.elements);

  gl.uniform3fv(lightDirShaderLocation, g_lightDir.elements);
}

function drawParticle(gl, p, perspectiveMatrixShaderLocation, modelMatrixShaderLocation, textureSamplerShaderLocation, alphaShaderLocation) {
  
  gl.bindBuffer(gl.ARRAY_BUFFER, g_quadVertexPositionBuffer);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.bindBuffer(gl.ARRAY_BUFFER, g_quadVertexTexCoordBuffer);
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_TexCoord);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, TEXTURE);
  gl.uniform1i(textureSamplerShaderLocation, 0);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, IMAGE);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_quadVertexIndexBuffer);

  for (var i = 0; i < p.length; ++i) {
    if (p[i].wait <= 0) {
      g_modelMatrix.setTranslate(p[i].position[0], p[i].position[1], p[i].position[2]);
      // Rotate arounf z-axis to show the front face
      g_modelMatrix.rotate(p[i].angle, 0, 0, 1);
      var scale = 0.5 * p[i].scale;
      g_modelMatrix.scale(scale, scale, scale);

      gl.uniformMatrix4fv(modelMatrixShaderLocation, false, g_modelMatrix.elements);
      gl.uniform1f(alphaShaderLocation, p[i].alpha);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0);
    }
  }
}

function updateParticle(p) {
  for (var i = 0; i < p.length; ++i) {
    // Wait for creation
    if (p[i].wait > 0) {
      p[i].wait--;
      continue;
    }
    // Update a vertex coordinate
    p[i].position[0] += p[i].velocity[0];
    p[i].position[1] += p[i].velocity[1];
    p[i].position[2] += p[i].velocity[2];

    // Decreate Y translation
    p[i].velocity[1] -= 0.003;
    // Fading out
    p[i].alpha -= 0.05;

    if (p[i].alpha <= 0) {
      initParticle(p[i], false);
    }
  }
}

function sendQuadVertexBuffers(gl) {
  //  v3----v2
  //  |      | 
  //  |      |
  //  |      |
  //  v0----v1

  var quadVertices = new Float32Array([-0.5,-0.5,0, 0.5,-0.5,0, 0.5,0.5,0, -0.5,0.5,0]);
  g_quadVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, g_quadVertexPositionBuffer);    
  gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

  var quadTexCoords = new Float32Array([0,0, 1,0, 1,1, 0,1]);
  g_quadVertexTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, g_quadVertexTexCoordBuffer);    
  gl.bufferData(gl.ARRAY_BUFFER, quadTexCoords, gl.STATIC_DRAW);

  var quadNormals = new Float32Array([0,0,1, 0,0,1, 0,0,1, 0,0,1]);    
  g_quadVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, g_quadVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, quadNormals, gl.STATIC_DRAW);

  var indices = new Uint8Array([0,1,2, 2,3,0]);
  g_quadVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g_quadVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return true;
}

function Particle(){
  this.velocity = new Array(3);
  this.position = new Array(3);
  this.angle = 0;
  this.scale = 0;
  this.alpha = 0;
  this.wait = 0;
}

function initParticle(p, wait) {
  // Movement speed
  var angle = Math.random() * Math.PI * 2;
  var height = Math.random() * 0.02 + 0.13;
  var speed = Math.random() * 0.01 + 0.02;
  p.velocity[0] = Math.cos(angle) * speed;
  p.velocity[1] = height;
  p.velocity[2] = Math.sin(angle) * speed;

  p.position[0] = Math.random() * 0.2;
  p.position[1] = Math.random() * 0.2;
  p.position[2] = Math.random() * 0.2;

  // Rotation angle
  p.angle = Math.random() * 360;
  // Size
  p.scale = Math.random() * 0.5 + 0.5;
  // Transparency
  p.alpha = 5;
  // In initial stage, vary a time for creation
  if (wait == true) {
    // Time to wait
    p.wait = Math.random() * 120;
  }
}

function initTextures(gl, str) {
  TEXTURE = gl.createTexture();
  if (!TEXTURE) {
    console.log('テクスチャオブジェクトの作成に失敗');
    return false;
  }

  IMAGE = new Image();
  if(!IMAGE) {
    console.log('画像オブジェクトの作成に失敗');
    return false;
  }

  IMAGE.onload = function(){ loadTexture(gl, TEXTURE, IMAGE); };
  IMAGE.src = str;

  return true;
}

function loadTexture(gl, texture, image) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.bindTexture(gl.TEXTURE_2D, null);
}

