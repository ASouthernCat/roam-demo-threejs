import * as resize from "./system/resize"
import * as THREE from "three"
import Stats from "stats.js"
import { createCamera } from "./base/camera"
import { createScene } from "./base/scene"
import { createCube } from "./base/cube"
import { createRenderer } from "./base/renderer"
import { createControl } from "./base/control"
import addLight from "./base/light"
import gameInit from "./main/game"
import { gameUpdate } from "./main/game"

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// stats.dom.style.top = "20%"
document.body.appendChild(stats.dom);
class ThreeApp {
    constructor(container) {
        // console.log(container)
        console.log("场景初始化")
        this.container = container
        this.init()
        gameInit(this)
    }
    init(){
        // 相机 camera
        this.camera = createCamera()
        // 控制器
        // this.control = createControl(this.camera, this.container)
        // 场景 scene
        this.scene = createScene()
        // 光源
        addLight(this.scene)
        // 场景组成内容 object3D
        // const cube = createCube()
        // this.scene.add(cube)
        // 渲染器 renderer
        this.renderer = createRenderer(this.container)
        // resize
        resize.resizeEventListener(this.camera, this.renderer)
    }
    game(){
        
    }
    render() {
        // 渲染场景
        console.log("渲染场景...")
        const clock = new THREE.Clock()
        let previousTime = 0
        const STEPS_PER_FRAME = 5;
        this.tick = () => {
            stats.update()
            const deltaTime = Math.min(0.05,clock.getDelta())/ STEPS_PER_FRAME
            const elapsedTime = clock.getElapsedTime()
            const mixerUpdateDelta = elapsedTime - previousTime
            previousTime = elapsedTime

            for(let i = 0; i< STEPS_PER_FRAME; i++){
                gameUpdate(deltaTime)
            }
            if(this.mixer instanceof THREE.AnimationMixer){
                this.mixer.update(mixerUpdateDelta)
            }
            // // Update controls
            // this.control.update()

            // Raycast
            // pickHelper.pick(pickPosition, currentScene.scene, camera)

            // // Render
            this.renderer.render(this.scene, this.camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(this.tick)
        }
        this.tick()
    }
    clear() {
        console.log("清理内存")
        location.reload()
        resize.clear()
        this.tick = null
        this.scene = null
        this.camera = null
        this.renderer.dispose()
        this.control.dispose()
    }
}

export { ThreeApp }