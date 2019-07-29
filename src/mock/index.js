import Mock from 'mockjs'
import MyPoints from './my-points'
import LuckyDraw from './draw'
import MaintenancePlan from './maintenance-plan'
import order from './order'

if (process.env.NODE_ENV === 'development') {
  Mock.mock(/\/user\/user\/points\/month\/count/, 'post', MyPoints.getMyPointsSummary)
  Mock.mock(/\/user\/user\/points\/month\/list/, 'post', MyPoints.getMyPoints)
  Mock.mock(/\/user\/jackpot\/draw/, 'post', LuckyDraw.drawing)
  Mock.mock(/\/user\/user2prize\/page/, 'post', LuckyDraw.drawRecordPage)
  Mock.mock(/\/user\/ticket\/gift/, 'post', LuckyDraw.gift)
  Mock.mock(/\/user\/ticket\/phoneFee/, 'post', LuckyDraw.phoneFee)
  Mock.mock(/\/user\/user2prize/, 'get', LuckyDraw.giftDetail)
  Mock.mock(/\/item\/maintenance\/plan/, 'get', MaintenancePlan.getMaintenancePlan)
  Mock.mock(/\/order\/service\/report\/statistics/, 'post', order.getStatistics)
}

export default Mock
