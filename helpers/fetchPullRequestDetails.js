const fetch = require("node-fetch");
const URL =
  "https://api.github.com/repos/expressjs/express/pulls?state=open&per_page=3";
const options = {
  headers: { Authorization: "Bearer " + process.env.ACCESS_TOKEN },
};

async function fetchPullRequestDetails() {
  const fetchedPullRequests = await fetch(URL, options);
  const fetchPullRequestsJson = await fetchedPullRequests.json();
  return fetchCommitDetails(fetchPullRequestsJson);
}

async function fetchCommitDetails(fetchedPullRequests) {
  const promiseResult = await Promise.all(
    fetchedPullRequests.map(async (pullRequest) => {
      const fetchedCommits = await fetch(pullRequest.commits_url, options);
      const fetchedCommitsJson = await fetchedCommits.json();
      return {
        id: pullRequest.id,
        number: pullRequest.number,
        title: pullRequest.title,
        author: pullRequest.user.login,
        commit_count: fetchedCommitsJson.length,
      };
    })
  );
  return promiseResult;
}

module.exports = fetchPullRequestDetails;
