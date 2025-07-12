import React, { forwardRef, useMemo } from "react";
import { Uniform } from "three";
import { Effect } from "postprocessing";
import { onScreenFragmentShader } from "./shaders/onScreenFragmentShader";
import * as THREE from "three";

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
    super("RippleEffect", onScreenFragmentShader, {
      uniforms: new Map([
        ["bufferTexture", new Uniform(bufferTexture)],
        ["res", new Uniform(res)],
        ["mouse", new Uniform(mouse)],
        ["colorTexture", new Uniform(colorTexture)],
        ["crocTexture", new Uniform(crocTexture)],
      ]),
    });

    _bufferTexture = bufferTexture;
    _res = res;
    _mouse = mouse;
    _colorTexture = colorTexture;
    _crocTexture = crocTexture;
  }

  update(renderer: THREE.WebGLRenderer, inputBuffer: THREE.WebGLRenderTarget, deltaTime: number) {
    this.uniforms.get("bufferTexture").value = _bufferTexture;
    this.uniforms.get("res").value = _res;
    this.uniforms.get("mouse").value = _mouse;
    this.uniforms.get("colorTexture").value = _colorTexture;
    this.uniforms.get("crocTexture").value = _crocTexture;
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
  }
);