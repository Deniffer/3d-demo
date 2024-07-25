// src/pages/ModelView.tsx
import React, { Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useAppStore } from "../store/appStore";

const Model: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);

  return <primitive object={scene} />;
};

const LoadingPlaceholder: React.FC = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export const ModelView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const models = useAppStore((state) => state.models);
  const model = models.find((m) => m.id === Number(id));

  if (!model) {
    return <div className="text-center py-10 text-xl">Model not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
        &larr; Back to list
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-[400px]">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Suspense fallback={<LoadingPlaceholder />}>
                <Model url={model.glb_url} />
              </Suspense>
              <OrbitControls />
            </Canvas>
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
        </div>
      </div>
    </div>
  );
};
