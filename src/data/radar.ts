export interface RiskLevel {
  level: number;
  name: string;
  code: string;
  color: string;
  bgColor: string;
  badge: string;
  definition: string;
  criteria: string[];
  actionRecommendation: string;
}

export interface DeadpoolCase {
  id: string;
  name: string;
  aliases: string[];
  collapseDate: string;
  lifespan: string;
  peakUsers: string;
  estLoss: string;
  collapseType: '资金盘跑路' | '合规被查' | '技术内讧解散' | '低价爆仓断流';
  fatalSigns: string[];
  detailedPostMortem: string;
  lesson: string;
}

export interface RiskQuizItem {
  id: string;
  question: string;
  points: number;
  category: 'pricing' | 'community' | 'operation' | 'payment';
  rationale: string;
}

export interface RedFlagSign {
  id: string;
  title: string;
  subtitle: string;
  severity: '高危' | '极度致命';
  detectionMethod: string;
  explanation: string;
  historicalExample: string;
}

export const riskLevels: RiskLevel[] = [
  {
    level: 1,
    name: '正常健康观测',
    code: 'LEVEL_1_HEALTHY',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    badge: 'HEALTHY',
    definition: '基础设施运转正常，三网晚高峰丢包率 < 0.5%，官方群组活跃，技术工单均在 12 小时内闭环。',
    criteria: [
      '所有专线/中转物理入口 DNS 解析正常，无连续超过 2 小时的大面积断流',
      '官方 Telegram 群组正常开放发言，管理团队每日在线答疑',
      '套餐价格稳定，符合跨境带宽刚性物理成本，无反常促销',
      '使用第三方合规商户支付网关，支持工单退款凭证'
    ],
    actionRecommendation: '可放心日常使用。推荐按月付或选用大厂老牌的永久不限时包。'
  },
  {
    level: 2,
    name: '低危关注提醒',
    code: 'LEVEL_2_NOTICE',
    color: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.1)',
    badge: 'NOTICE',
    definition: '出现偶发性技术抖动或外部域名被污染，但运营团队仍保持公开沟通，暂无资金链异常。',
    criteria: [
      '官网域名被公网 GFW 污染，一周内更换了 2 次以上备用登录网址',
      '客服工单响应时效变慢，从日常的数小时延迟至 24~48 小时',
      '部分冷门落地节点（如阿根廷、土耳其）下线维修超过 5 天未恢复'
    ],
    actionRecommendation: '暂无需惊慌。检查本地订阅链接是否已更新为最新订阅地址，暂缓进行长周期大额续费。'
  },
  {
    level: 3,
    name: '中危异动预警',
    code: 'LEVEL_3_WARNING',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    badge: 'WARNING',
    definition: '网络服务发生大面积严重劣化，且运营策略突然转向激进反常的超低折扣拉新，爆仓前兆初显。',
    criteria: [
      '晚高峰超 40% 的主力节点（香港、日本、美国）持续丢包超 20%，连续 3 天以上未修复',
      '无预警突然上架“两折骨折包”、“99 元终身无限流量”等完全违背带宽成本的反常套餐',
      '节点倍率被暗中上调（如将原先 1.0x 节点批量修改为 3.0x ~ 5.0x），实际流量严重缩水',
      '官方频道发布含糊其辞的“上游机房跑路”公告，但未提供任何迁移时间表'
    ],
    actionRecommendation: '高度戒备！立即停止任何续费行为，导出本地节点备份，准备备用机场以免业务中断。'
  },
  {
    level: 4,
    name: '高危失联告警',
    code: 'LEVEL_4_CRITICAL',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    badge: 'CRITICAL',
    definition: '管理团队已停止正常客户服务，社群全员禁言，支付通道退化，跑路进入倒计时阶段。',
    criteria: [
      '官方 Telegram 交流群突然开启全员永久禁言，或者将核心维权老用户批量踢出拉黑',
      '运营管理人员、客服账号连续 7 天无任何上线记录或公开发言',
      '官网后台充值通道无法使用商户结算，退化为个人支付宝/微信静态收款码或个人钱包地址',
      '超过 80% 的节点完全超时不可用，仅剩一两个空壳节点维持假绿灯'
    ],
    actionRecommendation: '跑路已成定局！若最近 30 天内曾通过信用卡或 PayPal 付款，请立即联系发卡行发起拒付争议。'
  },
  {
    level: 5,
    name: '已确认崩盘阵亡',
    code: 'LEVEL_5_DEAD',
    color: '#94a3b8',
    bgColor: 'rgba(148, 163, 184, 0.1)',
    badge: 'DEADPOOL',
    definition: '服务彻底终结。官网域名解析失效 (NXDOMAIN)，所有服务器节点拔线关机，老板卷款失联。',
    criteria: [
      '官网所有前置域名及订阅分发域名全部解析超时，服务器已物理关机下线',
      '所有协议节点握手彻底归零，TCP 握手直接被 Reset',
      'Telegram 频道、官方推特与管理员账号全数注销或直接解散'
    ],
    actionRecommendation: '立刻清理客户端本地无效配置，杜绝被黑客接管域名后的中间人探针。迁移至正规老牌专线。'
  }
];

export const deadpoolArchive: DeadpoolCase[] = [
  {
    id: 'suwacloud',
    name: '速蛙云 (SuwaCloud)',
    aliases: ['速蛙', 'Suwa'],
    collapseDate: '2022-07-28',
    lifespan: '约 3 年',
    peakUsers: '估算超 10 万活跃用户',
    estLoss: '涉案资金池估算数千万元人民币',
    collapseType: '资金盘跑路',
    fatalSigns: [
      '跑路前一周频繁推送“周年庆 3 折终身会员”、“大额充值返还 200%”促销邮件',
      '晚高峰节点大面积丢包严重，客服不再回复工单',
      '突击宣布“机房升级”，随后 24 小时内关闭官方群组'
    ],
    detailedPostMortem: '速蛙云是科学上网历史上涉案金额与波及用户最广的恶性跑路事件之一。其长期通过超低折扣的年付和终身包迅速汇聚庞大资金池，后期由于物理带宽成本居高不下无法维系，运营团队在精心策划的大促销卷走最后一波资金后彻底关停服务器，给全行业留下了极其惨痛的教训。',
    lesson: '牢记：任何在暴雷前夕突击推销“骨折价终身包”的机场，其促销本质就是为了最大化跑路前的沉淀资金。'
  },
  {
    id: 'nyanpasu',
    name: '喵帕斯 (Nyanpasu)',
    aliases: ['喵帕斯', 'MiaoPasu'],
    collapseDate: '2020-05-18',
    lifespan: '约 4 年',
    peakUsers: '数万极客与技术型用户',
    estLoss: '全量剩余订阅无法履约',
    collapseType: '合规被查',
    fatalSigns: [
      '国内核心入口机器突遭多地公安与通管局断网排查',
      '创始人连续数日失联未在开发群露面',
      '官方网站弹出简短公告后主动关停所有基础设施'
    ],
    detailedPostMortem: '喵帕斯曾是圈内享有极高声誉的技术派老牌机场，节点稳定性极佳且规则维护精细。其停运的主因并非恶意卷款跑路，而是在国内境内入口部署中遭遇了强力合规执法打击。该事件标志着依赖个人小作坊式的国内入口搭建模式彻底走向终结，推动行业向境外合规化与企业级专线演进。',
    lesson: '个人运营的小而美机场极度脆弱，抵御政策风险能力几乎为零。尽量选择拥有多地分布式冗余的大型成熟团队。'
  },
  {
    id: 'pudding-network',
    name: '布丁网络 (Pudding)',
    aliases: ['布丁云', 'Pudding VPN'],
    collapseDate: '2021-11-04',
    lifespan: '约 1.5 年',
    peakUsers: '约 2 万中轻度用户',
    estLoss: '用户年费与季费无法追回',
    collapseType: '资金盘跑路',
    fatalSigns: [
      '无预警将 Telegram 官方频道设置为仅管理员可发言',
      '节点大量被替换为免费公共代理，测速全部飙红',
      '官网突然更换收款通道为个人私有收款二维码'
    ],
    detailedPostMortem: '布丁网络属于典型的“二道贩子中转小作坊”，通过低价倒卖上游机房二手带宽赚取差价。一旦上游供货商因违规封机或涨价，其薄弱的现金流立刻断裂。管理人员在无法承担下月机房租金时，选择注销 TG 账号直接人间蒸发。',
    lesson: '坚决远离没有自建专线能力的“二道贩子分销机场”，中间商一旦被上游断网，用户根本无处维权。'
  },
  {
    id: 'suying-sub-brands',
    name: '某低价速鹰系贴牌马甲群',
    aliases: ['极客云子站', '魔戒分销站'],
    collapseDate: '2023-09-15',
    lifespan: '6~9 个月轮换一次',
    peakUsers: '数万泛小白新手',
    estLoss: '大量 9.9 包年用户遭多次收割',
    collapseType: '低价爆仓断流',
    fatalSigns: [
      '一套开源面板前端批量克隆出数十个不同域名的“新机场”',
      '主打 9.9 元包年 1000G 等反常超低门槛引流',
      '运行半年用户积累后严重超售断流，随后关闭旧站诱导用户重新付费购买“新平台”'
    ],
    detailedPostMortem: '部分不良灰产从业者采用“工业化开店”套路：用同一套底层服务器同时绑定 10 个不同的品牌马甲，以低价吸引新人年付。一旦服务器挤爆卡死，就直接注销该品牌，原班人马换个域名改头换面重新开张，形成恶劣的收割闭环。',
    lesson: '遇到界面雷同、清一色 9.9 包年的换皮小站，切勿因贪小便宜而连续购买，沉没成本累积起来远高于正规专线。'
  },
  {
    id: 'nine-rmb-dead',
    name: '九块九包年系列小机场公墓群',
    aliases: ['微光云', '萌猫加速', '星际快线'],
    collapseDate: '2024~2026 常态化暴雷',
    lifespan: '平均存活 45~90 天',
    peakUsers: '高流动性尝鲜用户',
    estLoss: '单人损失几十元，总额庞大',
    collapseType: '低价爆仓断流',
    fatalSigns: [
      '宣传文案充斥“千兆不限速、无视晚高峰、一杯奶茶用一年”',
      '无任何工单系统，仅靠一个无人维护的 QQ 群或临时 Telegram 机器人',
      '首月体验尚可，次月开始全天丢包率超过 80%'
    ],
    detailedPostMortem: '数学规律无法被违背：合规跨境企业专线千兆带宽月租动辄数万元，一个收费 9.9 元一年的用户扣除支付通道手续费后净收入不足 8 元。要维持服务器运转必须超售 5000 倍以上，当成千上万用户涌入，节点瞬时瘫痪，运营者毫无维护动力，自然走向弃坑跑路。',
    lesson: '“便宜是最大的陷阱”。如果预算有限，宁可购买大厂正规的 5~8 元月付套餐（如光速云或唯兔云月付），也坚决不要碰百元以内的所谓“终身/包年套餐”。'
  }
];

export const riskQuizItems: RiskQuizItem[] = [
  {
    id: 'quiz-price',
    question: '你购买的套餐价格是否低于 30 元/年，或者声称几十元“买断终身 VIP”？',
    points: 25,
    category: 'pricing',
    rationale: '极度偏离带宽物理成本的定价，在行业中属于 100% 跑路率的高危资金盘特征。'
  },
  {
    id: 'quiz-promo',
    question: '该机场近期是否突然推出大额骨折优惠（如充 100 送 150、两折清仓年付）？',
    points: 20,
    category: 'pricing',
    rationale: '历史所有重大跑路案（如速蛙云）在拔网线前 1~2 周内，无一例外都进行了突击式的超常促销收割。'
  },
  {
    id: 'quiz-telegram',
    question: '官方 Telegram 交流群或交流社区是否已经被管理员开启全员禁言？',
    points: 30,
    category: 'community',
    rationale: '全员禁言意味着运营方已经无法应对故障负面舆情，是失联断流最直接的确定性前兆。'
  },
  {
    id: 'quiz-support',
    question: '晚高峰大量节点超时断连，提交的工单超过 3 天无人答复？',
    points: 15,
    category: 'operation',
    rationale: '运维与客服团队停摆，说明技术人员已经离职或团队处于事实放弃状态。'
  },
  {
    id: 'quiz-payment',
    question: '网站充值通道频繁变动，甚至要求扫描个人支付宝/微信静态收款码？',
    points: 15,
    category: 'payment',
    rationale: '合规商业支付机构已因高投诉率将其清退，使用个人账户收款预示着资金正在私密转移。'
  },
  {
    id: 'quiz-age',
    question: '该机场是否为运营时间不足 6 个月的新生小作坊？',
    points: 10,
    category: 'operation',
    rationale: '新开机场在首个半年内面临最严酷的合规与资金考验，淘汰率高达 75% 以上。'
  },
  {
    id: 'quiz-multiplier',
    question: '节点列表里大量暗改高倍率（标 1x 实际按 3x~5x 扣流量）？',
    points: 10,
    category: 'operation',
    rationale: '通过偷跑倍率掩盖带宽不足，说明机房资源已经极度枯竭。'
  }
];

export const redFlagSigns: RedFlagSign[] = [
  {
    id: 'rf-fire-sale',
    title: '致命信号一：反常的清仓式骨折大促销',
    subtitle: '历史跑路命中率 95%',
    severity: '极度致命',
    detectionMethod: '关注邮件与公告中的折扣力度',
    explanation: '正规老牌机场由于专线带宽成本极为刚性，日常优惠通常只在双十一或新年提供 8 折~8.5 折（例如光速云专属 8 折码 AMM）。如果一个机场突然全网推送“充 100 送 200”、“99 元终身无限流量”，这绝对不是老板做慈善，而是跑路团队在算计最后一票资金，准备提现离场。',
    historicalExample: '速蛙云跑路前 7 天推出“三周年狂欢 3 折终身套餐”，卷走千万资金后全员蒸发。'
  },
  {
    id: 'rf-group-muted',
    title: '致命信号二：官方交流社群全员永久禁言',
    subtitle: '历史跑路命中率 98%',
    severity: '极度致命',
    detectionMethod: '查看 Telegram 群组聊天输入框状态',
    explanation: '一个健康运营的机场必须依赖社群收集三网故障反馈。一旦管理员开启全员禁言，并把在评论区质问节点红灯的用户踢出群聊，这说明技术团队已经无力修复或者根本不再打算修复网络，断网倒计时已经进入最后阶段。',
    historicalExample: '布丁网络在关闭前 48 小时，将 3 万人的 Telegram 群直接开启全员禁言并删除置顶维护公告。'
  },
  {
    id: 'rf-payment-degraded',
    title: '致命信号三：商户网关退化为个人转账码',
    subtitle: '历史跑路命中率 90%',
    severity: '高危',
    detectionMethod: '观察充值收银台支付主体与流程',
    explanation: '正规商业机场普遍接入跨境合规第四方企业商户网关（或成熟的企业 Stripe/USDT 智能合约）。若支付界面突然弹出一个模糊的个人微信个人赞赏码，甚至要求加私聊转账后再手动开通，说明其商户资质已被微信/支付宝官方风控冻结，进入随时失联状态。',
    historicalExample: '多家速鹰系马甲在暴雷前夕，结算方式退化为淘宝代拍虚拟卡密。'
  },
  {
    id: 'rf-ghost-nodes',
    title: '致命信号四：节点大面积红圈假装“维护中”',
    subtitle: '历史跑路命中率 85%',
    severity: '高危',
    detectionMethod: '使用客户端 Ping 延迟与单线程真实测速',
    explanation: '有些运营者在资金链断裂后，为了延缓用户投诉与维权时间，会保留几个最低配的香港直连小服务器，客户端测速虽然有延迟数字，但打开任何网页都无限转圈（丢包率 99%）。官方公告常年挂着“上游割接，正在紧急恢复中”，这一挂往往就是几个月直到域名过期。',
    historicalExample: '微光云故障后挂机房检修公告长达 40 天，直至主域名解析彻底注销。'
  },
  {
    id: 'rf-force-migration',
    title: '致命信号五：强制“数据迁移新平台”二次收费',
    subtitle: '历史跑路命中率 92%',
    severity: '极度致命',
    detectionMethod: '核查所谓迁移规则与老用户补偿',
    explanation: '黑心商家的经典金蝉脱壳之术：声称“原系统被黑客攻击无法恢复，所有数据已迁往新品牌，老用户需在新平台充值 50 元激活金才能转移剩余流量”。一旦你再次付款，你会发现新平台依然卡顿，几天后再次重复同样的收割套路。',
    historicalExample: '某山寨魔戒换皮站连续换了 4 个域名，每次都以“系统升级维护”为由强制老用户补交激活费。'
  },
  {
    id: 'rf-admin-civil-war',
    title: '致命信号六：管理层公开发生内讧或精神失控',
    subtitle: '历史跑路命中率 88%',
    severity: '高危',
    detectionMethod: '观察频道置顶公告的语言情绪与矛盾',
    explanation: '机场通常由技术、商务与财务数人合伙。当利润分配不均或面临监管压力时，团队内部往往会爆发夺权危机。如果在频道里看到不同管理员互相发声明指责对方“卷走了财务钱包”、“修改了服务器 root 密码”，这种混乱意味着团队已经彻底破裂，崩盘近在眼前。',
    historicalExample: '某知名技术机场在停摆前，频道连续发布两条截然相反的公告，最终核心入口被直接清空注销。'
  }
];
