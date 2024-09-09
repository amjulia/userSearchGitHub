import type { Config } from "jest";

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
};

export default config;