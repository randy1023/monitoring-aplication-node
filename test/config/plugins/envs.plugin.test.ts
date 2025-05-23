import { envs } from "../../../src/config/plugins/envs.plugin";
describe("Test on env.plugins.ts", () => {
  test("Should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: "gonzalezmanaurer@gmail.com",
      MAILER_SECRET_KEY: "ajlxdjdxwiopojhl",
      PROD: false,
      MONGO_URL: "mongodb://randydev:87654321@localhost:27018",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "randydev",
      MONGO_PASS: "87654321",
    });
  });
  test("Should return error if envs are not set", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";
    try {
      await import("../../../src/config/plugins/envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
