export const onScreenFragmentShader = `
uniform vec2 res;
uniform sampler2D bufferTexture;
uniform sampler2D colorTexture;
uniform sampler2D crocTexture;
uniform vec3 mouse;

// A simple water effect by Tom@2016
//
// based on PolyCube version:
//    http://polycu.be/edit/?h=W2L7zN
//
// As people give me too much credit for this one,
// it's based on: http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
// A very old Hugo Elias water tutorial :)
//
// Note:
//   I could use one buffer only as in https://www.shadertoy.com/view/4sd3WB
//   with a clever trick to utilize two channels
//   and keep buffer A in x/r and buffer B in y/g.
//   However, now I render every second simulation step,
//   so the animation is more dynamic.
//
// Here is 1-buffer version for comparison:
//   https://www.shadertoy.com/view/4dK3Ww
//

const float kernel = 10.0f;
const float weight = 1.0f;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

  vec2 center = mouse.xy;

  //creates a shorthand for sin(iTime)
  float sSin = 2.1f;

  //changes the vUv to zoom in on the screen
  vec2 q = uv;

  vec3 e = vec3(vec2(1.f) / res.xy, 0.f);
  float p10 = texture(bufferTexture, q - e.zy).x;

  float p01 = texture(bufferTexture, q - e.xz).x;

  float p21 = texture(bufferTexture, q + e.xz).x;

  float p12 = texture(bufferTexture, q + e.zy).x;

  // Totally fake displacement and shading:
  vec3 grad = normalize(vec3(p21 - p01, p12 - p10, .1f)) * 1.25f;

  vec4 c = texture(inputBuffer, uv + grad.xy * 0.01f);
  vec3 light = normalize(vec3(24.0f, 2.5f, 10.0f));
  float diffuse = 16.0f - dot(grad, light);
  float spec = pow(max(0.f, reflect(light, grad).z), 10.f);

  vec4 backgroundColor = texture(inputBuffer, uv);

  outputColor = vec4(mix(c.rgb * max(diffuse, 1.f) + spec * uv.x, (vec3(0.0f, 0.0f, 0.0f)), 0.3f) * 0.1, 1.0f);
}
`;