import { closeDatabase, connectDatabase } from "./src/loaders/database-config";

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await closeDatabase();
});
