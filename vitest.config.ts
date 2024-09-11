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
            provider: "v8"

        },
        include: ["./src/**/__tests__/*.test.{ts,tsx}"],
        exclude: [...configDefaults.exclude, "node_modules"],
        setupFiles: ["./src/__tests__/setup.ts"],
    }
}));