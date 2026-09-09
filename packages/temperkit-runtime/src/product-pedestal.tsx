"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { SceneSpec } from "@temperkit/schema";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, type Group, type Points } from "three";
import { StageRoot } from "./scene-objects";
import { useReducedMotion } from "./use-reduced-motion";

type ProductPedestalProps = {
  spec: SceneSpec;
  className?: string;
};

function Dust({ spec, reduced }: { spec: SceneSpec; reduced: boolean }) {
  const points = useRef<Points>(null);
  const positions = useMemo(() => {
    const count = spec.atmosphere.dustCount;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 5.5;
      arr[i * 3 + 1] = Math.random() * 2.8 + 0.15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5.5;
    }
    return arr;
  }, [spec.atmosphere.dustCount]);

  useFrame((_, delta) => {
    if (reduced || !points.current) {
      return;
    }
    points.current.rotation.y += delta * 0.03;
  });

  if (reduced || spec.atmosphere.dustCount === 0) {
    return null;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color={spec.brand.colors.muted}
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function PedestalRig({ spec }: { spec: SceneSpec }) {
  const group = useRef<Group>(null);
  const spin = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const reduced = useReducedMotion();
  const targetTilt = useRef({ x: 0, z: 0 });

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) {
      return;
    }

    if (!reduced && !dragging.current) {
      spin.current += spec.motion.turntableSpeed * delta;
      spin.current += velocity.current * delta;
      velocity.current *= 0.92;
    }

    const pointer = state.pointer;
    const tilt = reduced ? 0 : spec.motion.pointerTilt;
    targetTilt.current.x = pointer.y * tilt * 0.4;
    targetTilt.current.z = -pointer.x * tilt * 0.35;

    node.rotation.y = spin.current;
    node.rotation.x += (targetTilt.current.x - node.rotation.x) * 0.08;
    node.rotation.z += (targetTilt.current.z - node.rotation.z) * 0.08;
  });

  return (
    <group
      onPointerDown={(event) => {
        dragging.current = true;
        lastX.current = event.clientX;
        event.stopPropagation();
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
      onPointerMove={(event) => {
        if (!dragging.current) {
          return;
        }
        const dx = event.clientX - lastX.current;
        lastX.current = event.clientX;
        spin.current += dx * 0.01;
        velocity.current = dx * 0.04;
      }}
    >
      <group ref={group}>
        <StageRoot spec={spec} />
      </group>
    </group>
  );
}

function StudioLights({ spec }: { spec: SceneSpec }) {
  const key = useMemo(() => new Color("#f4efe6"), []);
  const fill = useMemo(
    () => new Color(spec.brand.colors.muted),
    [spec.brand.colors.muted],
  );

  return (
    <>
      <color attach="background" args={[spec.atmosphere.bgTop]} />
      <hemisphereLight
        args={[spec.brand.colors.text, spec.atmosphere.bgBottom, 0.65]}
      />
      <ambientLight
        intensity={spec.lighting.ambientIntensity}
        color={spec.brand.colors.text}
      />
      <spotLight
        position={[3.4, 6.2, 3.1]}
        angle={0.42}
        penumbra={0.7}
        intensity={spec.lighting.keyIntensity}
        color={key}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        position={[-3.2, 2.4, -1.6]}
        intensity={spec.lighting.fillIntensity}
        color={fill}
      />
      <pointLight position={[0.4, 1.8, 3.2]} intensity={1.4} color="#fff6ea" />
      <pointLight
        position={[0.2, 0.6, 2.4]}
        intensity={0.85}
        color={spec.brand.colors.accent}
      />
    </>
  );
}

function Scene({ spec }: { spec: SceneSpec }) {
  const reduced = useReducedMotion();
  return (
    <>
      <StudioLights spec={spec} />
      <PedestalRig spec={spec} />
      <Dust spec={spec} reduced={reduced} />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.42}
        scale={10}
        blur={2.6}
        far={4.5}
        color="#000000"
      />
    </>
  );
}

export function ProductPedestal({ spec, className }: ProductPedestalProps) {
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", minHeight: 320 }}
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 1.55, 4.4], fov: 32, near: 0.1, far: 40 }}
        shadows
        fallback={
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "100%",
              color: spec.brand.colors.text,
              background: spec.atmosphere.bgTop,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            WebGL is unavailable. Brand tokens still exported.
          </div>
        }
      >
        <Scene spec={spec} />
      </Canvas>
    </div>
  );
}
