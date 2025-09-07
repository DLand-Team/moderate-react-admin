// ThreeDUI.js (c) 2012 matsuda and itami
// Vertex shader program
var VSHADER_COLOR_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_COLOR_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

// Vertex shader program (for texture)
var VSHADER_TEXTURE_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program(for texture)
var FSHADER_TEXTURE_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';

var g_program_color;
var g_program_texture;

var a_Position;
var a_Color;
var a_TexCoord;
var u_MvpMatrix;
var u_Sampler;
var u_IsTexture;

var g_viewProjMatrix = new Matrix4();
var g_panelDefaultMatrix = new Matrix4();
var g_vertexColorBuffer;
var g_vertexTexCoordBuffer;
var picturePanel = null;
var nextPicturePanel = null;

var pictureInfos = new Array(
  new pictureItem("'../resources/7herbs.jpg',          'Nanakusa\n\nUse arrow keys!'"),
  new pictureItem("'../resources/blueflower.jpg',      'Blue\nFlower'"),
  new pictureItem("'../resources/blueflower2.jpg',     'Blue\nFlower2'"),
  new pictureItem("'../resources/lightblueflower.jpg', 'Light\nBlue\nFlower'"),
  new pictureItem("'../resources/orange.jpg',          'Orange'"),
  new pictureItem("'../resources/parasol.jpg',         'Parasol'"),
  new pictureItem("'../resources/pinkflower.jpg',      'Pink\nFlower'"),
  new pictureItem("'../resources/redflower.jpg',       'Red\nFlower'"),
  new pictureItem("'../resources/sky.jpg',             'Sky'"),
  new pictureItem("'../resources/sky_cloud.jpg',       'Sky\nCloud'"),
  new pictureItem("'../resources/sky_roof.jpg',        'Sky\nand\nRoof'"),
  new pictureItem("'../resources/yellowflower.jpg',    'Yellow\nFlower'")
);

function pictureItem(line) {
  var idx = line.indexOf(',');
  this.path = line.substring(0, idx);
  this.path = trimTo(this.path, "'");
  this.path = trimFrom(this.path, "'");
  this.description = line.substring(idx + 1);
  this.description = trimTo(this.description, "'");
  this.description = trimFrom(this.description, "'");
}

// Get a string (to the separator)
function trimTo(target, separator) {
  var idx = target.indexOf(separator);
  return target.substring(idx + 1);
}

// Get a string (from the separator)
function trimFrom(target, separator) {
  var idx = target.lastIndexOf(separator);
  return target.substring(0, idx);
}

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');
  var hud = document.getElementById('hud');  

  if (!canvas || !hud) { 
    console.log('Failed to get HTML elements');
    return false; 
  } 

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  // Get the rendering context for 2DCG
  var ctx = hud.getContext('2d');
  if (!gl || !ctx) {
    console.log('Failed to get rendering context');
    return;
  }

  // Create a shader
  g_program_color = createProgram(gl, VSHADER_COLOR_SOURCE, FSHADER_COLOR_SOURCE);
  if (g_program_color == null ) {
    console.log('Failed to create the shader');
    return;
  }

  // Create a shader for a texture
  g_program_texture = createProgram(gl, VSHADER_TEXTURE_SOURCE, FSHADER_TEXTURE_SOURCE);
  if (g_program_texture == null ) {
    console.log('Failed to create the shader');
    return;
  }

  // Create a buffer object
  g_vertexColorBuffer = gl.createBuffer();
  if (!g_vertexColorBuffer) {
    console.log('Failed to create a buffer object');
    return;
  }
  g_vertexTexCoordBuffer = gl.createBuffer();
  if (!g_vertexTexCoordBuffer) {
    console.log('Failed to create a buffer object (for a texture)');
    return;
  }

  // Set a view projection matrix
  g_viewProjMatrix.setPerspective(50.0, canvas.width / canvas.height, 1.0, 100.0);
  g_viewProjMatrix.lookAt(0.0, 0.0, 6.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  // Set a matrix of a picture panel
  g_panelDefaultMatrix.setTranslate(-0.5, 0.2, 0.0);
  g_panelDefaultMatrix.rotate( 52.0, 0.0, 1.0, 0.0);
  g_panelDefaultMatrix.rotate(-12.0, 1.0, 0.0, 0.0);
  g_panelDefaultMatrix.rotate(15.0, 0.0, 0.0, 1.0); 
  
  // Register the key event handler
  document.onkeydown = function(ev){ keydown(ev, gl); };

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Create a picture panel
  picturePanel = new PicturePanel(gl, pictureInfos);
  picturePanel.selectedIndex = 0;

  var tick = function() {
    if(!onUpdate(gl, ctx)) return;
    requestAnimationFrame(tick, canvas);
  };
  tick();
}

var configLines;

function useColorShader(gl) {
  gl.useProgram(g_program_color);
  gl.program = g_program_color;

  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return false;
  }

  a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return false;
  }

  u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  if (!u_MvpMatrix) {
    console.log('Failed to get the storage location of u_MvpMatrix');
    return false;
  }

  return true;
}

function useTextureShader(gl) {
  gl.useProgram(g_program_texture);
  gl.program = g_program_texture;

  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return false;
  }

  a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if (a_TexCoord < 0) {
    console.log('Failed to get the storage location of a_TexCoord');
    return false;
  }

  u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  if (!u_MvpMatrix) {
    console.log('Failed to get the storage location of u_MvpMatrix');
    return false;
  }

  u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;;
  }

  return true;
}

// The vertex information for a picture plate
var selectedVerticesColors = new Float32Array([
  -0.55,  0.55,   0.88, 0.09, 0.09,
  -0.55, -0.55,   0.88, 0.09, 0.09,
   0.55,  0.55,   0.88, 0.09, 0.09,
   0.55, -0.55,   0.88, 0.09, 0.09,
]);

// The vertex information for a picture
var normalVerticesColors = new Float32Array([
  -0.55,  0.55,   1.0, 1.0, 1.0,
  -0.55, -0.55,   1.0, 1.0, 1.0,
   0.55,  0.55,   1.0, 1.0, 1.0,
   0.55, -0.55,   1.0, 1.0, 1.0,
]);

function drawVerticesColors(gl, verticesColors, matrix) {
  var n = verticesColors.length / 5;
  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  gl.uniformMatrix4fv(u_MvpMatrix, false, matrix.elements);

  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
  gl.enableVertexAttribArray(a_Position);
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

function onUpdate(gl, ctx) {
  if(picturePanel == null)  return;

  picturePanel.update();
  if (nextPicturePanel != null){
     nextPicturePanel.update();
     if (nextPicturePanel.mode == 5) {
        nextPicturePanel.setMode(0);
        picturePanel = nextPicturePanel;
        nextPicturePanel = null;
        picturePanel.selectedIndex = 0;
     }
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  ctx.clearRect(0, 0, 400, 400); // Clear <hud>

  picturePanel.draw(gl, g_panelDefaultMatrix);
  if (nextPicturePanel != null){
     nextPicturePanel.draw(gl, g_panelDefaultMatrix);
  }

  if (picturePanel.selectedIndex >= 0) {
    var modelMatrix = new Matrix4();
    var mvpMatrix = new Matrix4();

    useColorShader(gl);

    // Draw a picture plate
    modelMatrix.setTranslate(1.2, 1.2, 2.0);
    mvpMatrix.set(g_viewProjMatrix);
    mvpMatrix.multiply(modelMatrix);
    drawVerticesColors(gl, normalVerticesColors, mvpMatrix);

    useTextureShader(gl);

    // Draw a selected picture
    modelMatrix.setTranslate(1.2, 1.2, 2.001);
    mvpMatrix.set(g_viewProjMatrix);
    mvpMatrix.multiply(modelMatrix);
    picturePanel.cells[picturePanel.selectedIndex].draw(gl, mvpMatrix, false);

    // Draw a text
    var description = picturePanel.infos[picturePanel.selectedIndex].description;
    var lines = description.split('\n');
    ctx.font = '14px "Times New Roman"';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // Set white to the color of letters
    for(var i = 0; i < lines.length; i++)
      ctx.fillText(lines[i], 270, 150 + i * 16); 
  }
  
  return true;
}

function keydown(ev, gl) {
  if (picturePanel == null)   return;
  if (picturePanel.mode != 0) return;
  switch (ev.keyCode) {
    case 38: // UP arrow key
      picturePanel.selectUpper();
      break;
    case 40: // DOWN arrow key
      picturePanel.selectLower();
      break;
    case 39: // RIGHT arrow key
      picturePanel.selectRight();
      break;
    case 37: // LEFT arrow key
      picturePanel.selectLeft();
      break;
    case 33: // PageUp key
      this.nextPicturePanel = new PicturePanel(gl, pictureInfos);
      this.nextPicturePanel.setMode(2);
      this.picturePanel.setMode(1);
      break;
    case 34: // PageDown key
      this.nextPicturePanel = new PicturePanel(gl, pictureInfos);
      this.nextPicturePanel.setMode(4);
      this.picturePanel.setMode(3);
      break;
    default:
      break;
  }
}

//------------------------------------------------------------------------------
// Object for a picture panel
var cellX = new Array(-1.2, 0.0, 1.2, -1.2, 0.0, 1.2, -1.2, 0.0, 1.2, -1.2, 0.0, 1.2);
var cellY = new Array(1.8, 1.8, 1.8, 0.6, 0.6, 0.6, -0.6, -0.6, -0.6, -1.8, -1.8, -1.8);

// The target index 
var upperIndex = new Array(0, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8);
var lowerIndex = new Array(0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2);
var leftIndex  = new Array(0, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
var rightIndex = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0);

// The number of pictures
var cellsParPanel = 12;

// Constructor
var PicturePanel = function(gl, infos) {
  this.mode = 0;
  this.selectedIndex = -1;
  this.angle = 0.0;
  this.infos = infos;

  this.cells = new Array();
  for (var i = 0; i < cellsParPanel; i++){
    if(i >= this.infos.length)  break;
    this.cells[i] = new PictureCell(gl, this.infos[i].path);
  }
}

// Mode
//  0: Normal rendeing
//  1: Hide animation (Up key)
//  2: Show animation (Up key)
//  3: Hide animation (Down key)
//  4: Show animation (Down key)
//  5: End animation
PicturePanel.prototype.setMode = function(mode) {
  this.mode = mode;
  if (this.mode == 1 || this.mode == 3){
    this.selectedIndex = -1;
  }
  if (this.mode == 2 || this.mode == 4){
    this.angle = 180.0;
  }
}

// Select the upper panel
PicturePanel.prototype.selectUpper = function() {
  do {
    this.selectedIndex = upperIndex[this.selectedIndex + 1];
  } while(this.selectedIndex >= this.cells.length)
}

// Select the lower panel
PicturePanel.prototype.selectLower = function() {
  do {
    this.selectedIndex = lowerIndex[this.selectedIndex + 1];
  } while(this.selectedIndex >= this.cells.length)
}

// Select the right panel
PicturePanel.prototype.selectRight = function() {
  do {
    this.selectedIndex = rightIndex[this.selectedIndex + 1];
  } while(this.selectedIndex >= this.cells.length)
}

// Select the left panel
PicturePanel.prototype.selectLeft = function() {
  do {
    this.selectedIndex = leftIndex[this.selectedIndex + 1];
  } while(this.selectedIndex >= this.cells.length)
}

// Update
PicturePanel.prototype.update = function(gl, panelDefaultMatrix) {
  var speed = 8.0;
  switch(this.mode){
    case 1: // Hide animation (Up key)
      this.angle -= speed;
      if(this.angle < 0.0)  this.angle += 360.0;	  
      if(this.angle <= 180.0){
        this.angle = 180.0;
        this.mode = 5;  // End the animation
      }
      break;
    case 2: // Show animation (Up key)
      this.angle -= speed;
      if(this.angle <= 0.0){
        this.angle = 0.0;
        this.mode = 5;  // End animation
      }
      break;
    case 3: // Hide animation (Down key)
      this.angle += speed;
      if(this.angle >= 180.0){
        this.angle = 180.0;
        this.mode = 5;  // End animation
      }
      break;
    case 4: // Show animation (Down key)
      this.angle += speed;
      if(this.angle >= 360.0){
        this.angle = 0.0;
        this.mode = 5;  // End animation
      }
      break;
  }
  return(this.mode);
}

// Rendering
PicturePanel.prototype.draw = function(gl, panelDefaultMatrix) {
  var panelMatrix = new Matrix4();
  panelMatrix.set(panelDefaultMatrix);
  panelMatrix.rotate(this.angle, 0.0, 1.0, 0.0);
  var modelMatrix = new Matrix4();
  var mvpMatrix = new Matrix4();

  useColorShader(gl);

  // Draw a picture plate
  for (var i = 0; i < cellsParPanel; i++) {
    modelMatrix.set(panelMatrix);
    modelMatrix.translate(cellX[i], cellY[i], 0.001);
    mvpMatrix.set(g_viewProjMatrix);
    mvpMatrix.multiply(modelMatrix);
    if (i == this.selectedIndex) {
      drawVerticesColors(gl, selectedVerticesColors, mvpMatrix);
    } else {
      drawVerticesColors(gl, normalVerticesColors, mvpMatrix);
    }
  }

  useTextureShader(gl);

  // Draw a picture
  for (var i = 0; i < this.cells.length; i++){
    modelMatrix.set(panelMatrix);
    modelMatrix.translate(cellX[i], cellY[i], 0.002);
    mvpMatrix.set(g_viewProjMatrix);
    mvpMatrix.multiply(modelMatrix);
    this.cells[i].draw(gl, mvpMatrix, (i == this.selectedIndex));
  }
}

//------------------------------------------------------------------------------
// Object for drawing a picture
// Constructor
var PictureCell = function(gl, filePath) {
  this.filePath = filePath;
  this.isTextureLoaded = false;
  this.result = true;

  this.verticesTexCoords = new Float32Array([
    -0.5,  0.5,   0.0, 1.0,
    -0.5, -0.5,   0.0, 0.0,
     0.5,  0.5,   1.0, 1.0,
     0.5, -0.5,   1.0, 0.0,
  ]);
  this.n = 4; // The number of vertices

  this.texture = gl.createTexture();   // Create a texture object
  if (!this.texture) {
    console.log('Failed to Create a texture object');
    this.result = false;
    return;
  }

  this.image = new Image();
  if (!this.image) {
    console.log('Failed to Create an image object');
    return false;
  }

  var thisInstance = this;
  this.image.onload = function(){ thisInstance.onLoadTexture(gl); };

  this.image.src = filePath;
}

PictureCell.prototype.onLoadTexture = function(gl) {
  this.isTextureLoaded = true;
}

PictureCell.prototype.draw = function(gl, modelMatrix) {
  gl.uniformMatrix4fv(u_MvpMatrix, false, modelMatrix.elements);

  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, this.verticesTexCoords, gl.STATIC_DRAW);

  var FSIZE = this.verticesTexCoords.BYTES_PER_ELEMENT;
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
  gl.enableVertexAttribArray(a_Position); 

  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  gl.enableVertexAttribArray(a_TexCoord);

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.image);
  
  gl.uniform1i(u_Sampler, 0);
  
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.n);
}
