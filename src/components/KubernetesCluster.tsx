"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

interface NodeProps {
  position: [number, number, number];
  name: string;
  role: string;
  color: string;
  onClick: () => void;
}

function K8sNode({ position, name, role, color, onClick }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.12;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => {
          setHovered(true);
          if (typeof window !== "undefined") document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          if (typeof window !== "undefined") document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[hovered ? 0.35 : 0.28, 32, 32]} />
        <meshBasicMaterial color={hovered ? "#2997ff" : color} wireframe />
      </mesh>
      
      <Html distanceFactor={8} position={[0, 0.55, 0]} center>
        <div className={`px-2 py-1 rounded bg-[#0f0f15]/90 border text-center whitespace-nowrap transition-all select-none pointer-events-none ${
          hovered ? "border-[#2997ff] text-[#2997ff] scale-105" : "border-[#272729] text-gray-400"
        }`}>
          <div className="text-[10px] font-mono leading-none font-bold uppercase">{name}</div>
          <div className="text-[8px] text-gray-500 font-mono mt-0.5 leading-none">{role}</div>
        </div>
      </Html>
    </group>
  );
}

function ConnectionLines({ nodes }: { nodes: [number, number, number][] }) {
  const lineRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <group ref={lineRef}>
      {nodes.map((pos, idx) => (
        <Line
          key={idx}
          points={[[0, 0, 0], pos]}
          color="#272729"
          lineWidth={1.5}
          opacity={0.4}
          transparent
        />
      ))}
    </group>
  );
}

export default function KubernetesCluster({ onNodeSelect }: { onNodeSelect: (nodeName: string) => void }) {
  const nodes: { position: [number, number, number]; name: string; role: string; color: string }[] = [
    { position: [2.3, 0.4, 0], name: "deloitte-prod", role: "Work Env", color: "#6c63ff" },
    { position: [-2.1, 0.8, 1.5], name: "atos-prod", role: "Work Env", color: "#0066cc" },
    { position: [-1.4, -0.8, -1.8], name: "capgemini-prod", role: "Work Env", color: "#0066cc" },
    { position: [1.2, -1.3, 2.0], name: "aws-certs", role: "Credentials", color: "#ff7a4c" },
    { position: [-0.5, 1.5, -2.0], name: "education-node", role: "Academic", color: "#10b981" },
  ];

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-black rounded-lg border border-[#272729] overflow-hidden relative shadow-2xl">
      <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-gray-500 flex flex-col gap-0.5">
        <span>CLUSTER: control-plane-us-east</span>
        <span>STATUS: Running</span>
        <span>NODES: 5 Active</span>
      </div>

      <Canvas camera={{ position: [0, 0, 5.5], fof: 60 } as any}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Core Control Plane Node */}
        <group>
          <Sphere args={[0.45, 32, 32]}>
            <meshBasicMaterial color="#0066cc" wireframe />
          </Sphere>
          <Html distanceFactor={8} position={[0, 0.8, 0]} center>
            <div className="px-2 py-1 rounded bg-[#0f0f15]/95 border border-[#0066cc] text-center whitespace-nowrap select-none pointer-events-none">
              <div className="text-[10px] font-mono text-[#2997ff] font-bold">API SERVER</div>
              <div className="text-[8px] text-gray-400 font-mono mt-0.5">kube-control-plane</div>
            </div>
          </Html>
        </group>

        {/* Orbiting Satellite Nodes */}
        {nodes.map((node, index) => (
          <K8sNode
            key={index}
            position={node.position}
            name={node.name}
            role={node.role}
            color={node.color}
            onClick={() => onNodeSelect(node.name)}
          />
        ))}

        {/* Dynamic Connected Lines */}
        <ConnectionLines nodes={nodes.map((n) => n.position)} />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>

      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-gray-600">
        Drag to orbit · Click nodes for details
      </div>
    </div>
  );
}
