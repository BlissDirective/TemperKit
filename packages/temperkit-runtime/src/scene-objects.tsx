"use client";

import type { ProductShape, SceneSpec } from "@temperkit/schema";
import { type JSX, useMemo } from "react";
import { DoubleSide, LatheGeometry, Vector2 } from "three";

type ProductProps = {
  spec: SceneSpec;
};

function ProductMaterial({ spec }: { spec: SceneSpec }) {
  return (
    <meshStandardMaterial
      color={spec.product.color}
      metalness={spec.product.metallic}
      roughness={spec.product.roughness}
      envMapIntensity={1.1}
      emissive={spec.product.color}
      emissiveIntensity={0.12}
    />
  );
}

function Bottle({ spec }: ProductProps) {
  const geometry = useMemo(() => {
    const points = [
      [0.0, 0.0],
      [0.28, 0.0],
      [0.3, 0.08],
      [0.27, 0.72],
      [0.2, 0.92],
      [0.08, 1.02],
      [0.07, 1.28],
      [0.1, 1.32],
      [0.09, 1.36],
      [0.0, 1.36],
    ].map(([x, y]) => new Vector2(x, y));
    return new LatheGeometry(points, 48);
  }, []);

  return (
    <group>
      <mesh geometry={geometry} castShadow>
        <ProductMaterial spec={spec} />
      </mesh>
      <mesh castShadow position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.11, 0.09, 0.12, 32]} />
        <meshStandardMaterial
          color={spec.brand.colors.accent}
          metalness={0.85}
          roughness={0.22}
          emissive={spec.brand.colors.accent}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

function Flask({ spec }: ProductProps) {
  const geometry = useMemo(() => {
    const points = [
      [0.0, 0.0],
      [0.22, 0.0],
      [0.32, 0.18],
      [0.34, 0.55],
      [0.18, 0.82],
      [0.08, 0.92],
      [0.07, 1.18],
      [0.1, 1.22],
      [0.0, 1.22],
    ].map(([x, y]) => new Vector2(x, y));
    return new LatheGeometry(points, 48);
  }, []);

  return (
    <mesh geometry={geometry} castShadow>
      <ProductMaterial spec={spec} />
    </mesh>
  );
}

function Device({ spec }: ProductProps) {
  return (
    <group>
      <mesh castShadow position={[0, 0.72, 0]}>
        <boxGeometry args={[0.72, 1.44, 0.08]} />
        <ProductMaterial spec={spec} />
      </mesh>
      <mesh position={[0, 0.72, 0.042]}>
        <boxGeometry args={[0.62, 1.28, 0.01]} />
        <meshStandardMaterial
          color={spec.brand.colors.surface}
          metalness={0.2}
          roughness={0.18}
          emissive={spec.brand.colors.accent}
          emissiveIntensity={0.18}
        />
      </mesh>
    </group>
  );
}

function Canister({ spec }: ProductProps) {
  return (
    <group>
      <mesh castShadow position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.32, 0.34, 0.84, 48]} />
        <ProductMaterial spec={spec} />
      </mesh>
      <mesh castShadow position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.08, 48]} />
        <meshStandardMaterial
          color={spec.brand.colors.accent}
          metalness={0.7}
          roughness={0.28}
        />
      </mesh>
    </group>
  );
}

function Orb({ spec }: ProductProps) {
  return (
    <mesh castShadow position={[0, 0.46, 0]}>
      <sphereGeometry args={[0.42, 48, 32]} />
      <ProductMaterial spec={spec} />
    </mesh>
  );
}

export const PRODUCT_SHAPE_RENDERERS: Record<
  ProductShape,
  (props: ProductProps) => JSX.Element
> = {
  bottle: Bottle,
  flask: Flask,
  device: Device,
  canister: Canister,
  orb: Orb,
};

export function ProductModel({ spec }: ProductProps) {
  const Renderer = PRODUCT_SHAPE_RENDERERS[spec.product.shape] ?? Device;
  return (
    <group scale={spec.product.scale}>
      <Renderer spec={spec} />
    </group>
  );
}

export function Pedestal({ spec }: ProductProps) {
  const { radius, height, color, metallic, roughness, rimGlow } = spec.pedestal;
  return (
    <group>
      <mesh receiveShadow castShadow position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius * 1.04, height, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={metallic}
          roughness={roughness}
        />
      </mesh>
      <mesh position={[0, height + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 0.72, radius * 0.98, 64]} />
        <meshStandardMaterial
          color={spec.brand.colors.accent}
          metalness={0.8}
          roughness={0.22}
          emissive={spec.brand.colors.accent}
          emissiveIntensity={rimGlow ? 0.35 : 0}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function StageRoot({ spec }: ProductProps) {
  return (
    <group>
      <Pedestal spec={spec} />
      <group position={[0, spec.pedestal.height + 0.02, 0]}>
        <ProductModel spec={spec} />
      </group>
    </group>
  );
}
