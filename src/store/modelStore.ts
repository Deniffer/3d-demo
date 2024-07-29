import create from "zustand";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import {
  createMarbleTexture,
  createMetalTexture,
  createWoodTexture,
} from "../utils/texture";

const textures = [
  { name: "Default", create: () => null },
  { name: "Wood", create: createWoodTexture },
  { name: "Metal", create: createMetalTexture },
  { name: "Marble", create: createMarbleTexture },
];

type ModelViewStore = {
  scale: number;
  setScale: (scale: number) => void;
  autoRotate: boolean;
  toggleAutoRotate: () => void;
  selectedTexture: string;
  setSelectedTexture: (texture: string) => void;
  texture: THREE.Texture | null;
  scene: THREE.Scene | null;
  setScene: (scene: THREE.Scene) => void;
  exportModel: (format: "obj" | "gltf") => void;
  tiltX: number;
  tiltY: number;
  setTilt: (x: number, y: number) => void;
  mirrorX: boolean;
  mirrorY: boolean;
  mirrorZ: boolean;
  toggleMirror: (axis: "x" | "y" | "z") => void;
  resetTransforms: () => void;
  position: THREE.Vector3;
  setPosition: (position: THREE.Vector3) => void;
  rotation: THREE.Euler;
  updateTransform: (position: THREE.Vector3, rotation: THREE.Euler) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
};

export const useModelViewStore = create<ModelViewStore>((set, get) => ({
  scale: 1.5,
  setScale: (scale) => set({ scale }),
  autoRotate: true,
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
  selectedTexture: "Default",
  setSelectedTexture: (texture) => {
    set({ selectedTexture: texture });
    const textureObj = textures.find((t) => t.name === texture);
    set({ texture: textureObj ? textureObj.create() : null });
  },
  texture: null,
  scene: null,
  setScene: (scene) => set({ scene }),
  exportModel: (format) => {
    const { scene, scale } = get();
    if (!scene) return;

    const clonedScene = scene.clone();
    clonedScene.scale.set(scale, scale, scale);

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
      // For OBJ export, you would need to implement or use a separate OBJ exporter
      console.warn("OBJ export not implemented yet");
    }
  },
  tiltX: 0,
  tiltY: 0,
  setTilt: (x, y) => set({ tiltX: x, tiltY: y }),
  mirrorX: false,
  mirrorY: false,
  mirrorZ: false,
  position: new THREE.Vector3(),
  setPosition: (position: THREE.Vector3) => set({ position }),

  rotation: new THREE.Euler(),
  updateTransform: (position, rotation) => set({ position, rotation }),

  toggleMirror: (axis: 'x' | 'y' | 'z') =>
    set((state) => ({
      [`mirror${axis.toUpperCase()}`]: !state[`mirror${axis.toUpperCase()}` as keyof typeof state],
    })),
  resetTransforms: () =>
    set({
      scale: 1.5,
      tiltX: 0,
      tiltY: 0,
      mirrorX: false,
      mirrorY: false,
      mirrorZ: false,
      position: new THREE.Vector3(),
      rotation: new THREE.Euler(),
    }),
  isDragging: false,
  setIsDragging: (isDragging) => set({ isDragging }),
}));
