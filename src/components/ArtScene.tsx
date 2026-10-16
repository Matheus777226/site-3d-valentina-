import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// A twisted silk strip with real thickness through lighting and double-sided normals.
function ribbonGeometry(segments: number) {
  const vertices: number[] = [], indices: number[] = [];
  const across = 8;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments * Math.PI * 2.6;
    const radius = 1.03 + Math.sin(t * .8) * .23;
    for (let j = 0; j <= across; j++) {
      const w = (j / across - .5) * .67;
      const twist = t * 1.4;
      vertices.push(Math.cos(t) * (radius + w * Math.cos(twist)), Math.sin(t) * (radius + w * Math.cos(twist)) * .85, (t - Math.PI * 1.3) * .11 + w * Math.sin(twist));
      if (i < segments && j < across) { const a = i * (across + 1) + j, b = a + across + 1; indices.push(a, b, a + 1, b, b + 1, a + 1); }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return geometry;
}
function Sculpture({ mobile, reduced, section, variant }: { mobile: boolean; reduced: boolean; section: HTMLElement | null; variant: 'hero' | 'bridge' }) {
  const group = useRef<THREE.Group>(null);
  const ribbon = useRef<THREE.Mesh>(null);
  const satellite = useRef<THREE.Mesh>(null);
  const progress = useRef(0);
  const mouse = useRef(new THREE.Vector2());
  const { viewport } = useThree();
  const geometry = useMemo(() => ribbonGeometry(mobile ? 64 : 140), [mobile]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => {
    const update = () => { if (section) { const rect = section.getBoundingClientRect(); progress.current = THREE.MathUtils.clamp((innerHeight - rect.top) / (innerHeight + rect.height), 0, 1); } };
    const pointer = (event: PointerEvent) => { if (!mobile && !reduced) mouse.current.set(event.clientX / innerWidth * 2 - 1, -(event.clientY / innerHeight * 2 - 1)); };
    window.addEventListener('pointermove', pointer, { passive: true });
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    return () => { window.removeEventListener('pointermove', pointer); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [section, mobile, reduced]);
  useFrame(({ clock }, delta) => {
    if (!group.current || reduced) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (progress.current - .35) * 1.25 + (mobile ? 0 : mouse.current.x * .16), 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, mobile ? .08 : -mouse.current.y * .09, 3, delta);
    if (ribbon.current) { ribbon.current.rotation.z = t * .045 + progress.current * .6; ribbon.current.position.y = Math.sin(t * .65) * .12; }
    if (satellite.current) { satellite.current.rotation.y = t * .12; satellite.current.position.y = .95 + Math.sin(t * .5) * .15; }
  });
  const scale = Math.min(variant === 'hero' ? 1.15 : 1.4, viewport.width / (variant === 'hero' ? 7.5 : 4));
  return <group ref={group} scale={scale}>
    <mesh ref={ribbon} geometry={geometry} position={variant === 'hero' ? [2.3, -.25, .3] : [.15, 0, .2]} rotation={[.5, -.3, -.4]} scale={variant === 'hero' ? .9 : 1.5}>
      <meshPhysicalMaterial color="#e96db7" roughness={mobile ? .36 : .22} metalness={.58} clearcoat={mobile ? 0 : .8} side={THREE.DoubleSide} />
    </mesh>
    <mesh ref={satellite} position={[-2.1, .95, -.5]} rotation={[.6, .4, .2]} scale={variant === 'hero' ? .5 : .38}>
      <torusKnotGeometry args={[.72, .17, mobile ? 48 : 96, mobile ? 8 : 16, 2, 3]} />
      <meshStandardMaterial color="#fff" metalness={.78} roughness={.2} />
    </mesh>
    {!mobile && <mesh position={[2.8, 1.15, -1]} rotation={[.6, -.6, 0]}><torusGeometry args={[.27, .045, 10, 48]} /><meshStandardMaterial color="#f8d8ea" metalness={.7} roughness={.25} /></mesh>}
  </group>;
}
export default function ArtScene({ variant = 'hero', reduced = false }: { variant?: 'hero' | 'bridge'; reduced?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [section, setSection] = useState<HTMLElement | null>(null);
  const [dpr, setDpr] = useState(1.5);
  const mobile = matchMedia('(max-width: 767px)').matches;
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    setSection(node.closest('section'));
    let intersecting = true;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); }, { rootMargin: '80px' });
    observer.observe(node); document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  return <div className="art-webgl" ref={root} aria-hidden="true"><Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={mobile ? 1 : dpr} frameloop={!visible ? 'never' : reduced ? 'demand' : 'always'} gl={{ alpha: true, antialias: !mobile, powerPreference: 'low-power' }} onCreated={({ gl }) => { gl.domElement.dataset.webgl = 'ready'; }}>
    <ambientLight intensity={1.6} /><directionalLight position={[3, 4, 5]} intensity={2.8} /><pointLight position={[-4, -2, 3]} intensity={12} color="#e96db7" />
    {!mobile && <Environment resolution={128} frames={1}><Lightformer position={[0, 4, 3]} scale={[7, 2, 1]} intensity={3} color="#fff" /><Lightformer position={[-4, 0, 2]} rotation={[0, Math.PI / 3, 0]} scale={[2, 7, 1]} intensity={2} color="#f8d8ea" /></Environment>}
    <PerformanceMonitor onDecline={() => setDpr(1)}><Sculpture mobile={mobile} reduced={reduced} section={section} variant={variant} /></PerformanceMonitor>
  </Canvas></div>;
}
