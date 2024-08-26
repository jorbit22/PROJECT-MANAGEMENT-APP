import type { Config } from "@jest/types";

// Define Jest configuration
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"], // Use setupFilesAfterEnv instead of setupFiles
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
