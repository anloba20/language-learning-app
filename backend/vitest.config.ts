import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: 'test-only-secret-with-at-least-32-characters',
      DB_HOST: 'localhost',
      DB_USER: 'test_user',
      DB_PASSWORD: 'test_password',
      DB_NAME: 'test_language_app',
    },
  },
});