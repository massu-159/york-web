export const offScreenFragmentShader = `
uniform sampler2D bufferTexture;
uniform vec3 mouse;
uniform float time;
uniform vec2 res;

varying vec2 vUv;

// Make this a smaller number for a smaller timestep.
// Don't make it bigger than 1.4 or the universe will explode.
const float delta = 1.8f;

void main() {
  vec3 e = vec3(vec2(1.f) / res.xy / 2.0f, 0.f);
  vec2 q = vUv;

  vec4 c = texture(bufferTexture, q);

  float p11 = c.y;

  float p10 = texture(bufferTexture, q - e.zy).x;
  float p01 = texture(bufferTexture, q - e.xz).x;
  float p21 = texture(bufferTexture, q + e.xz).x;
  float p12 = texture(bufferTexture, q + e.zy).x;

  float d = 0.f;

  if(mouse.z > 1.f) {
      // Mouse interaction:
    // d = smoothstep(4.5f, .5f, length(mouse.xy * res.xy - gl_FragCoord.xy));
    d = smoothstep(4.0f, 0.0f, length(mouse.xy * res.xy - vUv.xy * res.xy));
  }

  // d = mix(smoothstep(24.0f, 5.0f, length(mouse.xy * res.xy - vUv.xy * res.xy)), d, 0.2f);

   // The actual propagation:
  d += -(p11 - .5f) * 2.f + (p10 + p01 + p21 + p12 - 2.f);
  d *= .995f; // dampening

  d *= float(time >= 2.0f); // clear the buffer at iFrame < 2
  d = d * .5f + .5f;

   // Put previous state as "y":
  gl_FragColor = vec4(d, c.x, 0, 0);

  // if(vUv.x < 0.01f || vUv.x > 0.99f || vUv.y < 0.01f || vUv.y > 0.99f) {
  //   fragColor = vec4(d * 0.91f, c.x, 0, 0);
  // }
}
`;