import React, { Suspense, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useAppStore } from "../store/appStore";
import { useModelViewStore } from "../store/modelStore";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import * as THREE from "three";

const Model: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  const {
    scale,
    texture,
    setScene,
    tiltX,
    tiltY,
    mirrorX,
    mirrorY,
    mirrorZ,
    updateTransform,
    position,
    setPosition,
    isDragging,
    setIsDragging,
  } = useModelViewStore();
  const [originalMaterials, setOriginalMaterials] = useState<
    Map<THREE.Mesh, THREE.Material>
  >(new Map());

  const { scene: threeScene, camera, gl } = useThree();
  const modelRef = useRef<THREE.Group>();
  const dragStartPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    setScene(threeScene);
  }, [threeScene, setScene]);

  useEffect(() => {
    if (originalMaterials.size === 0) {
      const materials = new Map();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          materials.set(child, child.material.clone());
        }
      });
      setOriginalMaterials(materials);
    }

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (texture) {
          child.material.map = texture;
        } else {
          const originalMaterial = originalMaterials.get(child);
          if (originalMaterial) {
            child.material = originalMaterial.clone();
          } else {
            child.material.map = null;
          }
        }
        child.material.needsUpdate = true;
      }
    });
  }, [scene, texture, originalMaterials]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.x = THREE.MathUtils.degToRad(tiltX);
      modelRef.current.rotation.y = THREE.MathUtils.degToRad(tiltY);
      modelRef.current.scale.x = mirrorX ? -scale : scale;
      modelRef.current.scale.y = mirrorY ? -scale : scale;
      modelRef.current.scale.z = mirrorZ ? -scale : scale;
      modelRef.current.position.copy(position);

      // Update transform
      updateTransform(modelRef.current.position, modelRef.current.rotation);
    }
  });

  const onPointerDown = (event: THREE.Event) => {
    (event as unknown as PointerEvent).stopPropagation();
    setIsDragging(true);
    dragStartPosition.current.copy(position);
  };

  const onPointerUp = () => {
    console.log("lwq - onPointerUp");
    setIsDragging(false);
  };

  const onPointerMove = (event: THREE.Event) => {
    console.log("lwq - onPointerMove, event: ", event);
    if (isDragging && modelRef.current) {
      const { clientX, clientY } = event as any;
      const vec = new THREE.Vector3();
      const pos = new THREE.Vector3();

      vec.set(
        (clientX / gl.domElement.clientWidth) * 2 - 1,
        -(clientY / gl.domElement.clientHeight) * 2 + 1,
        0.5
      );

      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const distance = -camera.position.z / vec.z;
      pos.copy(camera.position).add(vec.multiplyScalar(distance));

      const newPosition = new THREE.Vector3(
        dragStartPosition.current.x + (pos.x - dragStartPosition.current.x),
        dragStartPosition.current.y + (pos.y - dragStartPosition.current.y),
        position.z
      );

      setPosition(newPosition);
    }
  };

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    />
  );
};

const LoadingPlaceholder: React.FC = () => (
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="skyblue" wireframe />
  </mesh>
);

const TransformDisplay: React.FC = () => {
  const { position, rotation, scale } = useModelViewStore();

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <h3 className="text-lg font-semibold mb-2">Transform Parameters</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p>Position:</p>
          <p>X: {position.x.toFixed(2)}</p>
          <p>Y: {position.y.toFixed(2)}</p>
          <p>Z: {position.z.toFixed(2)}</p>
        </div>
        <div>
          <p>Rotation (deg):</p>
          <p>X: {THREE.MathUtils.radToDeg(rotation.x).toFixed(2)}</p>
          <p>Y: {THREE.MathUtils.radToDeg(rotation.y).toFixed(2)}</p>
          <p>Z: {THREE.MathUtils.radToDeg(rotation.z).toFixed(2)}</p>
        </div>
        <div className="col-span-2">
          <p>Scale: {scale.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export const ModelView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const models = useAppStore((state) => state.models);
  const model = models.find((m) => m.id === Number(id));
  const {
    scale,
    setScale,
    autoRotate,
    toggleAutoRotate,

    setSelectedTexture,
    exportModel,
    tiltX,
    tiltY,
    setTilt,
    mirrorX,
    mirrorY,
    mirrorZ,
    toggleMirror,
    resetTransforms,
    isDragging,
  } = useModelViewStore();

  if (!model) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Model not found. Please check the URL and try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back to list
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-[600px] relative">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Suspense fallback={<LoadingPlaceholder />}>
                <Model url={model.glb_url} />
              </Suspense>
              <OrbitControls
                autoRotate={autoRotate}
                enableRotate={!isDragging}
                enablePan={false}
                enableZoom={true}
              />
            </Canvas>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Model Controls</h2>

          <div className="space-y-6">
            <TransformDisplay />
            <div>
              <label className="block text-sm font-medium mb-2">Scale</label>
              <Slider
                min={0.5}
                max={3}
                step={0.1}
                value={[scale]}
                onValueChange={([value]) => setScale(value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tilt X</label>
              <Slider
                min={-180}
                max={180}
                step={1}
                value={[tiltX]}
                onValueChange={([value]) => setTilt(value, tiltY)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tilt Y</label>
              <Slider
                min={-180}
                max={180}
                step={1}
                value={[tiltY]}
                onValueChange={([value]) => setTilt(tiltX, value)}
              />
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={() => toggleMirror("x")}
                variant={mirrorX ? "default" : "outline"}
              >
                Mirror X
              </Button>
              <Button
                onClick={() => toggleMirror("y")}
                variant={mirrorY ? "default" : "outline"}
              >
                Mirror Y
              </Button>
              <Button
                onClick={() => toggleMirror("z")}
                variant={mirrorZ ? "default" : "outline"}
              >
                Mirror Z
              </Button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Texture</label>
              <Select onValueChange={setSelectedTexture}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a texture" />
                </SelectTrigger>
                <SelectContent>
                  {["Default", "Wood", "Metal", "Marble"].map((texture) => (
                    <SelectItem key={texture} value={texture}>
                      {texture}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={toggleAutoRotate}
                variant={autoRotate ? "default" : "outline"}
              >
                {autoRotate ? "Stop Rotation" : "Start Rotation"}
              </Button>
              <Button onClick={resetTransforms}>Reset Transforms</Button>
            </div>
            <div className="flex space-x-4">
              <Button onClick={() => exportModel("gltf")} className="flex-1">
                Export as GLTF
              </Button>
              <Button onClick={() => exportModel("obj")} className="flex-1">
                Export as OBJ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
