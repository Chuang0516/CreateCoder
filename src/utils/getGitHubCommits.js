import utctobeijing from './utc_to_beijing'
import GitHubClient from './githubClient'

export default function getGitHubCommits() {
  let dateList = []
  let repoName = []
  return new Promise((resolve, reject) => {
    GitHubClient.get('/users/Chuang0516/repos', {
      nprogress: true,
    })
      .then((data) => {
        data.forEach((item) => {
          repoName.push(item.name)
        })
      })
      .then(async () => {
        for (let i = 0; i < repoName.length; i++) {
          await GitHubClient.get(`/repos/Chuang0516/${repoName[i]}/commits`, {
            nprogress: false,
          })
            .then((data) => {
              data.forEach((item) => {
                let date = utctobeijing(item.commit.committer.date)
                dateList.push(date.substring(0, date.indexOf(' ')))
              })
              // dateList.push(res.data)
            })
            .catch((err) => {
              reject(err)
            })
          if (i >= repoName.length - 1) {
            resolve(dateList)
          }
        }
      })
  })
}
