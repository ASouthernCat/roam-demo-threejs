import * as THREE from 'three'

function createFillLight(){
    const fillLight1 = new THREE.HemisphereLight( 0x8dc1de, 0x00668d, 1.5 );
    fillLight1.position.set( 2, 1, 1 );
    return fillLight1
}

function createDirectionLight(){
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 2.5 );
    directionalLight.position.set( - 5, 25, - 1 );
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.left = - 30;
    directionalLight.shadow.camera.top	= 30;
    directionalLight.shadow.camera.bottom = - 30;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = - 0.00006;
    return directionalLight
}

/**
 * 
 * @param {THREE.Scene} scene 
 */
export default function addLight(scene){
    let fillLight1 = createFillLight()
    let directionalLight = createDirectionLight()
    if(scene instanceof THREE.Scene){
        scene.add(fillLight1)
        scene.add(directionalLight)
    }
}