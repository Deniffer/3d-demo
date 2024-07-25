import * as THREE from "three";

export const createWoodTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, "#8B4513");
  gradient.addColorStop(1, "#D2691E");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 32; i++) {
    const x = Math.random() * 256;
    const y = 0;
    const width = 2;
    const height = 256;
    context.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`;
    context.fillRect(x, y, width, height);
  }

  return new THREE.CanvasTexture(canvas);
};

export const createMetalTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.fillStyle = "#A9A9A9";
  context.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    context.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
    context.fillRect(x, y, 1, 1);
  }

  return new THREE.CanvasTexture(canvas);
};

export const createMarbleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.fillStyle = "#F0F0F0";
  context.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 5; i++) {
    const gradient = context.createRadialGradient(
      Math.random() * 256,
      Math.random() * 256,
      0,
      Math.random() * 256,
      Math.random() * 256,
      Math.random() * 128
    );
    gradient.addColorStop(0, `rgba(0, 0, 0, ${Math.random() * 0.1})`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
  }

  return new THREE.CanvasTexture(canvas);
};
