import { defineConfig } from '@prisma/config';

const url = process.env.DATABASE_URL || 'postgres://schaf:schafpass@localhost:5432/schlafschaf';

export default defineConfig({
  datasource: {
    provider: 'postgresql',
    url,
  },
});
