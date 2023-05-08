import axios from 'axios'

const gitToken = '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'

// 创建axios实例
const GitHubClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    Authorization: `token${gitToken}`,
  },
})

// 请求拦截器
GitHubClient.interceptors.request.use((config) => {
  return config
})

// 响应拦截器
GitHubClient.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    return Promise.reject(new Error('响应github数据失败'))
  }
)

export default GitHubClient
