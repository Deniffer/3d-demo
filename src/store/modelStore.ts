import create from "zustand";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";

import {
  createMarbleTexture,
  createMetalTexture,
  createWoodTexture,
} from "../utils/texture";

// Define texture types
type TextureType = "Default" | "Wood" | "Metal" | "Marble";

// Define texture creators
const textureCreators: Record<TextureType, () => THREE.Texture | null> = {
  Default: () => null,
  Wood: createWoodTexture,
  Metal: createMetalTexture,
  Marble: createMarbleTexture,
};

// Define ModelViewStore type
interface ModelViewStore {
  scale: number;
  setScale: (scale: number) => void;
  autoRotate: boolean;
  toggleAutoRotate: () => void;
  selectedTexture: TextureType;
  setSelectedTexture: (texture: TextureType) => void;
  texture: THREE.Texture | null;
  scene: THREE.Scene | null;
  setScene: (scene: THREE.Scene) => void;
  exportModel: (format: "obj" | "gltf") => void;
  tilt: { x: number; y: number; z: number };
  setTilt: (x: number, y: number, z: number) => void;
  mirror: { x: boolean; y: boolean; z: boolean };
  toggleMirror: (axis: "x" | "y" | "z") => void;
  resetTransforms: () => void;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  updateTransform: (position: THREE.Vector3, rotation: THREE.Euler) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export const useModelViewStore = create<ModelViewStore>((set, get) => ({
  scale: 1.5,
  setScale: (scale) => set({ scale }),
  autoRotate: true,
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
  selectedTexture: "Default",
  setSelectedTexture: (texture) => {
    set({
      selectedTexture: texture,
      texture: textureCreators[texture](),
    });
  },
  texture: null,
  scene: null,
  setScene: (scene) => set({ scene }),
  exportModel: (format) => {
    const { scene, scale } = get();
    if (!scene) return;

    const clonedScene = scene.clone();
    clonedScene.scale.setScalar(scale);

    if (format === "gltf") {
      const exporter = new GLTFExporter();
      exporter.parse(
        clonedScene,
        (gltf) => {
          const output = JSON.stringify(gltf, null, 2);
          const blob = new Blob([output], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "model.gltf";
          link.click();
          URL.revokeObjectURL(url);
        },
        (error) => {
          console.error("An error happened during export:", error);
        },
        { binary: false }
      );
    } else if (format === "obj") {
      const exporter = new OBJExporter();
      const result = exporter.parse(clonedScene);
      const blob = new Blob([result], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "model.obj";
      link.click();
      URL.revokeObjectURL(url);
    }
  },
  tilt: { x: 0, y: 0, z: 0 },
  setTilt: (x, y, z) => set({ tilt: { x, y, z } }),
  mirror: { x: false, y: false, z: false },
  toggleMirror: (axis) =>
    set((state) => ({
      mirror: { ...state.mirror, [axis]: !state.mirror[axis] },
    })),
  position: new THREE.Vector3(),
  rotation: new THREE.Euler(),
  updateTransform: (position, rotation) => set({ position, rotation }),
  resetTransforms: () =>
    set({
      scale: 1.5,
      tilt: { x: 0, y: 0, z: 0 },
      mirror: { x: false, y: false, z: false },
      position: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      isDragging: false,
    }),
  isDragging: false,
  setIsDragging: (isDragging) => set({ isDragging }),
}));
