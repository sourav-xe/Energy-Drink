import React, { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const CanModel = ({ modelPath, scale = 1, position = [0, 0, 0], rotationSpeed = 0 }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  // Cache cloned model so it doesn't reload on every render
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame(() => {
    if (modelRef.current && rotationSpeed > 0) {
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  return <primitive ref={modelRef} object={clonedScene} scale={scale} position={position} />;
};

// ✅ Preload all models for faster switching
[
  "/model/red_bull_energy_drink_can.glb",
  "/model/monster_energy_drink.glb",
  "/model/monster_can/scene.gltf",
  "/model/orange.glb",
  "/model/pink.glb",
  "/model/lit.glb"
].forEach(useGLTF.preload);

export default function CanModelWithSuspense(props) {
  return (
    <Suspense
      fallback={
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      }
    >
      <CanModel {...props} />
    </Suspense>
  );
}
