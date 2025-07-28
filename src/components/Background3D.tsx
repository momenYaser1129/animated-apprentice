import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const AnimatedSphere = ({ position, color, speed }: { 
  position: [number, number, number]
  color: string
  speed: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
        transparent
        opacity={0.6}
      />
    </Sphere>
  )
}

export const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <AnimatedSphere 
          position={[-4, 2, -5]} 
          color="#8b5cf6" 
          speed={0.3} 
        />
        <AnimatedSphere 
          position={[4, -2, -8]} 
          color="#06b6d4" 
          speed={0.2} 
        />
        <AnimatedSphere 
          position={[0, 0, -10]} 
          color="#ec4899" 
          speed={0.1} 
        />
      </Canvas>
    </div>
  )
}