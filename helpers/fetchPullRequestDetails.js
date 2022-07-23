const fetch = require("node-fetch");
const URL =
  "https://api.github.com/repos/expressjs/express/pulls?state=open&per_page=3";

async function fetchPullRequestDetails() {
  return await fetch(URL)
    .then((pullRequest) => pullRequest.json())
    .then((pullRequest) => {
      return fetchCommitDetails(pullRequest);
    })
    .catch((error) => {
      return new Error(error);
    });
}

async function fetchCommitDetails(fetchedPullRequests) {
  return await Promise.all(
    fetchedPullRequests.map((pullRequest) => {
      return fetch(pullRequest.commits_url)
        .then((commits) => commits.json())
        .then((commits) => {
          return {
            id: pullRequest.id,
            number: pullRequest.number,
            title: pullRequest.title,
            author: pullRequest.user.login,
            commit_count: commits.length,
          };
        })
        .catch((error) => {
          return new Error(error);
        });
    })
  );
}

module.exports = fetchPullRequestDetails;
