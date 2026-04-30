import { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Html, Edges, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import githubIconUrl from "@assets/github.svg?url";
import reactIconUrl from "@assets/react.svg?url";
import dockerIconUrl from "@assets/docker.svg?url";
import nextjsIconUrl from "@assets/nextjs.svg?url";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { age } from "@/ts/calc";
import * as THREE from "three";

// ─── Particle Field ──────────────────────────────────────────────────────────

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.04;
      ref.current.rotation.y -= delta * 0.06;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#6c63ff"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// ─── Floating Torus ───────────────────────────────────────────────────────────

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[3.5, 0, -2]}>
      <torusGeometry args={[1, 0.35, 16, 60]} />
      <meshStandardMaterial
        color="#6c63ff"
        emissive="#3330aa"
        emissiveIntensity={0.6}
        wireframe
      />
    </mesh>
  );
}

// ─── Floating Icosahedron ─────────────────────────────────────────────────────

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.z = t * 0.4;
    meshRef.current.position.y = Math.cos(t * 0.4) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={[-3.5, 0.5, -1]}>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#005577"
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
}

// ─── Floating Icon Box ───────────────────────────────────────────────────────

interface IconBoxProps {
  position: [number, number, number];
  color: string;
  textureUrl: string;
  label: string;
  speed?: number;
  phase?: number;
  spinIcon?: boolean;
}

const BOX_SIZE  = 1.55;
const ICON_SIZE = BOX_SIZE * 0.65;  // icon plane: 65 % of face → comfortable margin

function FloatingIconBox({ position, color, textureUrl, label, speed = 1, phase = 0, spinIcon = false }: IconBoxProps) {
  const rotRef   = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const iconRef  = useRef<THREE.Mesh>(null!);
  const baseY    = position[1];
  const texture  = useTexture(textureUrl);

  useFrame((_, delta) => {
    const t = performance.now() / 1000 * speed + phase;
    if (rotRef.current) {
      rotRef.current.rotation.y = t * 0.38;
      rotRef.current.rotation.x = t * 0.22;
    }
    if (groupRef.current) {
      groupRef.current.position.y = baseY + Math.sin(t * 0.5) * 0.28;
    }
    if (spinIcon && iconRef.current) {
      iconRef.current.rotation.z += delta * 0.9;
    }
  });

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>

      {/* Soft glow sphere — static, does not rotate */}
      <mesh>
        <sphereGeometry args={[BOX_SIZE * 0.82, 10, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>

      {/* ── Rotating group: cube + raised slab ── */}
      <group ref={rotRef}>

        {/* Base cube — plain dark, no texture */}
        <mesh>
          <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
          <meshStandardMaterial
            color="#080c14"
            emissive={color}
            emissiveIntensity={0.08}
            roughness={0.45}
            metalness={0.35}
          />
          <Edges
            scale={1}
            threshold={15}
            color={color as unknown as THREE.ColorRepresentation}
            linewidth={5}
          />
        </mesh>

        {/* Icon plane — sits on +Z face, transparent bg → only logo silhouette visible */}
        <mesh ref={iconRef} position={[0, 0, BOX_SIZE / 2 + 0.015]}>
          <planeGeometry args={[ICON_SIZE, ICON_SIZE]} />
          <meshStandardMaterial
            map={texture}
            emissiveMap={texture}
            emissive={color}
            emissiveIntensity={4.0}
            transparent
            alphaTest={0.05}
            roughness={0.15}
            metalness={0.2}
            depthWrite={false}
          />
        </mesh>

      </group>

      {/* Neon label — camera-facing, below the cube */}
      <Html
        position={[0, -(BOX_SIZE / 2 + 0.38), 0]}
        center
        distanceFactor={4.5}
        zIndexRange={[0, 5]}
      >
        <span style={{
          pointerEvents: "none",
          userSelect: "none",
          color: color,
          fontSize: 11,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          textShadow: `0 0 8px ${color}, 0 0 18px ${color}`,
          whiteSpace: "nowrap",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>{label}</span>
      </Html>

    </group>
  );
}

// ─── 3D Scene ─────────────────────────────────────────────────────────────────

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#6c63ff" intensity={2} />
      <pointLight position={[-5, -5, 5]} color="#00d4ff" intensity={1.5} />
      <Suspense fallback={null}>
        <ParticleField />
        <FloatingTorus />
        <FloatingIcosahedron />
        {/* Tech icon boxes at the four corners */}
        <FloatingIconBox
          position={[-5.0, 2.8, -5]}
          color="#a8ff78"
          textureUrl={githubIconUrl}
          label="GitHub"
          speed={0.7}
          phase={0}
        />
        <FloatingIconBox
          position={[5.0, 2.8, -5]}
          color="#61dafb"
          textureUrl={reactIconUrl}
          label="React"
          speed={0.85}
          phase={1.3}
          spinIcon
        />
        <FloatingIconBox
          position={[5.0, -2.8, -5]}
          color="#e2e2e2"
          textureUrl={nextjsIconUrl}
          label="Next.js"
          speed={0.78}
          phase={2.6}
        />
        <FloatingIconBox
          position={[-5.0, -2.8, -5]}
          color="#00acf0"
          textureUrl={dockerIconUrl}
          label="Docker"
          speed={0.72}
          phase={3.9}
        />
      </Suspense>
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.35}
          luminanceSmoothing={0.6}
          intensity={1.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────

function Typewriter({ words }: { words: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = words[wordIndex];
      const displayed = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);

      if (ref.current) ref.current.textContent = displayed;

      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      let delay = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex === current.length + 1) {
        delay = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }

      timeout = setTimeout(tick, delay);
    };

    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, [words]);

  return (
    <span
      ref={ref}
      className="text-glow-cyan"
      style={{ color: "var(--color-accent-2)" }}
    />
  );
}

// ─── Scroll Arrow ─────────────────────────────────────────────────────────────

function ScrollArrow() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      onClick={() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(108,99,255,0.8)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </motion.div>
  );
}

// ─── Stat Chip ────────────────────────────────────────────────────────────────

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      className="glass border-glow px-4 py-2 rounded-full text-sm flex gap-2 items-center"
      whileHover={{ scale: 1.05, boxShadow: "var(--glow-accent)" }}
    >
      <span style={{ color: "var(--color-accent-2)" }} className="font-bold text-base">
        {value}
      </span>
      <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const { t } = useTranslation();

  const titles = [
    t("Full-Stack Developer · Consultant · Open-Source Befürworter").split(" · ")[0], // "Full-Stack Developer"
    t("Softwareentwickler"),
    "Dev-Ops Engineer",
    t("Consultant"),
    "React Enthusiast",
    "Open-Source Advocate",
  ];

  const jsYears = age(new Date("2018-05-31"));
  const myAge = age(new Date("2001-07-31"));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--color-base)" }}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
          <Scene />
        </Canvas>
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(8,8,16,0.3) 0%, rgba(8,8,16,0.85) 70%, rgba(8,8,16,1) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting tag */}
        <motion.div variants={itemVariants} className="mb-4">
          <span
            className="inline-block px-4 py-1 rounded-full text-sm font-medium border"
            style={{
              background: "rgba(108,99,255,0.1)",
              borderColor: "rgba(108,99,255,0.4)",
              color: "var(--color-accent)",
            }}
          >
            👋 Willkommen / Welcome
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-pacifico text-6xl sm:text-7xl md:text-8xl mb-2 leading-tight"
          style={{ color: "var(--color-text)" }}
        >
          Markus{" "}
          <span className="text-shimmer">Löffler</span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl mb-8 h-10 font-light"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Typewriter words={titles} />
          <span
            className="inline-block w-0.5 h-6 ml-1 align-middle animate-pulse"
            style={{ background: "var(--color-accent-2)" }}
          />
        </motion.div>

        {/* Quote */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg mb-10 italic"
          style={{ color: "var(--color-muted)" }}
        >
          ~A machine that turns coffee into code~
        </motion.p>

        {/* Stats chips */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          <StatChip value={`${myAge}`} label={t("Jahre alt")} />
          <StatChip value={`${jsYears}+`} label={t("Jahre JavaScript")} />
          <StatChip value="4+" label={t("Unternehmen")} />
          <StatChip value="Linux" label={t("Primäres OS")} />
          <StatChip value="まさに" label="日本語学習中" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-full font-semibold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
              boxShadow: "var(--glow-accent)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(108,99,255,0.7)" }}
            whileTap={{ scale: 0.97 }}
          >
            {t("Meinen Werdegang ansehen")} ↓
          </motion.button>

          <motion.button
            onClick={() =>
              window
                .open("https://github.com/MarkusLoeffler01/Portfolio", "_blank")
                ?.focus()
            }
            className="px-8 py-3 rounded-full font-semibold border transition-all"
            style={{
              borderColor: "rgba(108,99,255,0.5)",
              color: "var(--color-text)",
              background: "rgba(108,99,255,0.08)",
            }}
            whileHover={{
              scale: 1.05,
              borderColor: "var(--color-accent)",
              background: "rgba(108,99,255,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            GitHub →
          </motion.button>
        </motion.div>
      </motion.div>

      <ScrollArrow />
    </section>
  );
};

export default Hero;
