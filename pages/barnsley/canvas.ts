import * as THREE from 'three';
import type { Camera, Renderer, Scene } from 'three';

const vertexShader = `
    attribute float alpha;
    varying float vAlpha;

    void main() {
        vAlpha = alpha;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = 1.0;
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = (alpha: number) => `
    uniform vec3 color;
    varying float vAlpha;

    void main() {
        gl_FragColor = vec4( color, ${alpha} );
    }
`;

export const Z_MAX = 5000;

export const setup = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        Z_MAX
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return { camera, scene, renderer };
};

interface RenderConfig {
    alpha: number;
    color: string;
    camera: Camera;
    renderer: Renderer;
    scene: Scene;
    vertices: number[];
}

export const setCameraZ = (camera: Camera, value: number) => {
    camera.position.z = value;
};

export const setSceneBg = (scene: Scene, value: string) => {
    scene.background = new THREE.Color(value);
};

export const render = ({
    alpha,
    color,
    camera,
    renderer,
    scene,
    vertices
}: RenderConfig) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.center();

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(color) }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader(alpha),
        transparent: true
    });

    const points = new THREE.Points(geometry, shaderMaterial);

    scene.add(points);
    renderer.render(scene, camera);

    return () => {
        scene.clear();
    };
};
