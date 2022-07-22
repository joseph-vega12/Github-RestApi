const request = require("supertest");
const app = require("../index");

const fetchPullRequestsEndpoint = async () => {
  return await request(app).get("/");
};

describe("GET /", () => {
  it("should respond with status code of 200", async () => {
    const result = await fetchPullRequestsEndpoint();
    expect(result.status).toBe(200);
  });

  it("should recieve an array of three objects", async () => {
    const result = await fetchPullRequestsEndpoint();
    expect(result.body.length).toBe(3);
  });

  it("should respond with json", async () => {
    const result = await fetchPullRequestsEndpoint();
    expect(result.headers["content-type"]).toContain("application/json");
  });
});
