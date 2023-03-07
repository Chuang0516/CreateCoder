import MockRequests from '@/utils/mockRequest'

export const reqHomeInfo = () =>
  MockRequests({ url: '/homenav', method: 'get' })

export const reqHomeBanner = () =>
  MockRequests({ url: '/homebanner', method: 'get' })
