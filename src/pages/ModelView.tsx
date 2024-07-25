import React, { Suspense, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import { useAppStore } from "../store/appStore";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";

const Model: React.FC<{ url: string; scale: number }> = ({ url, scale }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
};

const LoadingPlaceholder: React.FC = () => (
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="skyblue" wireframe />
  </mesh>
);

export const ModelView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const models = useAppStore((state) => state.models);
  const model = models.find((m) => m.id === Number(id));
  const [scale, setScale] = useState(1.5);
  const [autoRotate, setAutoRotate] = useState(true);

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
                <Model url={model.glb_url} scale={scale} />
              </Suspense>
              <OrbitControls autoRotate={autoRotate} />
            </Canvas>
            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-75 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="scale-slider" className="text-sm font-medium">
                  Model Size:
                </label>
                <span className="text-sm">{scale.toFixed(1)}x</span>
              </div>
              <Slider
                id="scale-slider"
                min={0.5}
                max={3}
                step={0.1}
                value={[scale]}
                onValueChange={([value]) => setScale(value)}
              />
              <Button
                onClick={() => setAutoRotate(!autoRotate)}
                className="mt-2 w-full"
                variant={autoRotate ? "default" : "outline"}
              >
                {autoRotate ? "Stop Rotation" : "Start Rotation"}
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{model.prompt}</h1>
          <p className="text-gray-600 mb-2">Type: {model.type}</p>
          <p className="text-gray-600 mb-2">Task ID: {model.task_id}</p>
          {model.draft_model_id && (
            <p className="text-gray-600 mb-2">
              Draft Model ID: {model.draft_model_id}
            </p>
          )}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Controls:</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Click and drag to rotate the model</li>
              <li>Scroll to zoom in/out</li>
              <li>Use the slider to adjust model size</li>
              <li>Toggle auto-rotation with the button</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
