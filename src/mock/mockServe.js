import Mock from 'mockjs'

import homeNavList from './home_nav.json'
import homeBanner from './home_banner.json'

Mock.mock('/mock/homenav', { code: 200, data: homeNavList })
Mock.mock('/mock/homebanner', { code: 200, data: homeBanner })
