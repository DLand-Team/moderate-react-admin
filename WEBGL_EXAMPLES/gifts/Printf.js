// Printf.js 2012 (c) itami & matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +

  // Get the number at the specified digit
  'float getNumber(float value, float digit) {\n' + 
  '  int thisDigit = int(value / digit);\n' +
  '  int upperDigit = int(thisDigit / 10) * 10;\n' +
  '  return float(thisDigit - upperDigit);\n' +
  '}\n' +

  'void main() {\n' +
  '  float testValue = 57.2957;\n' +             // The value to be displayed
  '  vec2 texCoord = v_TexCoord;\n' +
  '  if (texCoord.x < (1.0/16.0)) {\n' +         // 10
  '    if (testValue >= 10.0) {\n' +
  '      float xOffset = mod(texCoord.x, 1.0/16.0);\n' +
  '      texCoord.x = getNumber(testValue, 10.0) / 16.0 + xOffset;\n' +
  '    } else { texCoord.x = 12.0/16.0; }\n' +
  '  } else if (texCoord.x < (2.0/16.0)) {\n' +  // 1
  '    float xOffset = mod(texCoord.x, 1.0/16.0);\n' +
  '    texCoord.x = getNumber(testValue, 1.0) / 16.0 + xOffset;\n' +
  '  } else if (texCoord.x < (3.0/16.0)){\n' +   // Decimal point
  '    float xOffset = mod(texCoord.x, 1.0/16.0);\n' +
  '    texCoord.x = (10.0/16.0) + xOffset;\n' +  // Decimal point is located at 10/16
  '  } else if (texCoord.x < (4.0/16.0)) {\n' +  // 0.1
  '    float xOffset = mod(texCoord.x, 1.0/16.0);\n' +
  '    texCoord.x = getNumber(testValue, 0.1) / 16.0 + xOffset;\n' +
  '  } else if (texCoord.x < (5.0/16.0)) {\n' +  // 0.01の位
  '    float xOffset = mod(texCoord.x, 1.0/16.0);\n' +
  '    texCoord.x = getNumber(testValue, 0.01) / 16.0  + xOffset;\n' +
  '  } else if (texCoord.x < (6.0/16.0)) {\n' +  // 0.001の位
  '    float xOffset = mod(texCoord.x, 1.0/16.0);\n' +
  '    texCoord.x = getNumber(testValue, 0.001) / 16.0 + xOffset;\n' +
  '  } else if (texCoord.x < (7.0/16.0)) {\n' +  // 0.001の位
  '    float xOffset= mod(texCoord.x, 1.0/16.0);\n' +
  '    texCoord.x = getNumber(testValue, 0.0001) / 16.0 + xOffset;\n' +
  '  } else { texCoord.x = 12.0/16.0; }\n' +
  '  gl_FragColor = texture2D(u_Sampler, texCoord);\n' + // Display the number
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

  // Set the clear color
  gl.clearColor(0, 0, 0, 1);

  // Set texture
  if (!initTextures(gl, n)) {
    console.log('Failed to intialize the texture.');
    return;
  }
}

function initVertexBuffers(gl) {
  var verticesTexCoords = new Float32Array([
    -0.8,  0.05,   0.0, 1.0,
    -0.8, -0.05,   0.0, 0.0,
     0.8,  0.05,   1.0, 1.0,
     0.8, -0.05,   1.0, 0.0,
  ]);
  var n = 4; // The number of vertices

  // Create a buffer object
  var vertexTexCoordBuffer = gl.createBuffer();
  if (!vertexTexCoordBuffer) {
    console.log('Failed to create a buffer object');
    return -1;
  }

  // Write vertex information to buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

  var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
  gl.enableVertexAttribArray(a_Position);

  // Set texture
  var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  if (a_TexCoord < 0) {
    console.log('Failed to get the storage location of a_TexCoord');
    return -1;
  }
  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  gl.enableVertexAttribArray(a_TexCoord);

  return n;
}

function initTextures(gl, n) {
  // Create a texture
  var texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create a texture');
    return false;
  }

  // Get the storage location of u_Sampler
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;
  }

  // Create the image object
  var image = new Image();
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called when image loading is completed
  image.onload = function(){ loadTexture(gl, n, texture, u_Sampler, image); };
  // Tell the browser to load an Image
  image.src = '../resources/numbers.png';

  return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
  // Activate texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the image to texture
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  
  // Pass the texure unit 0 to u_Sampler
  gl.uniform1i(u_Sampler, 0);
  
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a rectangle
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
