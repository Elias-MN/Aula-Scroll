import { useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { CAMERA_POSITIONS } from "./CameraPosition";
import { useLoader } from "@react-three/fiber";

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
    const handleWheel = (event) => {
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

    // Variables para el desplazamiento táctil
    let isTouching = false;
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e) => {
      touchStart = e.touches[0].clientY;
      isTouching = true;
    };

    const handleTouchMove = (e) => {
      if (isTouching) {
        touchEnd = e.touches[0].clientY;
        const delta = touchStart - touchEnd;
        if (delta > 0) {
          currentPositionIndex.current = Math.min(
            currentPositionIndex.current + 1,
            CAMERA_POSITIONS.length - 1
          );
        } else if (delta < 0) {
          currentPositionIndex.current = Math.max(
            currentPositionIndex.current - 1,
            0
          );
        }
        moveCamera(CAMERA_POSITIONS[currentPositionIndex.current]);
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    // Agregar los event listeners para el scroll con mouse y toque táctil
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
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
