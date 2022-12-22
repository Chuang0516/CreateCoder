import MockRequests from '@/utils/mockRequest'

export const reqHomeInfo = () =>
  MockRequests({ url: '/homenav', method: 'get' })
