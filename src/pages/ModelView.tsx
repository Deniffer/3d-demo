import React, { Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useAppStore } from "../store/appStore";
import { useModelViewStore } from "../store/modelStore";

import { Alert, AlertDescription } from "../components/ui/alert";

import Model, { LoadingPlaceholder } from "../components/SingleModel";
import { ModelHandler } from "../components/ModelHandler";

export const ModelView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const models = useAppStore((state) => state.models);
  const model = models.find((m) => m.id === Number(id));
  const autoRotate = useModelViewStore((state) => state.autoRotate);
  // const isDragging = useModelViewStore((state) => state.isDragging);

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
              <OrbitControls autoRotate={autoRotate} />
            </Canvas>
          </div>
        </div>
        <ModelHandler />
      </div>
    </div>
  );
};
