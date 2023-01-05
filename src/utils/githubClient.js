import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

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
  // 进度条开始动
  nprogress.start()
  return config
})

// 响应拦截器
GitHubClient.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done()
    return res.data
  },
  (error) => {
    return Promise.reject(new Error('响应github数据失败'))
  }
)

export default GitHubClient
