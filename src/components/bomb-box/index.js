export const ruleOfDialog = (createElement) => {
  return [
    createElement('div', {
      'class': {
        'my-title': true
      },
      slot: 'title'
    }, [
      createElement('div', {
        'class': {
          'my-title-img': true
        }
      }),
      createElement('p', '段位规则')
    ]),
    createElement('div', {
      'class': {
        'my-content': true
      },
      slot: 'content'
    }, [
      createElement('table', {
        'class': {
          'my-content-table': true
        }
      }, [
        createElement('tr', [
          createElement('th', {
            'my-content-table-td': true
          }, '段位'),
          createElement('th', {
            'my-content-table-td': true
          }, '赛期积分'),
          createElement('th', {
            'my-content-table-td': true
          }, '获得抽奖次数')
        ]),
        createElement('tr', [
          createElement('td', {
            'my-content-table-td': true
          }, '王者'),
          createElement('td', '2000分及以上'),
          createElement('td', '+4次')
        ]),
        createElement('tr', [
          createElement('td', {
            'my-content-table-td': true
          }, '钻石'),
          createElement('td', '1500-1999 分'),
          createElement('td', '+2次')
        ]),
        createElement('tr', [
          createElement('td', {
            'my-content-table-td': true
          }, '铂金'),
          createElement('td', '1000-1499 分'),
          createElement('td', '+2次')
        ]),
        createElement('tr', [
          createElement('td', {
            'my-content-table-td': true
          }, '黄金'),
          createElement('td', '500-999 分'),
          createElement('td', '+1次')
        ]),
        createElement('tr', [
          createElement('td', {
            'my-content-table-td': true
          }, '白银'),
          createElement('td', '200-499 分'),
          createElement('td', '+1次')
        ]),
        createElement('tr', [
          createElement('td', {
            'my-content-table-td': true
          }, '青铜'),
          createElement('td', '0-199 分'),
          createElement('td', '0次')
        ])
      ]),
      createElement('div', {
        'class': 'my-content-tip'
      }, '注:每期最高获得10次抽奖机会'),
      createElement('div', {
        'class': 'cube-dialog-btns'
      }, '注:每期最高获得10次抽奖机会')
    ])
  ]
}

export const activeOfDialog = (createElement) => {
  return [
    createElement('div', {
      'class': {
        'my-title': true
      },
      slot: 'title'
    }, [
      createElement('div', {
        'class': {
          'my-title-rule': true
        }
      }, '赛期积分规则')
    ]),
    createElement('div', {
      'class': {
        'my-period-integral': true
      },
      slot: 'content'
    }, [
      createElement('ul', [
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '赛期排名积分'),
          createElement('div', '扫码积分 + 任务积分 + 抽奖积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '扫码积分'),
          createElement('div', '赛期内购买达欧配件产品，通过扫描防伪码获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '任务积分'),
          createElement('div', '赛期内“大大汽修”APP任务获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '抽奖积分'),
          createElement('div', '赛期内抽奖活动中获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '结算周期'),
          createElement('div', '上月25日14:00:01至当月25日14:00:00。（5月作为第一个赛期，排行积分从2018-5-1  00 :00:01开始计算）。当期排名积分将在当月25号归零。 当期归零的积分仍然统计在总排行榜中。')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '赛期排行榜周期'),
          createElement('div', '第一期：'),
          createElement('div', '2018-5-1至 2018-5-25（14:00）'),
          createElement('div', '第二期：'),
          createElement('div', '2018-5-25（接上期）至 2018-6-25（14:00）'),
          createElement('div', '第三期：'),
          createElement('div', '2018-6-25（接上期）至 2018-7-25（14:00）'),
          createElement('div', '第四期：'),
          createElement('div', '2018-7-25（接上期）至 2018-8-25（14:00）'),
          createElement('div', '第五期：'),
          createElement('div', '2018-8-25（接上期）至 2018-9-25（14:00）')
        ])
      ])
    ])
  ]
}

export const monthPoints = (createElement) => {
  return [
    createElement('div', {
      'class': {
        'my-title': true
      },
      slot: 'title'
    }, [
      createElement('div', {
        'class': {
          'my-title-rule': true
        }
      }, '总排行积分规则')
    ]),
    createElement('div', {
      'class': {
        'my-content': true
      },
      slot: 'content'
    }, [
      createElement('ul', [
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '总排行积分'),
          createElement('div', '累计扫码积分 + 累计任务积分 + 累计抽奖积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '累计扫码积分'),
          createElement('div', '2016-11-15  17:00:01至2018-9-25  14:00:00购买达欧配件产品，通过扫描防伪码获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '累计任务积分'),
          createElement('div', '2018-5-1 00:00:01 至 2018-9-25  14:00:00 “大大汽修”APP 任务获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '累计抽奖积分'),
          createElement('div', '2018-5-1  00:00:01 至2018-9-25  14:00:00抽奖活动中获得的积分')
        ])
      ])
    ])
  ]
}

export const integralRuleOfDialog = (createElement) => {
  return [
    createElement('div', {
      'class': {
        'my-title': true
      },
      slot: 'title'
    }, [
      createElement('div', {
        'class': {
          'my-title-rule': true
        }
      }, '赛期积分规则')
    ]),
    createElement('div', {
      'class': {
        'my-period-integral': true
      },
      slot: 'content'
    }, [
      createElement('ul', [
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '赛期排名积分'),
          createElement('div', '扫码积分 + 任务积分 + 抽奖积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '扫码积分'),
          createElement('div', '赛期内购买达欧配件产品，通过扫描防伪码获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '任务积分'),
          createElement('div', '赛期内“大大汽修”APP任务获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '抽奖积分'),
          createElement('div', '赛期内抽奖活动中获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '结算周期'),
          createElement('div', '上月25日14:00:01至当月25日14:00:00。（5月作为第一个赛期，排行积分从2018-5-1  00:00:01开始计算）。'),
          createElement('div', '当期排名积分将在当月25号归零。 当期归零的积分仍然统计在总排行榜中。')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '赛期排行榜周期'),
          createElement('div', '第一期：'),
          createElement('div', '2018-5-1至 2018-5-25（14:00）'),
          createElement('div', '第二期：'),
          createElement('div', '2018-5-25（接上期）至 2018-6-25（14:00）'),
          createElement('div', '第三期：'),
          createElement('div', '2018-6-25（接上期）至 2018-7-25（14:00）'),
          createElement('div', '第四期：'),
          createElement('div', '2018-7-25（接上期）至 2018-8-25（14:00）'),
          createElement('div', '第五期：'),
          createElement('div', '2018-8-25（接上期）至 2018-9-25（14:00）')
        ])
      ])
    ])
  ]
}

export const rankingsRule = (createElement) => {
  return [
    createElement('div', {
      'class': {
        'my-title': true
      },
      slot: 'title'
    }, [
      createElement('div', {
        'class': {
          'my-title-rule': true
        }
      }, '总排行积分规则')
    ]),
    createElement('div', {
      'class': {
        'my-content ': true
      },
      slot: 'content'
    }, [
      createElement('ul', [
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '总排行积分'),
          createElement('div', '累计扫码积分 + 累计任务积分 + 累计抽奖积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '累计扫码积分'),
          createElement('div', '2016-11-15  17:00:01至2018-9-25  14:00:00购买达欧配件产品，通过扫描防伪码获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '累计任务积分'),
          createElement('div', '2018-5-1  00:00:01至2018-9-25  14:00:00 “大大汽修”APP任务获得的积分')
        ]),
        createElement('li', {
          'class': 'dialog-rule'
        }, [
          createElement('h5', '累计抽奖积分'),
          createElement('div', '2018-5-1  00:00:01 至2018-9-25  14:00:00抽奖活动中获得的积分')
        ])
      ])
    ])
  ]
}

export const downloadApp = (createElement) => {
  return [
    createElement('div', {
      'class': {
        'my-download-title': true
      },
      slot: 'title'
    }, [createElement('div', {
      'class': {
        'my-content-download-title': true
      }
    })]),
    createElement('div', {
      'class': {
        'my-content-download-img': true
      },
      slot: 'content'
    }, ``),
    createElement('div', {
      'class': {
        'my-content-download-app': true
      },
      slot: 'content'
    }, `下载"大大汽修"APP`),
    createElement('div', {
      'class': {
        'my-content-download-points': true
      },
      slot: 'content'
    }, '完成任务获取更多积分'),
    createElement('div', {
      'class': {
        'my-content-download-button': true
      },
      slot: 'content',
      on: {
        click: downloading
      },
      confirm: 'ticket'
    }, '立即下载APP')
  ]
}

let downloading = () => {
}
