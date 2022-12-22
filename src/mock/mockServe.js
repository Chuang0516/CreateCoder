import Mock from 'mockjs'

import homeNavList from './home_nav.json'

Mock.mock('/mock/homenav', { code: 200, data: homeNavList })
