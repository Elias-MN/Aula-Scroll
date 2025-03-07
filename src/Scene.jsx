import { useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { gsap } from "gsap";
import { CAMERA_POSITIONS } from "./CameraPosition";

function CameraController() {
  const { camera } = useThree();
  const currentPositionIndex = useRef(0);

  function moveCamera(target) {
    gsap.to(camera.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 1,
      ease: "power2.inOut",
    });
    gsap.to(camera.rotation, {
      x: target.rotationX,
      y: target.rotationY,
      z: target.rotationZ,
      duration: 1,
      ease: "power2.inOut",
    });
  }

  useEffect(() => {
    const handleScroll = (event) => {
      if (event.deltaY > 0) {
        currentPositionIndex.current = Math.min(
          currentPositionIndex.current + 1,
          CAMERA_POSITIONS.length - 1
        );
      } else {
        currentPositionIndex.current = Math.max(
          currentPositionIndex.current - 1,
          0
        );
      }
      moveCamera(CAMERA_POSITIONS[currentPositionIndex.current]);
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return null; // No renderiza nada, solo maneja la cámara
}

export function Scene() {
  const fbx = useLoader(FBXLoader, "./Aula.fbx");

  return (
    <>
      <primitive object={fbx} />
      <CameraController />
    </>
  );
}
