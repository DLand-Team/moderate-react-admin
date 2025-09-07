// MQOParser.js (c) 2012 matsuda and itami
// MQODoc object
// Constructor
var MQODoc = function() {
  this.lines;         // Array of lines that builds up the file
  this.index;         // The index of the line to be parsed
  this.materials;     // Property to manage the information in Material chunk
  this.objects;       // Property to manage the information in Object chunk
  this.numVertices;   // Total number of vertices
  this.numIndices;    // Total number of indices
}

// Parsing the MQO file
MQODoc.prototype.parse = function(fileString) {
  this.lines = fileString.split('\n');  // Break up into lines and store them as array
  this.lines.push(null);       // Append null
  this.index = 0;              // Initialize index of line

  this.materials = null;       // Initialize the property for Material chunk
  this.objects = new Array(0); // Initialize the property for Object chunk
  this.numVertices = 0;        // Set total number of vertices to 0
  this.numIndices = 0;         // Set total number of indices to 0

  // Parse line by line
  var line; // A string in the line to be parsed
  var obj;  // Object information made from Object chunk
  while (line = this.lines[this.index++]) {
    if (line.indexOf('Scene') >= 0) {    // Skip Scene chunk (not use)
      this.skipToEndOfChunk();
      continue; // Go to the next line
    } 
    if (line.indexOf('Material') >= 0) { // Read Material chunk
      this.materials = this.readMaterials(line);
      continue; // Go to the next line
    } 
    if (line.indexOf('Object') >= 0) {   // Read Object chunk
      if (obj = this.readObjects()) this.objects.push(obj);
      else return false;
      continue; // Go to the next line
    }
  }
  return true;
}

// Read Material chunk
MQODoc.prototype.readMaterials = function(line) {
  var sp = new StringParser(line); // StringParser object for parsing the content of the line

  // Parse "Material 2 {"
  sp.skipToNextWord();            // Skip "Material" (not use)
  var n = sp.getInt();            // Get the number of materials
  var materials = new Array(n);   // Allocate an array that manages Material Information

  // Parse "mat1" col(1.000 0.000 0.000 1.000) dif(0.800) ...  power(5.00)
  for (var i = 0; i < n; i++) {
    sp.init(this.lines[this.index++]); // Reuse sp object
    sp.skipToNextWord();      // Skip the name of Material(not use)
    var word = sp.getWord();  // Confirm if the word is "col"
    if (word == 'col') {
      var r = sp.getFloat();
      var g = sp.getFloat();
      var b = sp.getFloat();
      var a = sp.getFloat();
      materials[i] = new Material(r, g, b, a); // Pack r, g, b, and a in Material object
    } else { alert ('error material'); return null; }; 
  }
  this.skipToEndOfChunk();  // Skip to the end of chunk

  return materials;         // Return the parsing result
}

// Read Object chunk
MQODoc.prototype.readObjects = function() {
  var mqoObject = new MQOObject(); // Create MQOObject instance for manage Object chunk information

  // Parse the object chunk for each line
  var line;  // A string in the line to be parsed
  while (line = this.lines[this.index++]) {
    if (line.indexOf('facet') >= 0) continue;      // Skip this line because "face" is substring of "facet"
    if (line.indexOf('color_type') >= 0) continue; // Skip this line because "color" is substring of "color_type"
    if (line.indexOf('color') >= 0) {              // Read color parameters
      mqoObject.color = this.readColor(line);      // The format of the target is "color 0.898 0.498 0.698"
      continue;
    } 
    if (line.indexOf('shading') >= 0) {            // Read shading parameter
      mqoObject.shading = this.readShading(line);  // The format of the target is "shading 0"
      continue;
    } 
    if (line.indexOf('vertex') >= 0) {             // Read vertex chunk
      mqoObject.vertices = this.readVertices(line);// The format of the target is "vertex 8 {...}"
      continue;
    } 
    if (line.indexOf('face') >= 0) {               // Read face chunk
      mqoObject.faces = this.readFaces(line);      // The format of the target is "face 6 {...}"
      continue;
    }
    if (line.indexOf('}') >= 0) {
      break;  // End of chunk
    }
  }

  // Calculate the normal of faces
  for (var i = 0, len = mqoObject.faces.length; i < len; i++) {
    var face = mqoObject.faces[i];
    face.setNormal(mqoObject.vertices);
  }

  return mqoObject;
}

// Read color parameters (The format of the target is "color 0.898 0.498 0.698")
MQODoc.prototype.readColor = function(line) {
  var sp = new StringParser(line);
  sp.skipToNextWord();  // Skip "color"
  var r = sp.getFloat();
  var g = sp.getFloat();
  var b = sp.getFloat(); 

  return new Material(r, g, b, 1.0);
}

// Read shading parameter (The format of the target is "shading 0")
MQODoc.prototype.readShading = function(line) {
  var sp = new StringParser(line);
  sp.skipToNextWord();  // Skip "shading"

  return sp.getInt();   // Get the integer value
}

// Read vertex chunk
MQODoc.prototype.readVertices = function(line) {
  var sp = new StringParser(line);
  // Parse "vertex 8 {"
  sp.skipToNextWord();         // Skip "vertex"
  var n = sp.getInt();         // Get the number of vertices
  var vertices = new Array(n); // Create the array for vertices coordinate
  // Get vertices coordinate (Parse "-100.0000 100.0000 100.0000")
  for (var i = 0; i < n; i++){
    sp.init(this.lines[this.index++]);
    var x = sp.getFloat();
    var y = sp.getFloat();
    var z = sp.getFloat();
    vertices[i] = new Vertex(x, y, z);
  }
  this.skipToEndOfChunk(); // Skip to the end of chunk

  return vertices;
}

// Read face chunk
MQODoc.prototype.readFaces = function(line) {
  var sp = new StringParser(line);
  // Parse "face 6 {"
  sp.skipToNextWord();	           // Skip "face"
  var numFaces = sp.getInt();	   // Get the number of faces
  var faces = new Array(numFaces); // Create the array for faces

  // Parse "4 V(0 2 3 1) M(0) UV(0.00000 0.00000 ... 1.00000)"
  for (var i = 0; i < numFaces; i++) {
    sp.init(this.lines[this.index++]);
    var n = sp.getInt();  // Get the number of vertex of the face
    if (n != 3 && n != 4) { alert('error face'); continue; }
    var vIndices = new Uint16Array(n); // Create the array for indices
    var mIndex = -1;
    var word;
    while (word = sp.getWord()) {
      if (word == 'V') {
        for (var j = 0; j < n; j++) vIndices[j] = sp.getInt();
        continue;
      }
      if (word == 'M') { mIndex = sp.getInt(); break; } 
    }
    faces[i] = new Face(vIndices, mIndex);
    this.updateNumVertices(n); // Update number of vertex and number of index
  }
  this.skipToEndOfChunk();     // Skip to the end of chunk

  return faces;
}

// Update number of vertex and number of index
MQODoc.prototype.updateNumVertices = function(numIndices) {
 this.numVertices += numIndices;      // Add to total number of vertex
 if (numIndices == 3)
   this.numIndices += numIndices;     // Add 3 (Draw a triangle)
 else // numIndices == 4 (Rectangle)
   this.numIndices += numIndices * 2; // Add 6 (Draw 2 triangles)
}

// Skip to the end of chunk
MQODoc.prototype.skipToEndOfChunk = function() {
  var line;
  while (line = this.lines[this.index++])
    if (line.indexOf('}') >= 0) break;
}

//------------------------------------------------------------------------------
// Retrieve the information for drawing 3D model
MQODoc.prototype.getDrawingInfo = function() {
  // Create an arrays for vertex coordinates, normals, colors, and indices
  var vertices = new Float32Array(this.numVertices * 3);
  var normals = new Float32Array(this.numVertices * 3);
  var colors = new Float32Array(this.numVertices * 4);
  var indices = new Uint16Array(this.numIndices);

  var index_vertices = 0, index_colors = 0, index_indices = 0;
  for (var i = 0, nobj = this.objects.length; i < nobj; i++) {
    var obj = this.objects[i];   // Get current Object
    for (var j = 0, nface = obj.faces.length; j < nface; j++) {
      var face = obj.faces[j];   // Get current Face
      // Get material information
      var material;
      if (this.materials != null && face.mIndex >= 0)
        material = this.materials[face.mIndex];
      else
        material = obj.color;

      // Repeat the following steps for each vertex index
      for (var k = 0, n = face.vIndices.length; k < n; k++) {
        var v = obj.vertices[face.vIndices[k]];

        var normal;
        if (obj.shading == 0)   // Use either surface normal or vertex normal
          normal = face.normal; // Use surface normal
        else
          normal= v.normal;     // Use vertex normal

        for (var l = 0; l < 3; l++) {
          vertices[index_vertices + k * 3 + l] = v.xyz[l]; // Set vertex coordinates
          normals[index_vertices + k * 3 + l] = normal[l]; // Set normal coordinates
        }

        for (var l = 0; l < 4; l++) // Set colors
          colors[index_colors + k * 4 + l] = material.color[l];
      }

      for (var l = 0; l < 3; l++) // Set indices of the vertices
        indices[index_indices + l] = index_vertices / 3 + l;

      if (n == 4) { // In case of a rectangle, append another triangle
        indices[index_indices + 3] = index_vertices / 3 + 0;
        indices[index_indices + 4] = index_vertices / 3 + 2;
        indices[index_indices + 5] = index_vertices / 3 + 3;
        index_indices += 3;
      }
      index_indices += 3;
      index_vertices += (n * 3);
      index_colors += (n * 4);
    }
  }

  return new DrawingInfo(vertices, normals, colors, indices);
}

//------------------------------------------------------------------------------
// Material object
//------------------------------------------------------------------------------
var Material = function(r, g, b, a) {
  this.color = [r, g, b, a];
}

//------------------------------------------------------------------------------
// MQOObject object
//------------------------------------------------------------------------------
var MQOObject = function() {
  this.shading = 1;
  this.color = null;
  this.vertices = null;
  this.faces = null;
}

//------------------------------------------------------------------------------
// Vertex object
//------------------------------------------------------------------------------
var Vertex = function(x, y, z) {
  this.xyz = [x, y, z];
  this.normal = [0.0, 0.0, 0.0]; // Sum of the normal to the face of all that share this vertex
}

//------------------------------------------------------------------------------
// Face object
//------------------------------------------------------------------------------
var Face = function(vIndices, mIndex) {
  this.vIndices = vIndices;
  this.mIndex = mIndex;
  this.normal = null; // The normal of this face
}

// Set normal
Face.prototype.setNormal = function(vertices) {
  var v0 = vertices[this.vIndices[0]];
  var v1 = vertices[this.vIndices[1]];
  var v2 = vertices[this.vIndices[2]];

  // Calculate normal of this face
  this.normal = calcNormal(v0.xyz, v1.xyz, v2.xyz);
  // Check the normal
  if (this.normal == null) {
    if (this.vIndices.length == 4) { // If face is rectangle, calculate the normal with another 3 points
      var v3 = vertices[this.vIndices[3]];
      this.normal = calcNormal(v1.xyz, v2.xyz, v3.xyz);
    }
    if(this.normal == null){         // If failed to calculate the normal, set (0, 1, 0) to normal
      this.normal = [0.0, 1.0, 0.0];
    }
  }
  // Add the normal to all vertices constituting this face
  for(var i = 0, len = this.vIndices.length; i < len; i++){
    var v = vertices[this.vIndices[i]];
    v.normal[0] += this.normal[0]; // Note the addition
    v.normal[1] += this.normal[1];
    v.normal[2] += this.normal[2];
  }
}

//------------------------------------------------------------------------------
// Drawing information object (Vertex coordinates, Normals, Colors and Indices)
//------------------------------------------------------------------------------
var DrawingInfo = function(vertices, normals, colors, indices) {
  this.vertices = vertices;
  this.normals = normals;
  this.colors = colors;
  this.indices = indices;

  // console.log('vertices');
  // for (var i = 0; i < vertices.length; i += 3) {
  //   console.log(vertices[i] + ", " + vertices[i + 1] + ", " + vertices[i + 2]);
  // }
  //  console.log('colors');
  //  for (var i = 0; i < colors.length; i += 4) {
  //   console.log(colors[i] + ", " + colors[i + 1] + ", " + colors[i + 2] + ", " + colors[i + 2]);
  //  }
  //  console.log('indices');
  //  for (var i = 0; i < indices.length; i++) {
  //   console.log(indices[i] + ", ");
  //  }
}

//------------------------------------------------------------------------------
// String parsing object
//------------------------------------------------------------------------------
// Constructor
var StringParser = function(str) {
  this.str;   // Target string
  this.index; // Position of the string in processing
  this.init(str);
}

// Initialize StringParser object
StringParser.prototype.init = function(str)　{
  this.str = str;
  this.index = 0;
}

// Skip delimiters (' ','\t','(',')', '"')
StringParser.prototype.skipDelimiters = function() {
  for(var i = this.index, len = this.str.length; i < len; i++) {
    var c = this.str.charAt(i);
    // Skip TAB, Space, '(' and ')'
    if (c == '\t'|| c == ' ' || c == '(' || c == ')' || c == '"') continue;
    break;
  }
  this.index = i;
}

// Skip to top of the next word
StringParser.prototype.skipToNextWord = function() {
  this.skipDelimiters();
  var n = getWordLength(this.str, this.index);
  this.index += (n + 1);
}

// Get a word
StringParser.prototype.getWord = function() {
  this.skipDelimiters();
  var n = getWordLength(this.str, this.index);
  if (n == 0) return null;
  var word = this.str.substr(this.index, n);
  this.index += (n + 1);

  return word;
}

// Get a integer value
StringParser.prototype.getInt = function() {
  return parseInt(this.getWord()); // Convert string to integer value
}

// Get a floating-point value
StringParser.prototype.getFloat = function() {
  return parseFloat(this.getWord()); // Convert string to floating-point value
}

// Count letter number to delimiter ' ','\t','(',')' and '"'
function getWordLength(str, start) {
  var n = 0;
  for(var i = start, len = str.length; i < len; i++){
    var c = str.charAt(i);
    if (c == '\t'|| c == ' ' || c == '(' || c == ')' || c == '"') 
	break;
  }
  return i - start;
}

//------------------------------------------------------------------------------
// Common function (Calculate the normal)
//------------------------------------------------------------------------------
function calcNormal(p0, p1, p2) {
  // Calculate vector from p0 to p1 and vector from p1 to p2
  var v0 = new Float32Array(3);
  var v1 = new Float32Array(3);
  for (var i = 0; i < 3; i++){
    v0[i] = p0[i] - p1[i];
    v1[i] = p2[i] - p1[i];
  }

  // Calculate cross-product of v0 and v1
  var c = new Float32Array(3);
  c[0] = v0[1] * v1[2] - v0[2] * v1[1];
  c[1] = v0[2] * v1[0] - v0[0] * v1[2];
  c[2] = v0[0] * v1[1] - v0[1] * v1[0];

  // Normalize
  var v = new Vector3(c);
  v.normalize();
  return v.elements;
}
