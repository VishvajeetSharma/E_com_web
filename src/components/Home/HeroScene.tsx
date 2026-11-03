import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Image as DreiImage, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import SafeBoundary from "./SafeBoundary";

const GOLD = "#C6A46A";
const WINE = "#812D3A";
const BURGUNDY = "#4A101C";
const CAM_Z = 9;
const FOV = 35;
// World height visible at z = 0 when the camera sits at CAM_Z.
const WORLD_H = 2 * Math.tan((FOV * Math.PI) / 360) * CAM_Z;

const Gold = ({ rough = 0.24 }: { rough?: number }) => (
  <meshStandardMaterial color={GOLD} metalness={1} roughness={rough} envMapIntensity={1.5} />
);

function FramedImage({
  url, position, size, rotation = [0, 0, 0], speed = 1,
}: {
  url: string;
  position: [number, number, number];
  size: [number, number];
  rotation?: [number, number, number];
  speed?: number;
}) {
  const [w, h] = size;
  const placeholder = (
    <mesh>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial color={BURGUNDY} roughness={0.6} />
    </mesh>
  );
  return (
    <Float speed={speed} rotationIntensity={0.18} floatIntensity={0.55} floatingRange={[-0.08, 0.08]}>
      <group position={position} rotation={rotation}>
        <mesh position={[0, 0, -0.07]}>
          <boxGeometry args={[w + 0.16, h + 0.16, 0.08]} />
          <Gold rough={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[w + 0.04, h + 0.04]} />
          <meshBasicMaterial color="#151522" />
        </mesh>
        {/* A failed texture degrades to a burgundy plane instead of taking the scene down. */}
        <SafeBoundary fallback={placeholder}>
          <DreiImage url={url} scale={[w, h]} toneMapped={false} />
        </SafeBoundary>
      </group>
    </Float>
  );
}

function SoftShadow({ position, size }: { position: [number, number, number]; size: number }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, "rgba(0,0,0,0.6)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} scale={[size, size * 0.38, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} />
    </mesh>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.1;
    if (b.current) b.current.rotation.z -= dt * 0.06;
  });
  return (
    <>
      <mesh ref={a} rotation={[1.05, 0.15, 0]} position={[0, 0, -0.5]}>
        <torusGeometry args={[2.45, 0.022, 24, 180]} />
        <Gold rough={0.2} />
      </mesh>
      <mesh ref={b} rotation={[1.3, -0.35, 0.4]} position={[0, 0.1, -0.7]}>
        <torusGeometry args={[3.05, 0.012, 16, 200]} />
        <Gold rough={0.3} />
      </mesh>
    </>
  );
}

/** Group that follows the pointer and lays the composition out on the right half of the viewport. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const size = useThree((s) => s.size);
  useFrame((state, dt) => {
    const camera = state.camera;
    const g = group.current;
    if (!g) return;
    const { x, y } = state.pointer;
    const worldW = WORLD_H * (size.width / size.height);
    const s = 0.78 * Math.min(1, worldW / 10.5);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x || 0.9, s, 3, dt));
    g.position.x = worldW * 0.27;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.22, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -y * 0.1, 3, dt);
    // Camera dolly-in on load, then a gentle pointer-led drift.
    camera.position.z = THREE.MathUtils.damp(camera.position.z, CAM_Z, 1.6, dt);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, x * 0.45, 2.2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y * 0.25, 2.2, dt);
    camera.lookAt(0, 0, 0);
  });
  return <group ref={group}>{children}</group>;
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => { onReady(); }, [onReady]);
  return null;
}

interface Props {
  images: string[];
  active: boolean;
  sourceRef: RefObject<HTMLElement | null>;
  onReady: () => void;
}

export default function HeroScene({ images, active, sourceRef, onReady }: Props) {
  return (
    <Canvas
      className="dd-hero-gl"
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, CAM_Z + 2.4], fov: FOV, near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      eventSource={sourceRef as RefObject<HTMLElement>}
      eventPrefix="client"
    >
      {/* Champagne-gold lighting */}
      <ambientLight intensity={0.35} color="#E8D9C9" />
      <directionalLight position={[4, 5, 6]} intensity={2.1} color="#F3E6D2" />
      <pointLight position={[-4, 2, 4]} intensity={90} color={GOLD} />
      <pointLight position={[4, -3, -2]} intensity={50} color={WINE} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 5, -6]} scale={[12, 4, 1]} color="#F3E6D2" />
        <Lightformer form="rect" intensity={1.6} position={[-6, 1, 2]} scale={[3, 8, 1]} color={GOLD} />
        <Lightformer form="ring" intensity={1.4} position={[5, 0, 3]} scale={4} color="#E8D9C9" />
        <Lightformer form="rect" intensity={1.2} position={[0, -4, 2]} scale={[10, 2, 1]} color={WINE} />
      </Environment>

      <Rig>
        <Suspense fallback={null}>
          {images[0] && <FramedImage url={images[0]} position={[0, 0, 0]} size={[2.5, 3.35]} speed={1} />}
          {images[1] && <FramedImage url={images[1]} position={[-1.85, -1.05, 0.9]} size={[1.3, 1.75]} rotation={[0, 0.22, 0.03]} speed={1.4} />}
          {images[2] && <FramedImage url={images[2]} position={[1.75, 1.15, 0.6]} size={[1.15, 1.55]} rotation={[0, -0.22, -0.03]} speed={1.2} />}
          <ReadySignal onReady={onReady} />
        </Suspense>

        <Rings />

        {/* Procedural burgundy + gold geometry */}
        <Float speed={1.1} floatIntensity={0.8} rotationIntensity={0.4}>
          <mesh position={[-1.5, 2.05, -0.7]}>
            <sphereGeometry args={[0.5, 64, 64]} />
            <meshPhysicalMaterial color={WINE} roughness={0.14} metalness={0.15} clearcoat={1} clearcoatRoughness={0.08} envMapIntensity={1.3} />
          </mesh>
        </Float>
        <Float speed={1.6} floatIntensity={1} rotationIntensity={1.2}>
          <mesh position={[2.35, -2.0, 0.9]}>
            <icosahedronGeometry args={[0.24, 0]} />
            <Gold />
          </mesh>
        </Float>
        <Float speed={1.3} floatIntensity={0.9} rotationIntensity={1.4}>
          <mesh position={[-2.3, 0.55, 0.5]}>
            <octahedronGeometry args={[0.17, 0]} />
            <Gold rough={0.18} />
          </mesh>
        </Float>
        <Float speed={1.2} floatIntensity={0.9} rotationIntensity={0.8}>
          <mesh position={[0.5, -2.45, 1.1]}>
            <torusKnotGeometry args={[0.17, 0.05, 128, 16]} />
            <Gold rough={0.2} />
          </mesh>
        </Float>

        <SoftShadow position={[0, -2.55, 0]} size={4.2} />
      </Rig>

      {/* Drifting champagne + gold dust */}
      <Sparkles count={55} scale={[11, 6.2, 4]} size={3.2} speed={0.25} opacity={0.7} color="#E8D9C9" />
      <Sparkles count={30} scale={[11, 6.2, 4]} size={5.5} speed={0.18} opacity={0.85} color={GOLD} />
    </Canvas>
  );
}
