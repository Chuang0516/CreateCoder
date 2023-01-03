import utctobeijing from './utc_to_beijing'
import axios from 'axios'

export default function getGitHubCommits() {
  let dateList = []
  let repoName = []
  let gitToken = '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'
  return new Promise((resolve, reject) => {
    axios
      .get('https://api.github.com/users/Chuang0516/repos', {
        headers: {
          Authorization: `token${gitToken}`,
        },
      })
      .then((res) => {
        res.data.forEach((item) => {
          repoName.push(item.name)
        })
      })
      .then(async () => {
        for (let i = 0; i < repoName.length; i++) {
          await axios
            .get(
              `https://api.github.com/repos/Chuang0516/${repoName[i]}/commits`,
              {
                headers: {
                  Authorization: `token${gitToken}`,
                },
              }
            )
            .then((res) => {
              res.data.forEach((item) => {
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
