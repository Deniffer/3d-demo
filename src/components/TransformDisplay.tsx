import React from "react";
import * as THREE from "three";
import { useModelViewStore } from "../store/modelStore";

const formatNumber = (num: number) => num.toFixed(2);
const radToDeg = (rad: number) => THREE.MathUtils.radToDeg(rad);

const TransformParameter: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <p>
    {label}: {formatNumber(value)}
  </p>
);

const Vector3Display: React.FC<{
  label: string;
  vector: THREE.Vector3 | THREE.Euler;
  convert?: (val: number) => number;
}> = ({ label, vector, convert = (val) => val }) => (
  <div>
    <p>{label}:</p>
    <TransformParameter label="X" value={convert(vector.x)} />
    <TransformParameter label="Y" value={convert(vector.y)} />
    <TransformParameter label="Z" value={convert(vector.z)} />
  </div>
);

export const TransformDisplay: React.FC = () => {
  const { position, rotation, scale } = useModelViewStore();

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <h3 className="text-lg font-semibold mb-2">Transform Parameters</h3>
      <div className="grid grid-cols-2 gap-2">
        <Vector3Display label="Position" vector={position} />
        <Vector3Display
          label="Rotation (deg)"
          vector={rotation}
          convert={radToDeg}
        />
        <div className="col-span-2">
          <TransformParameter label="Scale" value={scale} />
        </div>
      </div>
    </div>
  );
};
