'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three/webgpu';
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { Mesh } from 'three';

import {
    abs,
    float,
    oneMinus,
    smoothstep,
    texture,
    uniform,
    uv,
    pass,
    mix,
    add,
    vec3
} from 'three/tsl';

const TEXTUREMAP = { src: 'https://i.postimg.cc/XYwvXN8D/img-4.png' };
const DEPTHMAP = { src: 'https://i.postimg.cc/2SHKQh2q/raw-4.webp' };

const PostProcessing = ({ strength = 1, threshold = 1 }) => {
    const { gl, scene, camera } = useThree();
    const progressRef = useRef({ value: 0 });
    const isRendering = useRef(false);

    const render = useMemo(() => {
        const pp = new THREE.PostProcessing(gl as any);
        const scenePass = pass(scene, camera);
        const scenePassColor = scenePass.getTextureNode('output');
        const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

        const uScanProgress = uniform(0);
        progressRef.current = uScanProgress;

        const scanPos = float(uScanProgress);
        const uvY = uv().y;
        const scanWidth = float(0.05);
        const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
        const redOverlay = vec3(1, 0, 0).mul(oneMinus(scanLine)).mul(0.4);

        const final = mix(
            scenePassColor,
            add(scenePassColor, redOverlay),
            smoothstep(0.9, 1.0, oneMinus(scanLine))
        ).add(bloomPass);

        pp.outputNode = final;
        return pp;
    }, [camera, gl, scene, strength, threshold]);

    useFrame(({ clock }) => {
        progressRef.current.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
        if (isRendering.current) return;
        isRendering.current = true;
        render.renderAsync().finally(() => { isRendering.current = false; });
    }, 1);

    return null;
};

const Scene = () => {
    const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
    const uniforms = useMemo(() => ({
        uPointer: uniform(new THREE.Vector2(0)),
        uProgress: uniform(0)
    }), []);

    const material = useMemo(() => {
        const tDepthMap = texture(depthMap);
        const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uniforms.uPointer).mul(0.015)));

        const depth = tDepthMap.r;
        const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uniforms.uProgress))));
        const mask = vec3(10, 0, 0).mul(flow).mul(0.5);

        // Radial fade to avoid hard edges
        const radialMask = oneMinus(smoothstep(0.3, 0.5, uv().distance(0.5)));

        return new THREE.MeshBasicNodeMaterial({
            colorNode: add(tMap, mask).mul(radialMask),
            transparent: true,
            opacity: 1
        });
    }, [rawMap, depthMap, uniforms]);

    const [w, h] = useAspect(300, 300);

    useFrame(({ clock, pointer }) => {
        uniforms.uProgress.value = (Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5);
        uniforms.uPointer.value.lerp(pointer, 0.05);
    });

    return (
        <mesh scale={[w * 0.45, h * 0.45, 1]} material={material}>
            <planeGeometry />
        </mesh>
    );
};

export const HeroBackground = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0a]">
            <Canvas
                flat
                dpr={isMobile ? 1 : [1, 1.5]}
                style={{ background: '#0a0a0a' }}
                gl={async (props) => {
                    const renderer = new THREE.WebGPURenderer({
                        ...props,
                        antialias: false,
                        alpha: true
                    } as any);
                    await renderer.init();
                    renderer.setClearColor(new THREE.Color(0x0a0a0a), 1);
                    return renderer;
                }}
            >
                {!isMobile && <PostProcessing strength={0.6} threshold={1.2} />}
                <Scene />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/0 via-[#0a0a0a]/20 to-[#0a0a0a] pointer-events-none" />
        </div>
    );
};
