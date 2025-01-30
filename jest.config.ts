import type { Config } from "jest";

import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",

  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/app/_components/$1",
    "^@/actions$": "<rootDir>/app/_actions",
    "^@/api$": "<rootDir>/app/_api",
    "^@/types$": "<rootDir>/app/_types",
    "^@/libs$": "<rootDir>/app/_libs",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testEnvironment: "jsdom",
};

export default createJestConfig(config);
