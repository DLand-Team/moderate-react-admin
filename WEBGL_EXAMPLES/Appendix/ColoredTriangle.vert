attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
void main() {
  gl_Position = a_Position;
  v_Color = a_Color;
}
