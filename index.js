const express = require("express");
const app = express();
const PORT = 4000;

//  Request to Api functionality
const fetchPullRequestDetails = require("./helpers/fetchPullRequestDetails");

app.get("/", async (req, res) => {
  try {
    const fetchedPullRequests = await fetchPullRequestDetails();
    res.status(200).send(fetchedPullRequests);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
}

module.exports = app;
