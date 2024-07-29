import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useModelViewStore } from "../store/modelStore";

export const LoadingPlaceholder: React.FC = () => (
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="skyblue" wireframe />
  </mesh>
);

const Model: React.FC<{ url: string }> = ({ url }) => {
  const { scene: loadedScene } = useGLTF(url);
  const { scene: threeScene } = useThree();

  const { scale, texture, tilt, mirror, position, setScene, updateTransform } =
    useModelViewStore();

  const modelRef = useRef<THREE.Group>(null);

  const originalMaterialsRef = useRef(new Map<THREE.Mesh, THREE.Material>());

  useEffect(() => {
    setScene(threeScene);
  }, [threeScene, setScene]);

  useEffect(() => {
    if (originalMaterialsRef.current.size === 0) {
      loadedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          originalMaterialsRef.current.set(child, child.material.clone());
        }
      });
    }

    loadedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial;
        if (texture) {
          material.map = texture;
        } else {
          const originalMaterial = originalMaterialsRef.current.get(child);
          if (originalMaterial) {
            child.material = originalMaterial.clone();
          } else {
            material.map = null;
          }
        }
        material.needsUpdate = true;
      }
    });
  }, [loadedScene, texture]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = THREE.MathUtils.degToRad(tilt.x);
      modelRef.current.rotation.y = THREE.MathUtils.degToRad(tilt.y);
      modelRef.current.rotation.z = THREE.MathUtils.degToRad(tilt.z);
      modelRef.current.scale.set(
        mirror.x ? -scale : scale,
        mirror.y ? -scale : scale,
        mirror.z ? -scale : scale
      );
      modelRef.current.position.copy(position);
      // Update transform
      updateTransform(modelRef.current.position, modelRef.current.rotation);
    }
  });

  return <primitive ref={modelRef} object={loadedScene} scale={scale} />;
};

export default Model;
