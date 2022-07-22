const fetchPullRequestDetails = require("../helpers/fetchPullRequestDetails");

describe("test fetchPullRequestDetails functionality", () => {
  it("should return an array of three objects", async () => {
    const result = await fetchPullRequestDetails();
    expect(result.length).toBe(3);
  });

  it("should respond with correct object keys", async () => {
    const result = await fetchPullRequestDetails();
    result.map((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("number");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("author");
      expect(item).toHaveProperty("commit_count");
    });
  });
});
