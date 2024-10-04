/// <reference types="vitest" />

import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'
import viteConfig from "./vite.config";

export default mergeConfig(viteConfig, defineConfig({
    test: {
        environment: "jsdom",
        globals: true,
        coverage: {
            include: ["src/**"],
            enabled: true,
            reporter: ["text", "json", "html"],
            provider: "v8",
            exclude: [...(configDefaults.coverage.exclude ?? []), "src/pages/datenschutzerklärung", "src/pages/impressum", "src/interfaces"]
        },
        include: ["./src/**/__tests__/*.test.{ts,tsx}"],
        exclude: [...configDefaults.exclude, "node_modules", "coverage", "src/interfaces", "src/pages/datenschutzerklärung", "src/components/banners/containers"],
        setupFiles: ["./src/__tests__/setup.ts"],
    }
}));