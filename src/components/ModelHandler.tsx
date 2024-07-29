import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import { TransformDisplay } from "../components/TransformDisplay";
import { useModelViewStore } from "../store/modelStore";

export const ModelHandler: React.FC = () => {
  const {
    scale,
    setScale,
    autoRotate,
    toggleAutoRotate,
    setSelectedTexture,
    exportModel,
    tilt,
    setTilt,
    mirror,
    toggleMirror,
    resetTransforms,
  } = useModelViewStore();

  return (
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
            value={[tilt.x]}
            onValueChange={([value]) => setTilt(value, tilt.y, tilt.z)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tilt Y</label>
          <Slider
            min={-180}
            max={180}
            step={1}
            value={[tilt.y]}
            onValueChange={([value]) => setTilt(tilt.x, value, tilt.z)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tilt Z</label>
          <Slider
            min={-180}
            max={180}
            step={1}
            value={[tilt.z]}
            onValueChange={([value]) => setTilt(tilt.x, tilt.y, value)}
          />
        </div>
        <div className="flex space-x-4">
          {(["x", "y", "z"] as const).map((axis) => (
            <Button
              key={axis}
              onClick={() => toggleMirror(axis)}
              variant={mirror[axis] ? "default" : "outline"}
            >
              Mirror {axis.toUpperCase()}
            </Button>
          ))}
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
  );
};
