export interface FAQItem {
  id: string;
  category: 'basics' | 'tech' | 'troubleshooting' | 'ai_streaming' | 'billing' | 'compliance';
  categoryName: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  tags: string[];
}

export const faqCategories = [
  { id: '', label: '全部问答 (80+)' },
  { id: 'troubleshooting', label: '高频故障急救' },
  { id: 'ai_streaming', label: 'AI与流媒体防封' },
  { id: 'tech', label: 'IEPL专线与协议' },
  { id: 'basics', label: '新手基础认知' },
  { id: 'billing', label: '账单与防坑选型' },
  { id: 'compliance', label: '隐私安全与合规' }
];

export const faqItems: FAQItem[] = [
  // 1. 高频故障急救 (Troubleshooting) - 黄金长尾搜索词
  {
    id: 'ts-all-nodes-timeout',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '导入订阅后，客户端测速所有节点全部显示“-1ms”或“连接超时”，怎么排查？',
    shortAnswer: '90% 是本地电脑系统时间不准、订阅链接被拦截或杀毒软件阻断内核运行引起。',
    detailedAnswer: '测速全部超时（全红）通常按照以下四步逐一排查：\n1. **校准系统时间（最常见原因）**：现代代理协议（如 VLESS-Reality、VMess、Trojan）使用 TLS 握手与时间戳校验。若你电脑或手机的本地时间与标准北京时间误差超过 60 秒，服务端握手包会直接被静默丢弃。在 Windows/Mac 设置中关闭并重新开启“自动同步时间”即可瞬间恢复。\n2. **更新订阅链接**：检查订阅地址是否过期。在客户端右键订阅选择“更新”，查看是否能拉取到最新节点。\n3. **检查杀毒软件防火墙**：火绒或 Windows Defender 可能会拦截内核（如 mihomo.exe 或 xray.exe）创建虚拟适配器，建议将代理客户端文件夹加入信任白名单。\n4. **入口 DNS 污染**：某些地区宽带运营商对机场的国内中转域名做了 DNS 投毒，可以在客户端全局 DNS 设置中强制配置公共安全 DNS（如 119.29.29.29 或 223.5.5.5）。',
    tags: ['超时', '节点全红', '系统时间', '握手失败', '-1ms']
  },
  {
    id: 'ts-domestic-web-broken',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '开启代理后，海外网站能正常打开，但国内微信图片发不出、百度淘宝打不开或极慢？',
    shortAnswer: '路由分流规则错误（被误设为了“全局模式 Global”），请切换为“规则模式 (Rule)”并排查 DNS。',
    detailedAnswer: '这是分流配置错乱导致的典型症状：\n1. **切换为规则模式 (Rule Mode)**：如果你不小心把代理模式从“Rule (规则)”切换成了“Global (全局)”，那么连访问国内百度、知乎、淘宝的数据包也会被强行送往香港或美国海外节点再绕回国内，造成巨大的延迟甚至被国内网站的海外风控拦截。\n2. **检查分流规则集**：确保客户端启用了针对 `GEOIP,CN` 和 `GEOSITE,CN` 的 `DIRECT (直连)` 规则。\n3. **本地 DNS 抢答与环路**：若在软路由上开启了 Fake-IP，请检查国内域名 DNS 服务器是否正确设置为本地运营商 DNS 或腾讯 DNSPod（119.29.29.29），避免将国内请求转发给海外 8.8.8.8 导致 CDN 调度跑偏。',
    tags: ['国内打不开', '全局模式', '规则分流', '微信发图慢', '淘宝加载失败']
  },
  {
    id: 'ts-terminal-git-timeout',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '为什么浏览器打开海外网站飞快，但是在 cmd、PowerShell 或 Linux 终端跑 git clone 依然报错超时？',
    shortAnswer: '命令行工具（Git / npm / Docker / curl）默认不读取 Windows/Mac 的系统代理设置。',
    detailedAnswer: '操作系统的“系统代理 (System Proxy)”本质上只是写在注册表里的一个变量，绝大多数命令行开发工具为了保证运行独立性，都会主动忽略系统代理设置，依然发起本地直连。\n**两种终极解决方案**：\n- **方案一（推荐）：开启 TUN 虚拟网卡模式**：在 Clash Verge Rev 或 sing-box 中安装服务模式并开启 TUN 模式。TUN 模式会在系统内核层虚拟出一张物理网卡，接管整台电脑所有进程的流量，命令行和容器无需任何配置即可自动走代理。\n- **方案二：临时注入环境变量**：在 PowerShell 中执行以下命令（假设客户端本地混合端口为 7897）：\n```powershell\n$env:http_proxy="http://127.0.0.1:7897"\n$env:https_proxy="http://127.0.0.1:7897"\n```\n对于 Git，也可以执行单次配置：`git config --global http.proxy http://127.0.0.1:7897`。',
    tags: ['git clone', '终端代理', 'PowerShell', 'npm报错', 'TUN模式']
  },
  {
    id: 'ts-tun-vs-system-proxy',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '什么是 TUN 虚拟网卡模式？它与传统的“系统代理 (System Proxy)”有什么技术区别？',
    shortAnswer: '系统代理仅修改浏览器 HTTP 变量，极易漏流量；TUN 模式在系统内核层虚拟网络硬件，100% 接管所有数据包。',
    detailedAnswer: '两者属于完全不同的网络层级：\n- **系统代理 (Layer 7 应用层)**：只是通知兼容的软件（如 Edge、Chrome）在发起 HTTP/HTTPS 请求时转给本地 127.0.0.1 端口。它无法处理游戏 UDP 流量、终端命令行、原生 Socket 套接字，且极易在浏览器中泄漏真实的 WebRTC 本地 IP。\n- **TUN 虚拟网卡模式 (Layer 3 网络层)**：客户端通过驱动在操作系统内核中创建一张虚拟以太网卡，并将默认网关路由表指向该虚拟网卡。电脑发出的每一个 IP 数据包（包括 TCP、UDP、ICMP ping 包）都在离开网卡前被代理内核截获并透明分流，具备真正的系统级防泄露能力。',
    tags: ['TUN模式', '系统代理', '内核网卡', '防泄露', 'UDP接管']
  },
  {
    id: 'ts-dns-flush-fakeip',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '关闭代理客户端后，电脑突然无法上网（显示无网络连接或无法解析域名），如何彻底复原？',
    shortAnswer: '客户端非正常退出导致系统代理注册表未被释放，或 TUN 网卡未注销。一键重置系统代理即可恢复。',
    detailedAnswer: '当客户端在后台被强制结束进程或电脑意外关机时，写入系统的代理状态未能正常注销：\n1. **重置 Windows 代理设置**：按 Win+I 打开“系统设置” ➔ 进入“网络和 Internet” ➔ 点击“代理” ➔ 将“使用代理服务器”开关手动切换为**关**。\n2. **重置网络协议栈并清空 DNS 缓存**：以管理员身份打开 PowerShell，执行以下两行命令并回车：\n```powershell\nnetsh winsock reset\nipconfig /flushdns\n```\n3. **重启电脑**：通常执行完上述步骤后，网络解析会立即恢复正常。',
    tags: ['没网了', '打不开网页', '重置代理', 'flushdns', '无法上网']
  },

  // 2. AI 生产力与流媒体防封 (AI & Streaming)
  {
    id: 'ai-chatgpt-1020-denied',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '为什么用同一个机场节点，刷 YouTube 4K 很顺畅，但访问 ChatGPT 却弹出 Access Denied (Error 1020)？',
    shortAnswer: '流媒体只校验地域版权，大语言模型则深度挂接 Cloudflare 高级风控，对机房广播 IP 和高欺诈度出口直接拦截。',
    detailedAnswer: '很多人误以为“能看 YouTube 就代表节点质量好”，这是极大的认知误区：\n1. **判定逻辑完全不同**：YouTube 几乎不限制数据中心机房 IP。而 OpenAI、Anthropic (Claude) 和 Midjourney 普遍接入了 Cloudflare Turnstile 与专业反欺诈库（Scamalytics）。\n2. **广播 IP 的欺诈原罪**：低价中转机场普遍采用廉价云厂商的机房广播段（Hosting/Datacenter ASN），这批 IP 上每天有数以万计的黑产脚本在跑爬虫和碰撞注册。一旦该 IP 段的 Fraud Score 超过 70 分，整段 IP 都会被大模型官方直接屏蔽。\n3. **解法**：选用配备原生住宅出口池或企业专线出口的品牌（如**光速云**），其出口具备干净的本地宽带 ASN，欺诈分通常低于 15 分，能从根本上消除 1020 报错。',
    tags: ['ChatGPT', 'Access Denied', '1020', 'Cloudflare拦截', '原生IP']
  },
  {
    id: 'ai-webrtc-leak-danger',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '什么是 WebRTC 真实 IP 泄漏？为什么它会导致 OpenAI 账号被无预警封禁？',
    shortAnswer: 'WebRTC 穿透探针会在后台直接暴露你本地运营商的真实中国公网 IP，与海外代理头形成剧烈冲突从而触发封号。',
    detailedAnswer: 'WebRTC（网页实时通信技术）原本是用来视频会议和 P2P 传输的。为了穿透复杂的家庭路由器 NAT，它会通过 STUN 服务器探针直接获取你本地物理网卡的真实公网 IP。\n**致命封号链**：\n当你在 Chrome 打开 ChatGPT 时，虽然你的网页请求头挂着美国洛杉矶的代理 IP，但 Cloudflare 页面脚本运行 WebRTC 探针后，在 0.1 秒内就获取到了你本地电信或联通的中国真实公网 IP。这种“请求来自美国，但物理网卡来自中国”的绝对矛盾，会被直接标记为“高风险代理挂马”，轻则拒绝访问，重则在 24 小时内由系统自动注销账号。\n**根治手段**：开启 TUN 模式或在浏览器安装 `WebRTC Control` 插件彻底禁用 WebRTC。',
    tags: ['WebRTC泄漏', '封号原因', 'STUN探针', '指纹识别', '真实IP']
  },
  {
    id: 'ai-claude-phone-sms-error',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: 'Claude 3.5 Sonnet 注册与登录时提示“App not available in your country”，该如何彻底解决？',
    shortAnswer: '除了确保节点纯净外，必须清理浏览器 Cookie、锁定单一落地节点并使用干净的海外真实手机号。',
    detailedAnswer: 'Anthropic 对 Claude 的风控审查甚至比 OpenAI 还要严厉苛刻：\n1. **严禁频繁更换节点国家**：十分钟前用日本节点登录，五分钟后自动切换到英国节点，这种跨时区漂移会立刻触发死锁风控。办公时务必将客户端固定在一条稳定的专线节点（如美国或新加坡）。\n2. **彻底清理浏览器缓存**：在访问之前，必须彻底清理本地浏览器对 `claude.ai` 和 `anthropic.com` 的所有 LocalStorage 与 IndexedDB 数据，或直接在无痕隐私窗口下使用。\n3. **海外手机号接码禁忌**：严禁使用 Google Voice 虚拟号或烂大街的公共接码平台。必须使用正规实体卡（如英国 giffgaff、美国无合约实体卡）接码验证。',
    tags: ['Claude', '国家限制', '接码验证', 'Anthropic', '防封锁']
  },
  {
    id: 'ai-netflix-disney-non-original',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '为什么用同一个节点，看 Netflix 只能看“自制剧 (Netflix Originals)”，搜不到热播韩剧或第三方版权电影？',
    shortAnswer: '该节点的海外落地 IP 被 Netflix 识别为普通数据中心机房，只开放自制剧，未获得第三方版权库解锁。',
    detailedAnswer: 'Netflix 的流媒体风控分为“半解锁”与“全解锁”：\n- **半解锁（机房原生限制）**：你的 IP 虽能打开 Netflix，但 Netflix 官方算法根据 ASN 判定你来自数据中心 VPS，由于没有与好莱坞或版权方签署机房播放协议，系统会自动屏蔽所有第三方版权电影（如哈利波特、最新日本新番、热播剧），只展示 Netflix 拥有全球版权的自制剧。\n- **全解锁**：机场运维通过双栈技术，将流媒体请求流量通过住宅 DNS 或 ISP 原生专线转发（如通过原生香港住宅 IP 出口），使 Netflix 判定你为当地普通家庭宽带用户，从而呈现完整的地域专属影视库。购买机场时务必确认其节点支持“流媒体全解锁 (Full Unlock)”。',
    tags: ['Netflix全解锁', '自制剧', '流媒体版权', 'DNS解锁', '奈飞锁区']
  },

  // 3. IEPL 专线与底层技术 (Tech)
  {
    id: 'tech-iepl-vs-iplc',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: 'IEPL 与 IPLC 物理专线到底有什么区别？它们真的完全“不过 GFW 防火墙”吗？',
    shortAnswer: 'IPLC 是物理层点对点光缆，IEPL 是二层以太网专线。两者全程走运营商内部封闭光纤，物理级绕过 GFW 公网拦截。',
    detailedAnswer: '这是高端机场与低价中转机场的分水岭：\n- **IPLC (International Private Leased Circuit)**：国际私有租用线路，属于两地机房之间的物理裸纤或专用时隙通道。它完全不经过公共国际海底光缆出口，因此在物理层面上没有任何防火墙设备审查，晚高峰丢包率为 0。\n- **IEPL (International Ethernet Private Line)**：国际以太网专线，在物理光纤上封装了二层以太网协议，具备更强大的动态带宽调度和多点冗余能力。\n**核心结论**：无论 IPLC 还是 IEPL，国内客户端连接到国内 BGP 入口后，数据包就直接进入了运营商的内部封闭网络跨境，**既不需要经过公共 GFW 过滤点，也不受公网骨干拥塞 QoS 限速的影响**，这就是大年三十晚高峰依然能跑满千兆的关键原因。',
    tags: ['IPLC', 'IEPL', '物理专线', '不过墙', '0丢包']
  },
  {
    id: 'tech-qos-traffic-shaping',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: '为什么市面上几块钱的公网中转机场，一到晚上八点半到十点半必然严重卡顿断流？',
    shortAnswer: '公网国际出口带宽超载，三大运营商对民用跨境流量强制执行骨干网 QoS 流量整形主动丢包。',
    detailedAnswer: '公网中转链路为：`本地宽带 ➔ 国内公网服务器 ➔ 公共国际海底光缆 (GFW) ➔ 海外机房`。\n在每天 20:30~22:30 的全民上网高峰期：\n1. **公共国际出口严重拥塞**：三大运营商的总跨境公网带宽是有限的。当出口链路满载时，路由器队列会触发 **QoS (Quality of Service) 丢包机制**，优先保障政企大客户带宽，普通民用境外连接的丢包率会飙升到 20%~45%。\n2. **深度数据包检测 (DPI) 阻断**：高峰期高频大流量传输会加剧特征识别，防火墙会动态下发 TCP RST 握手阻断重置包，导致你的长连接频繁被掐断转圈。',
    tags: ['QoS限速', '晚高峰卡顿', '公网中转', '骨干网丢包', 'DPI检测']
  },
  {
    id: 'tech-protocol-comparison',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: 'Shadowsocks、Trojan、VLESS-Reality 与 Hysteria2，哪种协议更适合我？',
    shortAnswer: '专线内网首选 Shadowsocks/Trojan（延迟最低）；恶劣公网直连首选 VLESS-Reality 或 Hysteria2。',
    detailedAnswer: '不同协议适用的网络传输场景各不相同：\n- **专线网络首选：Shadowsocks (SS) / Trojan**：由于 IEPL 专线全程在封闭内网跑，无需复杂的握手伪装。Shadowsocks 的加解密计算开销最小，软路由和手机发热量最低，单节点吞吐性能最强。\n- **公网直连抗封锁首选：VLESS-Reality**：Reality 技术彻底摒弃了传统的自签名证书，直接“借用”合规大公司（如苹果、微软）的真实公网证书和 SNI 握手，使防火墙的主动探测机制完全失效，是目前公网伪装度最高的协议。\n- **恶劣高丢包环境首选：Hysteria2 (基于 UDP)**：采用自研的拥塞控制算法，在丢包率高达 30% 的垃圾网络下依然能暴力跑满带宽，非常适合移动 4G/5G 弱信号环境。',
    tags: ['VLESS-Reality', 'Shadowsocks', 'Trojan', 'Hysteria2', '协议选型']
  },

  // 4. 新手基础认知 (Basics)
  {
    id: 'base-what-is-airport',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '“机场”这个称呼到底是怎么来的？它跟传统的 VPN 软件有何区别？',
    shortAnswer: '早年 Shadowsocks 客户端图标是一个纸飞机，提供节点订阅的服务商便被戏称为“机场”。它比传统 VPN 更轻量且支持智能分流。',
    detailedAnswer: '历史渊源与技术差异如下：\n- **名字由来的历史**：开源代理工具 Shadowsocks 最初的桌面客户端图标是一架轻盈的折纸飞机，后来社区开发者构建了基于该协议的商用多节点聚合分发平台，网友便形象地将其称为“提供纸飞机起飞落地的机场”。\n- **与传统 VPN (如 OpenVPN / WireGuard) 的本质区别**：传统企业级 VPN 会将整台电脑的所有数据全量加密并导向虚拟专用网，无法精准区分访问的是国内百度还是海外 Google，往往导致国内软件卡顿甚至无法定位。而现代“机场”基于 Socks5/HTTP 代理协议栈，结合分流规则集，可实现“海外流量走专线代理，国内流量毫秒级原路直连”的智能无感体验。',
    tags: ['机场称谓', 'Shadowsocks', 'VPN区别', '规则分流', '纸飞机']
  },
  {
    id: 'base-subscription-token-leak',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '什么是订阅链接 (Subscription URL)？如果不小心把它发到了公共群聊会有什么严重后果？',
    shortAnswer: '订阅链接包含你的账户密钥 Token，任何人拿到都能无限制盗刷你的套餐流量，甚至获取你的节点拓扑。',
    detailedAnswer: '订阅链接的内部机制如下：\n订阅链接通常长这样：`https://domain.com/api/v1/client/subscribe?token=a1b2c3d4...`。\n其中的 `token` 相当于你账户的免密码访问凭证。\n**如果意外泄露的后果**：\n1. 任何人将该链接导入客户端，都可以立刻获取你购买的所有专线节点，并肆无忌惮地消耗你的每月流量额度。\n2. 如果他人使用你的节点去从事爬虫、发布违规言论或进行扫描攻击，该节点很可能被服务器防火墙封禁，甚至连累你的机场账户被运营商直接清退。\n**紧急补救措施**：立刻登录机场后台用户中心，找到订阅信息模块，点击**“重置订阅密钥 (Reset Token)”**，旧链接将瞬间失效。',
    tags: ['订阅链接', 'Token泄露', '流量被盗', '重置订阅', '账户安全']
  },
  {
    id: 'base-node-multipliers',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '什么是节点倍率 (Multiplier)？为什么有些节点标着 0.2x，有些标着 3.0x？',
    shortAnswer: '倍率是计费乘数：0.2x 是流量打折（省流量但慢），3.0x 是流量翻倍扣除（通常是超快极速专线）。',
    detailedAnswer: '倍率直接决定了你的账户流量账单消耗速度：\n- **计算公式**：实际扣减流量 = 用户实际消耗数据量 × 节点倍率。\n- **0.2x ~ 0.5x 低倍率节点**：通常用于冷门大文件下载（如 BT 种子或海外开源数据集镜像）。这种节点成本低廉，带宽上限不高，你看完 10GB 视频，系统后台只扣减 2GB~5GB 额度。\n- **1.0x 标准倍率节点**：最常见的标准节点，消耗 1GB 扣减 1GB。\n- **3.0x ~ 8.0x 高倍率节点**：通常属于超低延迟的顶级物理专线或配备了极昂贵的原生住宅商宽出口。你看完 10GB 4K 视频，后台会直接扣除 30GB 甚至 80GB 额度。\n**避坑提醒**：购买套餐时必须看清楚节点倍率，谨防不良商家用“千兆 1000G 套餐”吸引你，但高速节点全部偷偷打上 5x 倍率标签的恶意超售行径。',
    tags: ['节点倍率', '流量计算', '0.2倍率', '3倍率刺客', '扣费规则']
  },

  // 5. 账单、支付与防坑选型 (Billing)
  {
    id: 'bill-why-no-alipay-direct',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '为什么很多优质机场不支持国内支付宝和微信直接收款，而是跳转到第三方发卡网或虚拟币？',
    shortAnswer: '国内直连企业商户对跨境代理行业实行绝对的合规风控封禁，使用跨境商户结算或 USDT 是长期生存的必然选择。',
    detailedAnswer: '支付渠道的深层逻辑：\n1. **国内支付牌照监管**：支付宝和微信财付通严格执行反电信网络诈骗与跨境外汇监管规定。任何涉及跨境未授权代理加速的服务，一旦被风控巡检扫描到，境内企业商户号会在 24 小时内被冻结资金并强制销户。\n2. **合规代付与第四方网关**：稳定运营多年的正规机场，普遍通过设立在境外（如中国香港、新加坡、英国）的合法离岸企业主体，接入国际合规支付网关或发卡结算平台，支持通过银联、信用卡或国际合规通道完成代收代付。\n3. **USDT 虚拟币优势**：对于极客与重度大流量用户，使用 USDT (TRC-20) 支付不仅能规避银行卡外汇限制，而且具备最高级别的匿名性与资金安全。',
    tags: ['支付宝收款', '微信风控', 'USDT支付', '第四方发卡', '支付安全']
  },
  {
    id: 'bill-permanent-packet-value',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '什么是“不限时流量包”？它跟传统的按月清零套餐相比，到底哪种更划算？',
    shortAnswer: '低频查资料、外贸出差备用首选“不限时流量包”；每天高强度追剧、下大文件首选大容量“月付套餐”。',
    detailedAnswer: '两者适合完全不同的用户画像：\n- **按月清零套餐的浪费**：传统套餐每月 20 元给 100G，但月底一到，没用完的 90G 会被强制清零重置。对于平时只要偶尔查文献、收发 Gmail、与海外客户聊两句 WhatsApp 的轻度用户，实际单 G 成本高得惊人。\n- **不限时流量包的真实性价比**：例如**光速云**推出的“147 元 / 247GB 永久不限时包”，流量永不过期清零，直接拉通 IEPL 企业级双专线。轻度办公用户这 247GB 专线可以用上一整年甚至两年，折算下来每个月成本不足 10 元钱，且彻底免去了每月底断费停机的焦虑。\n- **重度用户建议**：如果你每天全天候推流、挂直播或远程渲染，每月流量消耗超 500G，则大容量的常规月付套餐单价性价比更高。',
    tags: ['不限时包', '流量不清零', '光速云147', '月付对比', '性价比算账']
  },
  {
    id: 'bill-why-avoid-cheap-annual',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '为什么 Mitce 实验室一再强调“绝对不要购买九块九包年或几十元的终身会员”？',
    shortAnswer: '合规跨境专线千兆带宽月租高达数万元，超低价年付在数学逻辑上必定以爆仓拉闸跑路收场。',
    detailedAnswer: '这是反物理规律的典型资金盘模式：\n1. **刚性物理成本**：企业级 IPLC/IEPL 专线是运营商明码标价的优质资源，一千兆跨境带宽每月硬件与光纤成本至少 3 万至 6 万元人民币。\n2. **破产收割链条**：一个收你 9.9 元一年的用户，扣除支付网关 5%~10% 手续费，商家到手不到 9 块钱。要养活服务器必须超售数千倍。当涌入大量用户后，晚高峰必然全线瘫痪。面对用户的漫天退款与投诉，商家的最优解就是拔网线拉闸跑路，卷走资金池重新换壳开新站。\n3. **黄金法则**：宁可选择大厂 5~8 元一个月的按月付，也绝不贪小便宜上车任何低于 50 元的包年/终身灵车。',
    tags: ['包年陷阱', '九块九包年', '跑路资金盘', '终身VIP', '带宽成本']
  },

  // 6. 隐私安全与合规边界 (Compliance)
  {
    id: 'comp-can-airport-see-my-passwords',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '使用机场代理节点时，机场老板或服务器运维能看到我浏览的具体网页、聊天记录或账号密码吗？',
    shortAnswer: '绝无可能。现代互联网全部采用端到端 HTTPS / TLS 加密，中间节点只能看到你访问的目标域名 IP，看不到任何传输正文。',
    detailedAnswer: '网络加密分层原理解析：\n1. **TLS / HTTPS 端到端加密**：当你在浏览器打开银行网站、Google 或 Telegram 时，你的电脑本地直接与目标海外服务器建立非对称密钥协商。数据在离开你电脑那一刻就已经被高强度加密。\n2. **机场服务器能看到什么？**：节点作为中间传输跳板，只能在数据包外层看到你正在与哪个 IP（例如 Google 的某个 CDN 服务器 IP）进行数据通信，以及传输的数据包大小和流量时间。\n3. **机场服务器绝对看不到什么？**：看不到你输入的任何账号密码、信用卡 CVV、网页浏览的具体文章内容或即时通讯聊天内容。除非你在本地手动强行安装了机场提供的不可信根证书（正规机场绝不会要求用户安装任何根证书）。',
    tags: ['密码泄露', 'HTTPS加密', '端到端安全', '中间人攻击', '隐私保护']
  },
  {
    id: 'comp-personal-compliance-boundary',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '普通个人用户用于日常外贸办公、学术科研学习或跨境电商，合规安全的红线在哪里？',
    shortAnswer: '恪守“纯粹技术与业务使用”底线，严禁浏览、传播、散布任何涉及政治谣言、低俗有害或危害公共安全的信息。',
    detailedAnswer: '合规安全防护三原则：\n1. **业务自律准则**：网络技术本身是中立的生产力工具。用于跨境电商店铺运营（亚马逊、Shopee）、外贸客户邮件洽谈、海外前沿学术论文（IEEE、arXiv）查阅及开源技术开发（GitHub、Docker、HuggingFace）属于正常正当的商业与学习需求。\n2. **绝对安全红线**：严禁在任何海外社交平台、论坛发布或转发涉及政治敏感言论、散布谣言、参与网络攻击或浏览不良有害信息。网络空间并非法外之地，技术协议必须用于正当合法的价值创造。\n3. **账号实名与资金隔离**：避免在公共免费节点登录涉及资金交易的敏感账户，优先选用具备企业级信誉与高可用专线保障的商业服务。',
    tags: ['合规底线', '外贸办公', '学术科研', '法律边界', '网络安全']
  }
];
