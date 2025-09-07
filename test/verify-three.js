var THREE = require('three');
var assert = require("assert");

describe('The THREE object', function() {
  it('should have a defined BasicShadowMap constant', function() {
    assert.notEqual('undefined', THREE.BasicShadowMap);
  }),

  it('should be able to construct a Vector3 with default of x=0', function() {
    var vec3 = new THREE.Vector3();
    assert.equal(0, vec3.x);
  })
});