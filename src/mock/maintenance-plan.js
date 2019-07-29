import Mock from 'mockjs'
import Vue from 'vue'

export default {
  getMaintenancePlan: config => {
    let mileageList = []
    let count = 0
    for (let i = 0.5; i <= 12;) {
      mileageList.push({
        id: count,
        mileage: i * 10000,
        month: i * 12,
        createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
        isDelete: 0
      })
      i += 0.5
      count++
    }

    let maintenanceVOList = []
    for (let i = 0; i < 17; i++) {
      let services = ['小保养', '空气滤清器', '空调滤清器', '燃油滤清器', '火花塞', '燃油系统养护', '正时皮带套装', '刹车油', '刹车盘', '刹车系统养护', '喷油嘴清洗', '进气系统清洗', '三元催化清洗', '大保养', '轮胎更换', '全车安全检查', '防冻冷却系统']
      let productList = []
      let taskList = []

      let productCount = Mock.Random.natural(0, 5)
      for (let m = 0; m < productCount; m++) {
        productList.push(Mock.mock({
          'productId|0-1000': 0,
          'productName|1': ['刹车片', '雨刮', '离合器', '机油', '轮胎'],
          'categoryId|0-5': 0,
          status: 0,
          categoryName: Mock.Random.cword(2, 4),
          'productPrice|10-1000': 0,
          'quality|1': ['原厂件', '品牌件'],
          productModel: Mock.Random.word(3, 10),
          'productBrandName|1': ['百希特', '壳牌', '嘉实多'],
          'count|1-5': 0
        }))
      }

      let taskCount = Mock.Random.natural(0, 5)
      for (let m = 0; m < taskCount; m++) {
        taskList.push(Mock.mock({
          'taskId|0-1000': 0,
          'taskName|1': ['洗车', '换机油', '换轮胎', '换机滤', '空调管道清洗'],
          'categoryId|0-5': 0,
          categoryName: Mock.Random.cword(2, 4),
          'companyId|1-1000': 0,
          'count|1-5': 0,
          'price|10-100': 0
        }))
      }

      maintenanceVOList.push({
        maintenance: {
          id: i,
          name: services[i],
          createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
          isDelete: 0
        },
        productList,
        taskList
      })
    }

    let maintenance2mileageMap = {}
    mileageList.forEach(mileage => {
      let num = Mock.Random.natural(1, 17)
      let items = []
      for (let m = 0; m < num; m++) {
        items.push({
          id: m,
          maintenanceId: Mock.Random.natural(0, 17),
          mileageId: mileage.id
        })
      }
      Vue.set(maintenance2mileageMap, `${mileage.id}`, items)
    })

    return Mock.mock({
      result: 0,
      data: {
        maintenanceVOList,
        mileageList,
        maintenance2mileageMap
      }
    })
  }
}
