export default [
  {
    name: 'level',
    fil: (value) => {
      value = parseInt(value)
      if (value >= 0 && value <= 199) {
        return '青铜'
      } else if (value > 199 && value <= 499) {
        return '白银'
      } else if (value > 499 && value <= 999) {
        return '黄金'
      } else if (value > 999 && value <= 1499) {
        return '铂金'
      } else if (value > 1499 && value <= 1999) {
        return '钻石'
      } else if (value > 1999) {
        return '王者'
      } else {
        return '---'
      }
    }
  },
  {
    name: 'completion',
    fil: (value) => {
      if (!value || value < 0) return '未完成'
      value = parseInt(value)
      if (value === 0) {
        return '未完成'
      }
      if (value === 1) {
        return '已完成'
      }
    }
  },
  {
    name: 'prizeLevel',
    fil: (value) => {
      if (!value || value < 0) return '---'
      value = parseInt(value)
      if (value === 1) {
        return '一等奖'
      } else if (value === 2) {
        return '二等奖'
      } else if (value === 3) {
        return '三等奖'
      } else if (value === 4) {
        return '四等奖'
      } else if (value >= 5 && value <= 8) {
        return '幸运奖'
      }
    }
  },
  {
    name: 'orderType',
    fil: (value) => {
      if (!value) return '---'
      switch (value) {
        case 'REGISTERED': return '注册成为“大大汽修 APP”用户'
        case 'EVERY_MONTH_CREATE_ORDER': return '每月在“大大汽修”开工单'
        case 'EVERY_DAY_CREATE_ORDER': return '每日在“大大汽修”开工单'
        case 'EVERY_DAY_SHARE': return '每日“分享好友”'
        case 'INVITATION': return '邀请好友注册“大大汽修”'
      }
    }
  },
  {
    name: 'phoneDecorate',
    fil: (value) => {
      if (!value) return ''
      return `${value.substring(0, 3)}****${value.substring(7, 11)}`
    }
  },
  {
    name: 'money',
    fil: (value) => {
      if (!value && value !== 0) {
        return ''
      }
      if (value === 0) {
        return '0.00'
      }
      return parseFloat(value).toFixed(2)
    }
  }
]

