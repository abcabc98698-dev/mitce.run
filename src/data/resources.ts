export interface MirrorClient {
  id: string;
  name: string;
  platform: string;
  badge: string;
  version: string;
  updateDate: string;
  core: string;
  description: string;
  githubUrl: string;
  acceleratedUrl: string;
  sha256: string;
  features: string[];
  recommendedFor: string;
}

export interface SecurityTool {
  id: string;
  name: string;
  category: 'webrtc' | 'dns' | 'fraud' | 'speed' | 'route' | 'sub';
  categoryLabel: string;
  description: string;
  url: string;
  keyMetric: string;
  recommendation: string;
}

export interface EmergencyNode {
  id: string;
  name: string;
  location: string;
  flag: string;
  protocol: string;
  encryption: string;
  latency: string;
  packetLoss: string;
  status: 'ONLINE' | 'STANDBY';
  rawConfig: string;
  notes: string;
}

export interface FreeTutorial {
  id: string;
  title: string;
  tag: string;
  readingTime: string;
  difficulty: '入门' | '进阶' | '极客';
  summary: string;
  steps: { title: string; content: string; code?: string }[];
  warning: string;
}

export const mirrorClients: MirrorClient[] = [
  {
    id: 'clash-verge-rev',
    name: 'Clash Verge Rev',
    platform: 'Windows / macOS / Linux',
    badge: '2026主力推荐',
    version: 'v2.1.2',
    updateDate: '2026-10-15',
    core: 'Mihomo (Meta) v1.19.2',
    description: '基于 Rust/Tauri 打造的现代代理客户端，内存占用仅为旧版 Electron 的 25%，全系原生适配 Apple Silicon (M1~M4) 与 Windows 11，内置完整 TUN 模式与 Fake-IP DNS。',
    githubUrl: 'https://github.com/clash-verge-rev/clash-verge-rev/releases',
    acceleratedUrl: 'https://ghproxy.net/https://github.com/clash-verge-rev/clash-verge-rev/releases/latest',
    sha256: '9a8f4c...c5e2 (请以官方 Release 说明为准)',
    features: ['内置系统级服务模式 (Service Mode)', '支持 VLESS-Reality / Trojan / Hysteria2', 'TUN 虚拟网卡一键防泄露', '多订阅配置智能合并分流'],
    recommendedFor: '日常主力办公、开发者全流量接管、Mac/Win 全平台用户'
  },
  {
    id: 'v2rayn',
    name: 'v2rayN with Core',
    platform: 'Windows 10 / 11 (x64)',
    badge: '极客底层调试',
    version: 'v7.8.2',
    updateDate: '2026-10-20',
    core: 'Xray Core + sing-box Core',
    description: '经典老牌的 Windows 原生代理客户端，支持一键在 Xray、sing-box、Mihomo 三大核心之间无缝切换，适合需要微调底层传输协议参数的资深网络玩家。',
    githubUrl: 'https://github.com/2dust/v2rayN/releases',
    acceleratedUrl: 'https://ghproxy.net/https://github.com/2dust/v2rayN/releases/latest',
    sha256: 'd14b8e...3f90 (官方自解压整合包)',
    features: ['免安装绿色解压缩即用', '多内核无损热切换', '支持自定义路由规则 JSON 导入', '内置全局快捷键与剪贴板极速导入'],
    recommendedFor: 'Windows 平台协议研究者、对资源消耗极敏感的老旧电脑'
  },
  {
    id: 'sing-box-client',
    name: 'sing-box Universal',
    platform: '全平台 (Win / macOS / Android / Linux)',
    badge: '现代协议标杆',
    version: 'v1.11.0',
    updateDate: '2026-10-24',
    core: 'sing-box 原生统一核心',
    description: '由开源社区重磅推进的下一代通用代理平台，拥有业界最高的吞吐性能与极低的上下文切换开销，是 VLESS、TUIC 与 Hysteria2 协议官方基准测试实现。',
    githubUrl: 'https://github.com/SagerNet/sing-box/releases',
    acceleratedUrl: 'https://ghproxy.net/https://github.com/SagerNet/sing-box/releases/latest',
    sha256: 'e57c12...88a4 (全架构编译 Release)',
    features: ['轻量高性能内存管理', '全协议第一方完整支持', '灵活的 Rule-Set 分流订阅', '跨平台统一配置逻辑'],
    recommendedFor: '追求极限性能、高频流媒体 8K 压测与新协议发烧友'
  },
  {
    id: 'shadowrocket-guide',
    name: 'Shadowrocket (小火箭)',
    platform: 'iOS / iPadOS',
    badge: 'iPhone必装买断',
    version: 'v2.2.62',
    updateDate: '2026-10-18',
    core: 'Shadowrocket 专属网络引擎',
    description: 'iOS 生态下性价比最高、使用体验最顺手的网络代理神器。支持通过扫描二维码或长按导入订阅，内置按需自动重连、测速分组与场景分流机制。',
    githubUrl: 'https://apps.apple.com/us/app/shadowrocket/id932747118',
    acceleratedUrl: 'https://apps.apple.com/us/app/shadowrocket/id932747118',
    sha256: 'Apple Store 官方正版加密包 ($2.99 买断)',
    features: ['Widget 负一屏一键测速切换', '原生 On-Demand 按需连接 (蜂窝/Wi-Fi 无感切换)', '低功耗后台保活机制', '多协议自动嗅探与证书伪装'],
    recommendedFor: 'iPhone / iPad 用户首选，适合绝大多数移动办公与娱乐场景'
  },
  {
    id: 'openclash-release',
    name: 'OpenClash (OpenWrt)',
    platform: '软路由 / 旁路由 (OpenWrt)',
    badge: '全屋无感漫游',
    version: 'v0.46.120',
    updateDate: '2026-10-12',
    core: 'Mihomo Core (Dev / Release)',
    description: 'OpenWrt 固件上应用最广泛的科学分流插件，可在软路由网关层直接实现全家智能电视、手机、电脑、游戏主机的透明分流，免除每台设备单独安装客户端的烦恼。',
    githubUrl: 'https://github.com/vernesong/OpenClash/releases',
    acceleratedUrl: 'https://ghproxy.net/https://github.com/vernesong/OpenClash/releases/latest',
    sha256: '7f91a2...18b9 (.ipk 离线安装包)',
    features: ['Fake-IP (TUN) 系统模式', '全屋 DNS 远端无污染安全分流', '内网各设备单独分流黑白名单', '大屏电视 Apple TV / 索尼 4K 秒开'],
    recommendedFor: '家庭软路由玩家、多设备跨屏无缝漫游、主机游戏海外联机'
  },
  {
    id: 'flclash',
    name: 'FlClash Multiplatform',
    platform: 'Android / Windows / macOS / Linux',
    badge: 'Flutter流线UI',
    version: 'v0.8.68',
    updateDate: '2026-10-22',
    core: 'Mihomo Core',
    description: '基于 Flutter 构建的多平台图形代理客户端，界面优雅、色彩温润，支持多订阅自动定时同步、节点测速柱状图排序与应用分流规则一键切换。',
    githubUrl: 'https://github.com/chen08209/FlClash/releases',
    acceleratedUrl: 'https://ghproxy.net/https://github.com/chen08209/FlClash/releases/latest',
    sha256: '38a1bb...931c (各架构 Release)',
    features: ['Material You 动态色彩适配', 'Android 系统应用级别分流', '精美网络吞吐实时折线图', '深色模式与手势流畅交互'],
    recommendedFor: '追求界面美观的 Android 手机用户及轻量办公跨端用户'
  }
];

export const securityTools: SecurityTool[] = [
  {
    id: 'browserleaks-webrtc',
    name: 'BrowserLeaks WebRTC 检测',
    category: 'webrtc',
    categoryLabel: 'WebRTC泄漏排查',
    description: '检测浏览器是否在开启代理的情况下，通过 STUN 穿透探针私下泄漏你本地的公网或局域网真实 IP。这是大模型被封禁和报 Access Denied 的头号元凶。',
    url: 'https://browserleaks.com/webrtc',
    keyMetric: '检测输出中的 Public IP 是否包含国内运营商地址',
    recommendation: '若检测到泄漏，请在客户端开启 TUN 模式或在浏览器安装 WebRTC Control 扩展将其禁用。'
  },
  {
    id: 'dnsleaktest',
    name: 'DNS Leak Test 远端解析验证',
    category: 'dns',
    categoryLabel: 'DNS污染防护',
    description: '测试你打开网页时，发起 DNS 请求的服务器所在地理位置。防止你的本地宽带 ISP 监听你访问的目标网站名单，避免中间人重定向。',
    url: 'https://www.dnsleaktest.com/',
    keyMetric: 'Standard Test 结果中展示的 DNS 服务器国家与归属',
    recommendation: '必须确保测试结果中的 DNS 服务器全部位于海外机房，绝不能出现国内省份的 Telecom / Unicom 节点。'
  },
  {
    id: 'scamalytics',
    name: 'Scamalytics IP 欺诈度评分',
    category: 'fraud',
    categoryLabel: 'IP纯净度核验',
    description: '全球各大金融、大模型服务商（OpenAI、Anthropic、PayPal）核心引用的欺诈风控数据库。查询节点 IP 是否被标记为高风险数据中心代理。',
    url: 'https://scamalytics.com/ip',
    keyMetric: 'Fraud Score (0 分为极度纯净，100 分为高危黑名单)',
    recommendation: '用于 ChatGPT 或 Claude 的节点，Fraud Score 建议低于 25 分；超过 70 分的广播 IP 严禁用于登录重要账号。'
  },
  {
    id: 'itdog-ping',
    name: 'ITDog 全球路由追踪与丢包大盘',
    category: 'route',
    categoryLabel: '三网链路诊断',
    description: '从中国电信、中国联通、中国移动全国数百个探测点并发 ping 你的节点入口，精准绘制出入口抖动、丢包率与骨干网绕路情况。',
    url: 'https://www.itdog.cn/ping/',
    keyMetric: '全国三网晚高峰平均延迟、抖动方差与丢包比例',
    recommendation: '若晚高峰丢包率超过 15%，说明该机场采用的是廉价公网中转，建议更换至 IEPL/IPLC 物理专线。'
  },
  {
    id: 'fast-speedtest',
    name: 'Fast.com (Netflix 官方单线程测速)',
    category: 'speed',
    categoryLabel: '单线程吞吐测试',
    description: '基于 Netflix 全球 CDN 服务器的测速平台，重点考察节点单线程突发带宽与加载超清 4K/8K 视频的真实下行能力，杜绝虚标。',
    url: 'https://fast.com/',
    keyMetric: '单线程下行带宽 (Mbps) 与加载时延 (Loaded Latency)',
    recommendation: '流畅观看 4K 60帧杜比视界需要稳定 45Mbps 以上；若时延超过 300ms 则会发生明显拖拽缓冲。'
  },
  {
    id: 'subconverter-github',
    name: 'Subconverter 开源自建订阅转换',
    category: 'sub',
    categoryLabel: '订阅安全防护',
    description: '开源的一套强大订阅转换程序。可将任何机场的订阅链接转换为 Clash、sing-box、Surge 或 Quantumult X 格式，建议私有化部署。',
    url: 'https://github.com/tindy2013/subconverter',
    keyMetric: '完全离线或私有容器运行，Token 永不离开本地',
    recommendation: '严禁使用搜索引擎排名前列的第三方陌生公共订阅转换 API，谨防机场订阅 Token 与节点信息被后门抓取外泄。'
  }
];

export const emergencyNodes: EmergencyNode[] = [
  {
    id: 'node-cf-edge',
    name: 'Mitce-CF-Anycast 应急通道 01',
    location: 'Cloudflare Global Anycast Edge',
    flag: '🌐',
    protocol: 'VLESS-Reality',
    encryption: 'TLS 1.3 / XTLS',
    latency: '82 ms',
    packetLoss: '0.1%',
    status: 'ONLINE',
    rawConfig: 'vless://mitce-cf-edge@104.16.132.229:443?encryption=none&security=reality&sni=gateway.icloud.com&fp=chrome&pbk=MitceObservatoryPublicKey2026&type=tcp#Mitce-CF-Anycast-01',
    notes: '仅用于下载官方客户端、同步 GitHub 代码仓库及查看文档。请勿用于大流量 P2P 下载。'
  },
  {
    id: 'node-us-lax',
    name: 'Mitce-US-LAX 洛杉矶 BGP 应急通道 02',
    location: '美国·加州洛杉矶 (Equinix 机房)',
    flag: '🇺🇸',
    protocol: 'Trojan',
    encryption: 'AES-256-GCM',
    latency: '148 ms',
    packetLoss: '0.4%',
    status: 'ONLINE',
    rawConfig: 'trojan://mitce-lax-pass@lax02.mitce.run:443?security=tls&sni=lax02.mitce.run#Mitce-US-LAX-02',
    notes: '适合临时登录查阅海外学术文献或开发文档。晚高峰有 QoS 限制，不可作为 4K 娱乐主力。'
  },
  {
    id: 'node-sg-sin',
    name: 'Mitce-SG-SIN 新加坡直连应急通道 03',
    location: '新加坡·亚太枢纽 (SingTel 直连)',
    flag: '🇸🇬',
    protocol: 'VLESS-Reality',
    encryption: 'XTLS-Vision',
    latency: '68 ms',
    packetLoss: '0.2%',
    status: 'ONLINE',
    rawConfig: 'vless://mitce-sg-sin@sin03.mitce.run:443?encryption=none&security=reality&sni=aws.amazon.com&fp=chrome&type=tcp#Mitce-SG-SIN-03',
    notes: '低延迟线路，适合终端命令行 git 调试与小包交互。每 24 小时动态刷新会话令牌。'
  },
  {
    id: 'node-jp-tyo',
    name: 'Mitce-JP-TYO 东京备份通道 04',
    location: '日本·东京 (软银 BBTEC 直连备用)',
    flag: '🇯🇵',
    protocol: 'Hysteria2',
    encryption: 'Salamander',
    latency: '54 ms',
    packetLoss: '0.3%',
    status: 'STANDBY',
    rawConfig: 'hy2://mitce-tyo:backup2026@tyo04.mitce.run:443?insecure=0&sni=tyo04.mitce.run#Mitce-JP-TYO-04',
    notes: '基于 UDP 拥塞控制协议，用于骨干网严重丢包时的抗拥塞备用跳板。'
  }
];

export const freeTutorials: FreeTutorial[] = [
  {
    id: 'warp-speedup-guide',
    title: 'Cloudflare WARP+ 免费大模型优选 IP 玩法全流程',
    tag: '零成本AI解锁',
    readingTime: '5 分钟实操',
    difficulty: '入门',
    summary: '利用 Cloudflare 官方提供的全球免费边缘网络，配合开源优选脚本筛选出本地延迟最低的 Anycast 节点，实现免费畅连 ChatGPT 与国际互联网。',
    steps: [
      {
        title: '第一步：下载 WARP 官方客户端或提取 WireGuard 凭证',
        content: '访问 1.1.1.1 官方下载适用于 Windows/Mac 的 Cloudflare WARP 客户端，或使用开源工具 `warp-reg` 自动生成独立的 WireGuard 配置文件与私钥。'
      },
      {
        title: '第二步：使用 CloudflareSpeedTest 脚本本地测速',
        content: '运行开源测速脚本，向全国分配的数百个 Cloudflare IP 段发送并发握手包，筛选出本地宽带延迟低于 100ms 且丢包率为 0 的极品 IP 地址。'
      },
      {
        title: '第三步：导入 Clash Verge 或 sing-box 作为前置代理',
        content: '将优选出的 IP 和 2408 端口填入客户端 WireGuard 或 VLESS 节点中，开启 TUN 模式即可畅通访问。',
        code: `proxies:
  - name: "Cloudflare-WARP-Fast"
    type: wireguard
    server: 162.159.193.10
    port: 2408
    ip: 172.16.0.2
    public-key: bmX... (公钥)`
      }
    ],
    warning: 'WARP 属于免费公共网络，IP 属于 Cloudflare 数据中心广播段，可能在部分地区遭到运营商阻断，重度外贸办公仍建议配置商业物理专线备用。'
  },
  {
    id: 'oracle-cloud-free-vps',
    title: '甲骨文云 (Oracle Cloud) 永久免费 4核 24G ARM 服务器防封保活指南',
    tag: '云厂商白嫖',
    readingTime: '8 分钟硬核',
    difficulty: '进阶',
    summary: 'Oracle Cloud 提供的 Always Free 方案包含最多 4 核 ARM 架构 CPU、24GB 内存与 10TB/月出向流量。只要掌握申请技巧与防闲置回收规则，即可拥有永久免费的个人私有服务器。',
    steps: [
      {
        title: '第一步：准备外币单币信用卡与真实账单地址',
        content: '注册时请使用中国银行、招商银行等发行的真实 Visa/Mastercard 实体信用卡（虚拟信用卡容易被拒），姓名与账单地址需与银行预留信息一致。'
      },
      {
        title: '第二步：首选注册区域 (Home Region) 建议',
        content: '亚太推荐选择东京 (Tokyo)、大阪 (Osaka)、首尔 (Chuncheon) 或新加坡；若无配额可选美西圣何塞 (San Jose) 或凤凰城 (Phoenix)。'
      },
      {
        title: '第三步：防止因闲置被官方收回实例 (Keep-Alive)',
        content: '甲骨文政策规定连续多日 CPU 利用率低于 10% 的免费实例可能被系统自动回收。建议使用 Docker 部署一个轻量的编译任务或运行保活脚本使 CPU 保持在 15%~20% 区间。'
      }
    ],
    warning: '甲骨文云风控机制极度严格，严禁在同一张信用卡或同一个 IP 下重复注册多个账号，否则会导致整个租户被直接注销。'
  },
  {
    id: 'subconverter-docker-setup',
    title: '5 分钟在本地或 NAS 用 Docker 自建私有订阅转换服务',
    tag: '安全防泄露',
    readingTime: '4 分钟部署',
    difficulty: '进阶',
    summary: '拒绝在公共第三方网站输入自己的机场订阅！通过官方 Docker 镜像 5 分钟在本地搭建专属的 Subconverter，彻底阻断机场 Token 被第三方窃取的风险。',
    steps: [
      {
        title: '第一步：一条命令启动本地 Subconverter 容器',
        content: '在安装了 Docker 的电脑、群晖 NAS 或软路由终端中执行以下命令：',
        code: `docker run -d --name subconverter --restart always -p 25500:25500 tindy2013/subconverter:latest`
      },
      {
        title: '第二步：使用本地 API 转换订阅链接',
        content: '启动后，将转换请求地址指向 `http://127.0.0.1:25500/sub?target=clash&url=你的机场订阅链接`。所有的规则生成与协议解析均在本地内存中完成，无任何网络数据上传。'
      }
    ],
    warning: '若需要公网访问自己的转换服务，务必在 `pref.ini` 中设置 `api_access_token` 密码认证，防止他人未授权调用。'
  }
];
