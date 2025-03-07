import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import './styles.css'
import { CAMERA_POSITIONS } from "./cameraPosition";

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{
          position: [CAMERA_POSITIONS[0].x, CAMERA_POSITIONS[0].y, CAMERA_POSITIONS[0].z],
          rotation: [CAMERA_POSITIONS[0].rotationX, CAMERA_POSITIONS[0].rotationY, CAMERA_POSITIONS[0].rotationZ],
          near: 0.1,
          far: 5000,
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Scene />
      </Canvas>
    </div>
  );
}
