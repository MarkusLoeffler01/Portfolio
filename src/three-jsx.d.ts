import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace JSX {
    // Merges Three.js element types (mesh, torusGeometry, ambientLight, etc.)
    // into the global JSX.IntrinsicElements so R3F JSX is valid in all .tsx files.
    interface IntrinsicElements extends ThreeElements {}
  }
}


