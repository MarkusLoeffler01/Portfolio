import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    // Merge R3F JSX elements into React's JSX namespace without replacing
    // the built-in HTML/SVG intrinsic elements from React 19.
    interface IntrinsicElements extends ThreeElements {}
  }
}

