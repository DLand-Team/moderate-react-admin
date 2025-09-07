#ifdef GL_ES
precision mediump float;
#endif GL_ES
varying vec4 v_Color;
void main() {
  gl_FragColor = v_Color;
}

