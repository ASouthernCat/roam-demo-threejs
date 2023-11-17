import { WebGLRenderer, VSMShadowMap,ACESFilmicToneMapping,SRGBColorSpace } from 'three';
import { sizes } from '../system/sizes';
function createRenderer(container) {
    const renderer = new WebGLRenderer({
        canvas: container,
        antialias: true, //抗锯齿
    })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = VSMShadowMap
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // renderer.outputColorSpace = SRGBColorSpace
    return renderer
}

export { createRenderer }