const fetch = require("node-fetch");

async function fetchPullRequestDetails() {
  const fetchPullRequests = await fetch(
    "https://api.github.com/repos/expressjs/express/pulls?state=open&per_page=3"
  ).then((res) => res.json());

  const result = await Promise.all(
    fetchPullRequests.map((pullRequest) => {
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
  return result;
}

module.exports = fetchPullRequestDetails;
