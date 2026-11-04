import { useRef, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";
import type { CatKey } from "@/pages/Categories/utils/categoryConfig";

const GOLD = "#C6A46A";
const WINE = "#812D3A";
const CAM_Z = 9;
const FOV = 35;
const WORLD_H = 2 * Math.tan((FOV * Math.PI) / 360) * CAM_Z;

const Gold = ({ rough = 0.24 }: { rough?: number }) => (
  <meshStandardMaterial color={GOLD} metalness={1} roughness={rough} envMapIntensity={1.4} />
);
const Soft = ({ color }: { color: string }) => (
  <meshPhysicalMaterial color={color} roughness={0.5} clearcoat={0.6} clearcoatRoughness={0.3} />
);

function Rig({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null);
  const size = useThree((s) => s.size);
  useFrame((state, dt) => {
    const grp = g.current;
    if (!grp) return;
    const { x, y } = state.pointer;
    const worldW = WORLD_H * (size.width / size.height);
    grp.position.x = worldW * 0.27;
    grp.scale.setScalar(0.8 * Math.min(1, worldW / 10.5));
    grp.rotation.y = THREE.MathUtils.damp(grp.rotation.y, x * 0.25, 3, dt);
    grp.rotation.x = THREE.MathUtils.damp(grp.rotation.x, -y * 0.12, 3, dt);
    const c = state.camera;
    c.position.z = THREE.MathUtils.damp(c.position.z, CAM_Z, 1.6, dt);
    c.position.x = THREE.MathUtils.damp(c.position.x, x * 0.4, 2.2, dt);
    c.position.y = THREE.MathUtils.damp(c.position.y, y * 0.25, 2.2, dt);
    c.lookAt(0, 0, 0);
  });
  return <group ref={g}>{children}</group>;
}

function Spin({ children, speed = 0.1, axis = "z" }: { children: ReactNode; speed?: number; axis?: "x" | "y" | "z" }) {
  const r = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (r.current) r.current.rotation[axis] += dt * speed; });
  return <group ref={r}>{children}</group>;
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => { onReady(); }, [onReady]);
  return null;
}

function Women() {
  return (
    <>
      <Spin speed={0.1}>
        <mesh rotation={[1.05, 0.15, 0]} position={[0, 0, -0.6]}><torusGeometry args={[2.6, 0.022, 24, 180]} /><Gold rough={0.2} /></mesh>
      </Spin>
      <Spin speed={-0.06}>
        <mesh rotation={[1.3, -0.35, 0.4]} position={[0, 0.1, -0.8]}><torusGeometry args={[3.2, 0.012, 16, 200]} /><Gold rough={0.3} /></mesh>
      </Spin>
      <Float speed={1.1} floatIntensity={0.8}><mesh position={[-1.3, 2.0, 0.6]}><sphereGeometry args={[0.46, 48, 48]} /><meshPhysicalMaterial color={WINE} roughness={0.14} clearcoat={1} clearcoatRoughness={0.08} envMapIntensity={1.3} /></mesh></Float>
      <Float speed={1.6} floatIntensity={1} rotationIntensity={1.2}><mesh position={[2.4, -1.9, 0.9]}><icosahedronGeometry args={[0.24, 0]} /><Gold /></mesh></Float>
      <Float speed={1.3} floatIntensity={0.9} rotationIntensity={1.4}><mesh position={[-2.4, -0.4, 0.8]}><octahedronGeometry args={[0.18, 0]} /><Gold rough={0.18} /></mesh></Float>
      <Float speed={1.2} floatIntensity={0.9}><mesh position={[0.6, -2.4, 1]}><torusKnotGeometry args={[0.17, 0.05, 128, 16]} /><Gold rough={0.2} /></mesh></Float>
      <Float speed={1.4} floatIntensity={1}><mesh position={[2.2, 1.7, 0.2]}><sphereGeometry args={[0.16, 32, 32]} /><meshPhysicalMaterial color="#F3E6D2" roughness={0.2} clearcoat={1} /></mesh></Float>
    </>
  );
}

function Men() {
  return (
    <>
      <Float speed={1} rotationIntensity={0.9} floatIntensity={0.6}><mesh position={[-0.6, 1.5, 0.3]} rotation={[0.5, 0.6, 0]}><boxGeometry args={[0.9, 0.9, 0.9]} /><Gold rough={0.3} /></mesh></Float>
      <Float speed={1.3} rotationIntensity={1.2} floatIntensity={0.8}><mesh position={[2.1, -1.4, 0.8]} rotation={[0.3, 0.2, 0.6]}><boxGeometry args={[0.55, 1.5, 0.55]} /><meshStandardMaterial color="#2a2a3d" metalness={0.9} roughness={0.22} envMapIntensity={1.3} /></mesh></Float>
      <Float speed={1.2} rotationIntensity={1.4} floatIntensity={0.9}><mesh position={[-2.1, -1.2, 0.6]}><octahedronGeometry args={[0.5, 0]} /><Gold rough={0.2} /></mesh></Float>
      <Spin speed={0.12} axis="y"><mesh position={[0.4, -0.2, -0.4]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.3, 0.03, 24, 6]} /><Gold rough={0.25} /></mesh></Spin>
      <Float speed={1.5} floatIntensity={1}><mesh position={[2.4, 1.8, 0.2]}><sphereGeometry args={[0.32, 48, 48]} /><meshPhysicalMaterial color={WINE} roughness={0.2} clearcoat={1} /></mesh></Float>
      <Float speed={1.1} floatIntensity={0.7} rotationIntensity={0.6}><mesh position={[-0.2, -2.3, 0.9]}><dodecahedronGeometry args={[0.28, 0]} /><Gold /></mesh></Float>
    </>
  );
}

function Kids() {
  return (
    <>
      <Float speed={1.2} floatIntensity={1.1}><mesh position={[-0.9, 1.7, 0.6]}><sphereGeometry args={[0.7, 48, 48]} /><Soft color="#F7D6C9" /></mesh></Float>
      <Float speed={1.5} floatIntensity={1} rotationIntensity={1}><mesh position={[2.3, -1.6, 0.8]}><torusGeometry args={[0.5, 0.2, 32, 64]} /><Soft color="#CDE8DD" /></mesh></Float>
      <Float speed={1.3} floatIntensity={1.2} rotationIntensity={0.8}><mesh position={[-2.2, -0.8, 0.7]}><coneGeometry args={[0.45, 0.9, 32]} /><Soft color="#DDD5F0" /></mesh></Float>
      <Float speed={1.7} floatIntensity={1}><mesh position={[2.1, 1.7, 0.4]}><sphereGeometry args={[0.38, 40, 40]} /><Soft color="#F6EBC0" /></mesh></Float>
      <Float speed={1.1} floatIntensity={1} rotationIntensity={1.4}><mesh position={[0.2, -2.3, 1]}><icosahedronGeometry args={[0.34, 0]} /><Soft color="#D3E6F5" /></mesh></Float>
      <Float speed={1.4} floatIntensity={0.8}><mesh position={[0.1, 0.1, -1]}><sphereGeometry args={[0.2, 32, 32]} /><Gold rough={0.3} /></mesh></Float>
    </>
  );
}

interface Props { variant: CatKey; active: boolean; sourceRef: RefObject<HTMLElement | null>; onReady: () => void }

export default function CategoryHeroScene({ variant, active, sourceRef, onReady }: Props) {
  const dark = variant !== "kids";
  return (
    <Canvas
      className="cat-hero-gl"
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, CAM_Z + 2.4], fov: FOV, near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      eventSource={sourceRef as RefObject<HTMLElement>}
      eventPrefix="client"
    >
      <ambientLight intensity={dark ? 0.35 : 0.9} color="#F3E6D2" />
      <directionalLight position={[4, 5, 6]} intensity={dark ? 2.1 : 1.6} color="#FFF3E0" />
      <pointLight position={[-4, 2, 4]} intensity={dark ? 80 : 30} color={GOLD} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[0, 5, -6]} scale={[12, 4, 1]} color="#F3E6D2" />
        <Lightformer form="rect" intensity={1.5} position={[-6, 1, 2]} scale={[3, 8, 1]} color={GOLD} />
        <Lightformer form="ring" intensity={1.3} position={[5, 0, 3]} scale={4} color="#E8D9C9" />
      </Environment>
      <Rig>
        {variant === "women" ? <Women /> : variant === "men" ? <Men /> : <Kids />}
      </Rig>
      {dark && <Sparkles count={45} scale={[11, 6.2, 4]} size={3} speed={0.22} opacity={0.7} color={variant === "men" ? GOLD : "#E8D9C9"} />}
      <Ready onReady={onReady} />
    </Canvas>
  );
}
