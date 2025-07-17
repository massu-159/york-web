import { Effect } from 'postprocessing';
import { Uniform } from 'three';
import * as THREE from 'three';

import React, { forwardRef, useMemo } from 'react';

import { onScreenFragmentShader } from './shaders/onScreenFragmentShader';

interface RippleEffectProps {
  bufferTexture?: THREE.Texture | null;
  res?: THREE.Vector2 | null;
  mouse?: THREE.Vector3 | null;
  colorTexture?: THREE.Texture | null;
  crocTexture?: THREE.Texture | null;
}

let _bufferTexture: THREE.Texture | null;
let _res: THREE.Vector2 | null;
let _mouse: THREE.Vector3 | null;
let _colorTexture: THREE.Texture | null;
let _crocTexture: THREE.Texture | null;

class MyCustomEffectImpl extends Effect {
  constructor({
    bufferTexture = null,
    res = null,
    mouse = null,
    colorTexture = null,
    crocTexture = null,
  }: RippleEffectProps = {}) {
    super('RippleEffect', onScreenFragmentShader, {
      uniforms: new Map<string, Uniform<any>>([
        ['bufferTexture', new Uniform(bufferTexture)],
        ['res', new Uniform(res)],
        ['mouse', new Uniform(mouse)],
        ['colorTexture', new Uniform(colorTexture)],
        ['crocTexture', new Uniform(crocTexture)],
      ]),
    });

    _bufferTexture = bufferTexture;
    _res = res;
    _mouse = mouse;
    _colorTexture = colorTexture;
    _crocTexture = crocTexture;
  }

  update(
    renderer: THREE.WebGLRenderer,
    inputBuffer: THREE.WebGLRenderTarget,
    deltaTime: number,
  ) {
    const bufferTextureUniform = this.uniforms.get('bufferTexture');
    const resUniform = this.uniforms.get('res');
    const mouseUniform = this.uniforms.get('mouse');
    const colorTextureUniform = this.uniforms.get('colorTexture');
    const crocTextureUniform = this.uniforms.get('crocTexture');

    if (bufferTextureUniform) bufferTextureUniform.value = _bufferTexture;
    if (resUniform) resUniform.value = _res;
    if (mouseUniform) mouseUniform.value = _mouse;
    if (colorTextureUniform) colorTextureUniform.value = _colorTexture;
    if (crocTextureUniform) crocTextureUniform.value = _crocTexture;
  }
}

export const RippleEffect = forwardRef<Effect, RippleEffectProps>(
  ({ bufferTexture, res, mouse, colorTexture, crocTexture }, ref) => {
    const effect = useMemo(() => {
      return new MyCustomEffectImpl({
        bufferTexture,
        res,
        mouse,
        colorTexture,
        crocTexture,
      });
    }, [bufferTexture, res, mouse, colorTexture, crocTexture]);

    return <primitive ref={ref} object={effect} />;
  },
);
