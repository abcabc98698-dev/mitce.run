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
  { id: '', label: '全部问答 (83条)' },
  { id: 'troubleshooting', label: '高频故障急救 (16)' },
  { id: 'ai_streaming', label: 'AI与流媒体防封 (15)' },
  { id: 'tech', label: 'IEPL专线与协议 (14)' },
  { id: 'basics', label: '新手基础认知 (13)' },
  { id: 'billing', label: '账单与防坑选型 (13)' },
  { id: 'compliance', label: '隐私安全与合规 (12)' }
];

export const faqItems: FAQItem[] = [
  // ==========================================
  // 1. 高频故障急救 (Troubleshooting) - 16 Items
  // ==========================================
  {
    id: 'ts-all-nodes-timeout',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '导入订阅后，客户端测速所有节点全部显示“-1ms”或“连接超时”，怎么排查？',
    shortAnswer: '90% 是本地系统时间不准、订阅链接被拦截或杀毒软件阻断内核运行引起。',
    detailedAnswer: '测速全部超时（全红）通常按照以下四步逐一排查：\n1. **校准系统时间（最常见原因）**：现代代理协议（如 VLESS-Reality、VMess、Trojan）使用 TLS 握手与时间戳校验。若本地时间与标准北京时间误差超过 60 秒，服务端握手包会直接被静默丢弃。在 Windows/Mac 设置中关闭并重新开启“自动同步时间”即可瞬间恢复。\n2. **更新订阅链接**：检查订阅地址是否过期。在客户端右键订阅选择“更新”，查看是否能拉取到最新节点。\n3. **检查杀毒软件防火墙**：火绒或 Windows Defender 可能会拦截内核（如 mihomo.exe 或 xray.exe）创建虚拟适配器，建议将代理客户端文件夹加入信任白名单。\n4. **入口 DNS 污染**：某些地区宽带运营商对机场的国内中转域名做了 DNS 投毒，可以在客户端全局 DNS 设置中强制配置公共安全 DNS（如 119.29.29.29 或 223.5.5.5）。',
    tags: ['超时', '节点全红', '系统时间', '握手失败', '-1ms']
  },
  {
    id: 'ts-domestic-web-broken',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '开启代理后，海外网站能正常打开，但国内微信图片发不出、百度淘宝打不开或极慢？',
    shortAnswer: '路由分流规则错误（被误设为了“全局模式 Global”），请切换为“规则模式 (Rule)”并排查 DNS。',
    detailedAnswer: '这是分流配置错乱导致的典型症状：\n1. **切换为规则模式 (Rule Mode)**：如果你不小心把代理模式从“Rule (规则)”切换成了“Global (全局)”，那么连访问国内百度、知乎、淘宝的数据包也会被强行送往香港或美国海外节点再绕回国内，造成巨大的延迟甚至被国内网站的海外风控拦截。\n2. **检查分流规则集**：确保客户端启用了针对 GEOIP,CN 和 GEOSITE,CN 的 DIRECT (直连) 规则。\n3. **本地 DNS 抢答与环路**：若在软路由上开启了 Fake-IP，请检查国内域名 DNS 服务器是否正确设置为本地运营商 DNS 或腾讯 DNSPod（119.29.29.29），避免将国内请求转发给海外 8.8.8.8 导致 CDN 调度跑偏。',
    tags: ['国内打不开', '全局模式', '规则分流', '微信发图慢', '淘宝加载失败']
  },
  {
    id: 'ts-terminal-git-timeout',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '为什么浏览器打开海外网站飞快，但是在 cmd、PowerShell 或 Linux 终端跑 git clone 依然报错超时？',
    shortAnswer: '命令行开发工具（Git / npm / Docker / curl）默认不读取 Windows/Mac 的系统代理设置。',
    detailedAnswer: '操作系统的“系统代理 (System Proxy)”本质上只是写在注册表里的一个变量，绝大多数命令行开发工具为了保证运行独立性，都会主动忽略系统代理设置，依然发起本地直连。\n两种终极解决方案：\n1. **方案一（强烈推荐）：开启 TUN 虚拟网卡模式**：在 Clash Verge Rev 或 sing-box 中安装服务模式并开启 TUN 模式。TUN 模式会在系统内核层虚拟出一张物理网卡，接管整台电脑所有进程的流量，命令行和容器无需任何配置即可自动走代理。\n2. **方案二：临时注入环境变量**：在 PowerShell 中执行以下命令（假设客户端本地混合端口为 7897）：\n$env:http_proxy="http://127.0.0.1:7897"\n$env:https_proxy="http://127.0.0.1:7897"\n对于 Git，也可以执行单次配置：git config --global http.proxy http://127.0.0.1:7897。',
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
    detailedAnswer: '当客户端在后台被强制结束进程或电脑意外关机时，写入系统的代理状态未能正常注销：\n1. **重置 Windows 代理设置**：按 Win+I 打开“系统设置” ➔ 进入“网络和 Internet” ➔ 点击“代理” ➔ 将“使用代理服务器”开关手动切换为关。\n2. **重置网络协议栈并清空 DNS 缓存**：以管理员身份打开 PowerShell，执行以下两行命令并回车：\nnetsh winsock reset\nipconfig /flushdns\n3. **重启电脑**：通常执行完上述步骤后，网络解析会立即恢复正常。',
    tags: ['没网了', '打不开网页', '重置代理', 'flushdns', '无法上网']
  },
  {
    id: 'ts-clash-service-mode-fail',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: 'Clash Verge Rev 里的“服务模式 (Service Mode)”安装失败或一直显示灰色，怎么办？',
    shortAnswer: '缺少管理员提权、杀毒软件拦截服务注册或旧版 Clash 残留服务冲突。',
    detailedAnswer: '解决服务模式无法安装的标准流程：\n1. **以管理员身份运行客户端**：彻底退出 Clash Verge Rev，在桌面图标右键选择“以管理员身份运行”。\n2. **检查杀毒软件拦截日志**：查看火绒、360 或 Windows Defender 是否将 `clash-verge-service.exe` 列入拦截列表，手动添加为信任信任。\n3. **清理旧残留服务**：以管理员身份打开 cmd，执行 `sc stop clash_verge_service` 然后执行 `sc delete clash_verge_service`，将旧的损坏服务彻底注销，再重新打开客户端点击 Install 即可一次成功。',
    tags: ['服务模式', 'Service Mode', 'TUN启动失败', '权限不足', '管理员运行']
  },
  {
    id: 'ts-wechat-voice-call-delay',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '为什么开启代理后，微信语音/视频通话延迟特别高甚至频繁重连？',
    shortAnswer: '微信语音属于 UDP 直连通信，若被分流规则误判送往海外代理节点，会导致巨大的物理绕路。',
    detailedAnswer: '微信的音视频通话使用的是基于 UDP 协议的私有 VoIP 编码：\n1. **原因分析**：微信会通过 STUN 服务器尝试与通话对端建立 P2P 握手。如果分流规则不完善，将微信的某些 UDP 端口（如 10000~20000）转发到了海外香港或美国节点，语音数据包就会在跨境海缆上跑一个来回，导致通话延迟高达 500ms 以上甚至断线。\n2. **解决配置**：在客户端配置文件的规则列表最顶部，显式添加规则：`GEOIP,CN,DIRECT` 与 `GEOSITE,weixin,DIRECT`，确保所有腾讯与微信国内服务器流量 100% 走本地直连，完全不经过任何代理节点。',
    tags: ['微信通话卡顿', '语音延迟', 'P2P直连', 'UDP绕路', '分流白名单']
  },
  {
    id: 'ts-game-steam-epic-login',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: 'Steam / Epic 登录报错或商店打不开，游戏加速器和代理客户端怎么同时共存？',
    shortAnswer: '代理客户端负责商店网页与社区分流，游戏加速器负责游戏进程；开启 TUN 模式时需排除加速器虚拟网卡。',
    detailedAnswer: '很多游戏玩家同时运行 UU 加速器和 Clash 时会出现断网：\n1. **功能定位分清**：科学上网客户端擅长解决 Steam 商店打不开、社区创意工坊加载慢等 TCP 网页流量；而游戏加速器针对的是特定游戏进程的 UDP 竞技降延迟。\n2. **网卡优先级冲突**：如果同时开启 Clash TUN 模式和游戏加速器，两张虚拟网卡会争夺默认网关路由表。推荐方案是在 Clash Verge 中设置进程白名单排除加速器进程，或者在玩联机对战时暂时将客户端切换为普通“系统代理 (System Proxy)”模式，把底层虚拟网卡控制权留给游戏加速器。',
    tags: ['Steam打不开', '游戏加速器冲突', 'UU加速器', '网卡抢占', 'Epic登录']
  },
  {
    id: 'ts-mac-tun-permission',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: 'macOS 开启 TUN 模式提示“需要系统扩展权限 / Helper Tool 失败”，如何授权？',
    shortAnswer: 'macOS 严格的安全机制限制了未签名内核网卡驱动，需在系统设置中手动允许系统扩展。',
    detailedAnswer: '在 Mac 上配置 TUN 权限的标准步骤：\n1. 打开“系统设置” ➔ 进入“隐私与安全性” ➔ 滚动到底部，找到“来自开发者或系统软件的扩展已被阻止”提示，点击“允许”。\n2. 若提示 Helper Tool 安装失败，可在终端执行命令重置权限：`sudo chown root:admin /Library/PrivilegedHelperTools`。\n3. 重启 Clash Verge Rev 并重新开启 TUN 开关，系统会弹出钥匙串密码输入框，输入 Mac 开机密码确认授权即可永久生效。',
    tags: ['macOS', '系统扩展', 'TUN权限', 'Helper Tool', '隐私与安全性']
  },
  {
    id: 'ts-android-battery-sleep',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '安卓手机锁屏后 v2rayNG / FlClash 经常自动断流，点亮屏幕才重新恢复？',
    shortAnswer: '国内定制安卓系统（MIUI / OriginOS / ColorOS）的激进省电策略杀死了后台代理服务。',
    detailedAnswer: '解决安卓后台被杀的三步设置：\n1. **关闭电池优化**：进入手机设置 ➔ 应用管理 ➔ 找到代理应用 ➔ 省电策略选择“无限制 (Don\'t optimize)”。\n2. **允许后台自启动与关联唤醒**：在应用权限中开启“允许后台运行”、“允许自启动”。\n3. **多任务界面加锁**：划出手机的多任务后台任务列表，长按应用卡片点击小锁图标将其“锁定”，防止一键清理内存时被系统杀掉。',
    tags: ['安卓断连', '后台被杀', '电池优化', '锁屏断网', 'v2rayNG保活']
  },
  {
    id: 'ts-ios-vpn-disconnect',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: 'iPhone 锁屏后 Shadowrocket 状态栏 VPN 图标消失，如何保持后台长效不掉线？',
    shortAnswer: '开启 Shadowrocket 的“按需连接 (On-Demand)”功能，由 iOS 系统层级驱动自动保活。',
    detailedAnswer: 'iOS 系统为了极致省电，会在息屏进入深度睡眠后挂起第三方网络进程：\n1. **开启 On-Demand**：在 Shadowrocket 设置中找到“按需连接”，将其打开，并设置为“Wi-Fi 与蜂窝数据均保持连接”。\n2. **低电量模式影响**：当 iPhone 开启“低电量模式”时，系统会强制切断后台网络心跳，尽量避免在低电量模式下进行大流量长连接挂机。\n3. **重置 VPN 描述文件**：若仍偶发断连，可在 iOS“设置” ➔ “通用” ➔ “VPN 与设备管理”中删除小火箭生成的旧描述文件，然后回到小火箭重新开关一次生成全新配置。',
    tags: ['iOS断流', '小火箭后台', 'On-Demand', '按需连接', 'VPN图标消失']
  },
  {
    id: 'ts-sub-update-fail',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '客户端更新订阅提示“Download profile failed”或“Invalid YAML syntax”，怎么解决？',
    shortAnswer: '订阅链接中的节点包含特殊字符导致 YAML 语法解析失败，或机场订阅分发域名被运营商阻断。',
    detailedAnswer: '排查与恢复手段：\n1. **尝试开启已有代理后更新**：有些机场的订阅下发服务器位于海外，如果你的本地网络已经无法直连该网址，可以先连上任意一个旧节点，在客户端勾选“更新订阅走代理”即可顺利拉取最新配置。\n2. **复制链接到浏览器手动下载**：将订阅链接直接粘贴到 Chrome 地址栏回车，看是否能下载到一个文本文件。若提示 502/504 说明是机场后端服务器故障，需联系客服。\n3. **使用私有 Subconverter 规范化**：如果下载的文件格式有误，可通过本地订阅转换器将其转换为纯净标准的 Clash.Meta 配置再导入。',
    tags: ['订阅更新失败', 'Invalid YAML', '502报错', '更新配置', 'Profile Failed']
  },
  {
    id: 'ts-dns-leak-webrtc-check',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '如何使用命令行或在线工具快速验证自己的网络是否存在 DNS 污染或泄露？',
    shortAnswer: '通过 nslookup 查询海外被污染域名，或访问 dnsleaktest.com 进行 Standard Test。',
    detailedAnswer: '精准验证方法：\n1. **命令行验证**：打开 cmd 执行 `nslookup twitter.com 114.114.114.114`。如果返回的 IP 属于无关地址（如虚假保留地址），说明本地 DNS 受到污染；若开启代理后执行 `curl https://ipinfo.io` 返回的是海外节点 IP，说明分流生效。\n2. **在线图形化检测**：访问 `https://www.dnsleaktest.com` 点击 Standard Test。如果页面中出现的 DNS 服务器列表清一色位于节点所在机房（如 Cloudflare / Google / 美国机房），则属于安全；若列表中出现中国移动、中国电信等国内省份节点，说明存在严重 DNS 泄漏。',
    tags: ['DNS泄露', 'nslookup', 'DNS污染', '安全排查', 'ipinfo']
  },
  {
    id: 'ts-openclash-fakeip-conflict',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '软路由开启 OpenClash 的 Fake-IP 模式后，智能家居设备（米家/天猫精灵）无法配网离线？',
    shortAnswer: '智能硬件固件依赖固定内网广播与特定国内 NTP 服务器，被 Fake-IP 拦截后无法识别内网 IP。',
    detailedAnswer: '软路由 Fake-IP 冲突的经典化解方案：\n1. **配置绕过 MAC 地址白名单**：在 OpenClash 高级设置中，找到“绕过设备 (Bypass Hosts)”或“客户端过滤”，将扫地机器人、空调伴侣、天猫精灵等智能家居设备的本地 MAC 地址添加到直连白名单中，让其流量完全不经内核直接出局域网。\n2. **将常用国内 NTP 服务器加入黑名单**：在自定义 DNS 设置中，将 `ntp.aliyun.com` 与 `time.apple.com` 加入直连解析，防止时钟不同步导致设备掉线。',
    tags: ['OpenClash', 'Fake-IP冲突', '智能家居离线', '软路由分流', 'MAC白名单']
  },
  {
    id: 'ts-browser-ssl-handshake-err',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '访问网页报错“ERR_SSL_PROTOCOL_ERROR”或提示证书不受信任，怎么排除？',
    shortAnswer: '客户端误开启了未授权的 MitM 抓包解密，或本地系统时间错误导致 SSL 证书有效期校验失败。',
    detailedAnswer: '解决证书报错的三板斧：\n1. **关闭客户端 MitM 开关**：检查客户端设置中是否勾选了“HTTPS 解密 / MitM”。除非你在进行合法的网络抓包调试，否则正规代理绝不需要在系统注入自定义根证书。\n2. **检查电脑系统年份**：若主板电池没电导致电脑时间倒流回数年前，所有现代网站的有效证书都会被判定为“尚未生效”而拒绝连接。\n3. **清理浏览器 HSTS 缓存**：在 Chrome 地址栏输入 `chrome://net-internals/#hsts`，在底部将报错域名的安全策略删除后重试。',
    tags: ['SSL报错', '证书错误', 'MitM', 'HTTPS解密', '系统时间']
  },
  {
    id: 'ts-udp-nat-type-strict',
    category: 'troubleshooting',
    categoryName: '高频故障急救',
    question: '客户端测速显示节点的 NAT 类型为“Strict (对称型 NAT)”，会对上网有什么实际影响？',
    shortAnswer: '对日常网页浏览、看 4K 视频毫无影响；仅对 Switch/PS5 主机 P2P 联机和特定 BT 下载有轻微限制。',
    detailedAnswer: 'NAT 类型详解：\n- **Full Cone NAT (全锥型)**：允许外部任意地址主动向内部建立通信，非常适合 Nintendo Switch、PlayStation 联机组队，不容易出现联机掉房或连不上好友。\n- **Symmetric NAT (对称型 NAT)**：安全性极高，但对 P2P 直连打洞非常苛刻。很多企业级专线为了防止节点被黑客利用发起分布式放大攻击，会在防火墙上限制 UDP 端口随意暴露。\n- **日常体验**：访问 Google、看 YouTube、刷推特或使用 ChatGPT 完全依赖 TCP/HTTP 握手，与 NAT 类型没有任何关联。',
    tags: ['NAT类型', 'Full Cone', '主机联机', 'Switch联机', 'UDP打洞']
  },

  // ==========================================
  // 2. AI 生产力与流媒体防封 (AI & Streaming) - 15 Items
  // ==========================================
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
    detailedAnswer: 'WebRTC（网页实时通信技术）原本是用来视频会议和 P2P 传输的。为了穿透复杂的家庭路由器 NAT，它会通过 STUN 服务器探针直接获取你本地物理网卡的真实公网 IP。\n**致命封号链**：\n当你在 Chrome 打开 ChatGPT 时，虽然你的网页请求头挂着美国洛杉矶的代理 IP，但 Cloudflare 页面脚本运行 WebRTC 探针后，在 0.1 秒内就获取到了你本地电信或联通的中国真实公网 IP。这种“请求来自美国，但物理网卡来自中国”的绝对矛盾，会被直接标记为“高风险代理挂马”，轻则拒绝访问，重则在 24 小时内由系统自动注销账号。\n**根治手段**：开启 TUN 模式或在浏览器安装 WebRTC Control 插件彻底禁用 WebRTC。',
    tags: ['WebRTC泄漏', '封号原因', 'STUN探针', '指纹识别', '真实IP']
  },
  {
    id: 'ai-claude-phone-sms-error',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: 'Claude 3.5 Sonnet 注册与登录时提示“App not available in your country”，该如何彻底解决？',
    shortAnswer: '除了确保节点纯净外，必须清理浏览器 Cookie、锁定单一落地节点并使用干净的海外真实手机号。',
    detailedAnswer: 'Anthropic 对 Claude 的风控审查甚至比 OpenAI 还要严厉苛刻：\n1. **严禁频繁更换节点国家**：十分钟前用日本节点登录，五分钟后自动切换到英国节点，这种跨时区漂移会立刻触发死锁风控。办公时务必将客户端固定在一条稳定的专线节点（如美国或新加坡）。\n2. **彻底清理浏览器缓存**：在访问之前，必须彻底清理本地浏览器对 claude.ai 和 anthropic.com 的所有 LocalStorage 与 IndexedDB 数据，或直接在无痕隐私窗口下使用。\n3. **海外手机号接码禁忌**：严禁使用 Google Voice 虚拟号或烂大街的公共接码平台。必须使用正规实体卡（如英国 giffgaff、美国无合约实体卡）接码验证。',
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
  {
    id: 'ai-gemini-workspace-access',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '访问 Google Gemini 时提示“Gemini isn\'t currently supported in your country”，该怎么处理？',
    shortAnswer: 'Google 会联动读取你的 Google 账号注册归属地、浏览器语言及当前 IP 所在地区。',
    detailedAnswer: '解决 Gemini 地区报错的核心技巧：\n1. **IP 落地必须避开非支持区**：确保当前使用的代理节点位于美国、日本、新加坡或英国，避开中国香港节点（Google 服务通常不在香港对等开放 Gemini 全功能）。\n2. **检查 Google 账户区域**：如果你的 Google 账户曾经绑定了国内手机号且区域被锁死在中国大陆，即便挂了美国节点也会报错。建议注册一个纯净的美区 Google 账号。\n3. **修改浏览器语言偏好**：将 Chrome 的首选语言调整为 `English (United States)`，防止中文浏览器头被直接过滤。',
    tags: ['Gemini', 'Google AI', '地区不支持', '美区账号', '语言指纹']
  },
  {
    id: 'ai-midjourney-discord-ban',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '使用公共机场节点访问 Discord 玩 Midjourney 绘图，为什么会被频繁要求人机验证甚至封禁？',
    shortAnswer: '万人骑节点的出口 IP 上存在大量脚本机器人刷注册，被 Discord 官方 Cloudflare 防火墙判定为高危群组。',
    detailedAnswer: 'Discord 对高并发公网出口的风控机制非常严苛：\n如果在同一个机场节点上，有数十名甚至上百名用户同时向 Discord 发送消息，Discord 会认定该 IP 为僵尸网络集群，频繁下发 hCaptcha 验证码。如果同一 IP 连续出现多次触发验证失败，该 IP 段上的所有登录会话都会被强制登出并要求手机短信解封。建议在访问 Discord 时挑选连接人数较少的高端冷门专线。',
    tags: ['Midjourney', 'Discord验证', '人机验证', 'hCaptcha', '出口污染']
  },
  {
    id: 'ai-openai-api-rate-limit',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '调用 OpenAI 官方 API 频繁出现 429 Too Many Requests 报错，是节点问题还是账户问题？',
    shortAnswer: '429 包含两种情况：一是当前节点出口 IP 的全局并发超载，二是 API Key 绑卡层级的 RPM/TPM 额度受限。',
    detailedAnswer: '排查 429 报错的诊断方法：\n1. 查看返回的 JSON 报错主体：如果是 `Rate limit reached for requests`，说明是你账户所在 Tier 等级（Tier 1 每分钟请求限制）用尽，需要向 OpenAI 充值提升层级。\n2. 如果代码刚刚跑第一条请求就报 429，通常是该出口 IP 已经被其他脚本刷爆，触发了 Cloudflare 针对 IP 维度的防护拦截。在代码配置中将代理服务器切换为独享专线出口，即可彻底恢复稳定调用。',
    tags: ['OpenAI API', '429报错', 'Rate Limit', 'RPM限制', 'API调用失败']
  },
  {
    id: 'ai-disney-plus-login-loop',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: 'Disney+ 登录后一直转圈或者弹出“Error Code 83”，无法播放任何内容？',
    shortAnswer: 'Disney+ 检测到了 IPv6 泄漏或使用了被列入黑名单的数据中心机房 IP。',
    detailedAnswer: '针对 Disney+ 的排障指南：\n1. **关闭本地 IPv6**：Disney+ 对双栈网络极其敏感，国内电信/联通宽带分配的 IPv6 地址会直接绕过 IPv4 代理发起直连，导致 Disney+ 判定你在非服务区。在客户端全局设置中关闭 IPv6 解析。\n2. **更换支持 Disney+ 的原生流媒体节点**：Disney+ 的机房封锁甚至比 Netflix 还要激进，一般的公网中转节点极易被其判定为 Proxy。请选用带有“流媒体解锁”标识的专线节点。',
    tags: ['Disney+', 'Error Code 83', '转圈加载', 'IPv6泄露', '流媒体报错']
  },
  {
    id: 'ai-spotify-region-change',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: 'Spotify 提示“您只能在海外使用 14 天”，如何才能永久锁定免费版区域？',
    shortAnswer: '每隔 14 天用对应国家的节点登录一次 Spotify 网页版刷新定位，或直接升级为家庭组 Premium。',
    detailedAnswer: 'Spotify 免费账号的漫游机制：\nSpotify 规定免费版用户在非注册国家最多只能漫游使用 14 天。解决方式非常简单：打开浏览器挂上你账号注册国家（如美区或菲律宾）的专线节点，登录 `spotify.com` 网页端个人中心，点击“保存个人资料”，系统就会重新刷新你当地的 14 天漫游计时。如果加入正规的 Family 家庭组会员，则完全不受 14 天限制。',
    tags: ['Spotify', '14天限制', '地区限制', '个人资料', '流媒体刷新']
  },
  {
    id: 'ai-hulu-hbo-geo-block',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '打开 Max (HBO Max) 或 Hulu 弹出“Geo-blocked”拦截提示，如何解决？',
    shortAnswer: 'Max 和 Hulu 实行极严苛的美国家宽白名单审查，普通商业机房 IP 100% 被拦截。',
    detailedAnswer: '解决美区核心影视流媒体的方案：\n1. 必须使用经过住宅宽带（Residential ISP）标记的美区原生节点。这些 IP 归属于 AT&T、Verizon、Comcast 等美国民用宽带运营商。\n2. 清除浏览器对 `max.com` 和 `hulu.com` 的本地 Cookie，并开启客户端的 TUN 模式以防 DNS 逆向解析被识破。',
    tags: ['Max', 'HBO', 'Hulu', 'Geo-blocked', '住宅宽带']
  },
  {
    id: 'ai-residential-vs-datacenter',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '原生住宅 IP (Residential IP) 和机房 IP (Datacenter IP) 在风控底层到底有什么差别？',
    shortAnswer: '住宅 IP 拥有民用家庭宽带 ASN 背书，欺诈分通常低于 15 分；机房 IP 属于服务器托管，欺诈分高达 70 分以上。',
    detailedAnswer: '全球反欺诈数据库的核心评分原理：\n- **机房 IP (Datacenter ASN)**：归属于亚马逊 AWS、微软 Azure、甲骨文、DigitalOcean 等。大模型与银行风控一律默认“正常自然人不会住在机房里上网”，因此一律赋予极高的欺诈分（Fraud Score 70~99）。\n- **原生住宅 IP (ISP ASN)**：归属于当地电信运营商分配给家庭的动态 IP。风控脚本会判定其为真实的海外居民日常流量，因此在访问 ChatGPT、Claude、PayPal 时享有绝对最高的白名单信任等级。',
    tags: ['原生IP', '住宅IP', '机房IP', 'Fraud Score', '欺诈分']
  },
  {
    id: 'ai-claude-session-stability',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '为什么在同一个对话里反复切换节点容易触发 Claude 封号？',
    shortAnswer: 'Cloudflare 跨大洲会话签名校验机制判定会话发生物理不可能的瞬移，直接触发死锁防护。',
    detailedAnswer: '会话稳定性要求：\n当你登录 Claude 时，服务端下发的 Session Token 会与发起请求的初始 ASN 运营商与地理位置绑定。如果你在客户端开启了“自动按延迟轮询”功能，前一条消息发自美国圣何塞，后一条消息因为延迟抖动切到了英国伦敦，系统安全逻辑会判定该账户遭遇了黑客中间人会话劫持（Session Hijacking），从而瞬间冻结账户。办公时切记锁定单一落地节点。',
    tags: ['Claude封号', 'Session漂移', '会话劫持', '固定节点', '负载均衡禁忌']
  },
  {
    id: 'ai-tiktok-zero-views',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '运营海外版 TikTok 发视频播放量始终为 0，是节点 IP 的问题吗？',
    shortAnswer: '80% 是因为节点被系统识别为非本地机房代理，导致视频被压入底层沙盒限流。',
    detailedAnswer: 'TikTok 运营的环境要求极高：\n1. **硬件环境伪装**：手机必须拔除国内 SIM 卡，关闭系统定位服务，将手机时区、语言彻底修改为目标国家。\n2. **节点原生度至关重要**：TikTok 对上传视频的创作者实行严格的本地原生 IP 校验。如果是廉价中转节点的机房 IP，系统会判定你在跨国批量矩阵搬运，视频根本不会被推送到 For You 推荐流中，必须采用双 ISP 原生住宅专线。',
    tags: ['TikTok', '0播放', '拔卡伪装', '创作者限流', '原生双ISP']
  },
  {
    id: 'ai-fingerprint-canvas-audio',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '除了节点 IP 之外，浏览器指纹（Canvas / WebGL / AudioContext）会暴露真实身份吗？',
    shortAnswer: '会。即便挂着干净的代理，现代网站仍能通过硬件渲染指纹识别出你是在同一台设备上多开小号。',
    detailedAnswer: '浏览器指纹技术细节：\nCanvas 指纹通过命令浏览器后台渲染一段微小的隐藏图形，不同电脑的显卡驱动、操作系统字体抗锯齿都会产生独一无二的哈希值。大模型服务商利用此技术识别批量注册工作室。对于日常个人使用，普通浏览器无需过度惊慌；但若需要多账号矩阵开发，建议使用专业的指纹防关联浏览器。',
    tags: ['浏览器指纹', 'Canvas指纹', 'WebGL', '多开防关联', '硬件特征']
  },
  {
    id: 'ai-apple-id-foreign-region',
    category: 'ai_streaming',
    categoryName: 'AI与流媒体防封',
    question: '注册美区 Apple ID 时提示“无法完成您的请求”，该如何搭建纯净注册环境？',
    shortAnswer: '全程开启美国纯净节点，使用无痕浏览器在苹果官网注册，并在付款方式处保持选择“None”。',
    detailedAnswer: '美区 Apple ID 注册要点：\n1. 不要直接在 iPhone 的 App Store 里注册新号，很容易在短信验证环节卡死。必须在电脑端使用 Chrome 隐身模式访问 `appleid.apple.com`。\n2. 挂上美国优质专线节点，账单地址推荐填写真实的美区免税州地址（如俄勒冈州 Oregon 或特拉华州 Delaware 的邮编与街道）。付款方式千万不要乱绑国内信用卡，选择 None 即可顺利完成创建。',
    tags: ['美区Apple ID', '免税州地址', '付款方式None', '小火箭下载', 'App Store']
  },

  // ==========================================
  // 3. IEPL 专线与底层技术 (Tech) - 14 Items
  // ==========================================
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
    detailedAnswer: '公网中转链路为：本地宽带 ➔ 国内公网服务器 ➔ 公共国际海底光缆 (GFW) ➔ 海外机房。\n在每天 20:30~22:30 的全民上网高峰期：\n1. **公共国际出口严重拥塞**：三大运营商的总跨境公网带宽是有限的。当出口链路满载时，路由器队列会触发 QoS (Quality of Service) 丢包机制，优先保障政企大客户带宽，普通民用境外连接的丢包率会飙升到 20%~45%。\n2. **深度数据包检测 (DPI) 阻断**：高峰期高频大流量传输会加剧特征识别，防火墙会动态下发 TCP RST 握手阻断重置包，导致你的长连接频繁被掐断转圈。',
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
  {
    id: 'tech-bgp-multi-carrier-inbound',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: '什么是 BGP 三网入口？为什么电信/联通/移动三网直连能够显著降低延迟？',
    shortAnswer: 'BGP 拥有多运营商自治系统互联能力，电信用户走电信入口、联通走联通入口，杜绝跨网拥堵。',
    detailedAnswer: '国内不同运营商之间的互联互通带宽受到严格结算限制。如果一家机场只有移动单线机房入口，电信用户连接时必须先经过电信-移动互联交换中心，不仅会额外增加 20ms~40ms 的延迟，而且极易在晚高峰跨网拥塞丢包。成熟机场配置多线 BGP 入口，能够利用 Anycast 路由技术让不同宽带用户直接接入就近的最优内网机房。',
    tags: ['BGP入口', '三网直连', '跨网结算', '动态路由', '延迟优化']
  },
  {
    id: 'tech-dual-line-failover',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: '什么是“双专线冗余 (Dual-Line Failover)”？单专线遇到海底地震断网会怎样？',
    shortAnswer: '双专线同时铺设不同路由路径的海底光缆与陆缆，一条发生物理切断时另一条毫秒级无感热备接管。',
    detailedAnswer: '国际专线并非绝对不会坏。南海台风、海底地震或市政施工常会导致海底光缆发生物理断裂。普通单专线机场此时就会陷入数天完全瘫痪状态。高端服务商（如**光速云**）采用“IEPL + 企业内网”双重物理架构，分别走不同出口路径（如一条经粤港陆缆，另一条走沪日海缆），由 BGP 路由器实现双活负载与自动熔断容灾，保障 99.9% 以上年化可用性。',
    tags: ['双专线', '海缆断裂', '容灾冗余', 'Failover', '光速云架构']
  },
  {
    id: 'tech-hysteria2-udp-blocking',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: 'Hysteria2 协议基于 UDP，为什么在部分省份宽带下会被运营商降速限速？',
    shortAnswer: '部分省份电信/移动对未知高频 UDP 流量执行激进的 QoS 丢包限速策略。',
    detailedAnswer: 'Hysteria2 采用自研拥塞控制算法跑在 UDP 之上，速度极快。但国内部分地市运营商为了打击私设 P2P CDN 和游戏私服，对非标准端口的持续大流量 UDP 实施严格限速，超过一定阈值就主动丢包 50% 以上。应对策略是在客户端启用端口跳跃（Port Hopping）功能，每隔一段时间动态更换连接端口以规避监测。',
    tags: ['Hysteria2', 'UDP限速', '运营商QoS', '端口跳跃', 'Port Hopping']
  },
  {
    id: 'tech-tuic-protocol-intro',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: '什么是 TUIC 协议？它和 Hysteria2 相比有哪些异同？',
    shortAnswer: '两者均跑在 QUIC (UDP) 之上，TUIC 侧重于原生 0-RTT 极速握手，Hysteria2 侧重于恶劣丢包下的吞吐抢夺。',
    detailedAnswer: '协议底层区别：\n- **TUIC**：完全基于标准 IETF QUIC 协议构建，旨在最小化上下文握手延迟，首包响应速度极快，在网络质量良好的跨境线路上握手延迟体验与直连无异。\n- **Hysteria2**：魔改了拥塞控制机制，对丢包不敏感，属于“进攻型”协议，在垃圾骨干公网上抢带宽能力极强。在专线内网中，两者差距不大。',
    tags: ['TUIC', 'QUIC协议', '0-RTT', '低延迟', 'Hysteria对比']
  },
  {
    id: 'tech-tcp-bbr-congestion',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: 'Linux 内核开启 BBR 拥塞控制算法，对科学上网有什么实际加速效果？',
    shortAnswer: 'BBR 能有效摆脱传统 CUBIC 算法将丢包误判为拥塞的致命缺陷，让远距离长海缆链路跑满千兆带宽。',
    detailedAnswer: '传统 TCP CUBIC 算法只要检测到 1% 的丢包，就会主动将发送窗口腰斩降低一半，导致看 4K 视频时速度骤降转圈。Google 开发的 BBR (Bottleneck Bandwidth and RTT) 算法通过测量网络最大带宽和最小往返时间来决定发包速率，即使面对 15% 的轻度丢包，也能持续保持高吞吐传输，是 VPS 和中转节点提速的核心优化手段。',
    tags: ['BBR算法', 'TCP拥塞控制', '长距离海缆', '千兆跑满', 'Linux内核优化']
  },
  {
    id: 'tech-reality-sni-borrowing',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: 'VLESS-Reality 的“借用合法证书 (SNI Borrowing)”底层是怎么运作的？',
    shortAnswer: '握手时直接借用微软或苹果官方的真实 TLS 证书应答探针，彻底杜绝防火墙的主动探测识别。',
    detailedAnswer: '传统 Trojan/V2Ray 需要自己买域名并申请自签名 SSL 证书，容易被 GFW 顺藤摸瓜进行主动 SNI 探针扫描。VLESS-Reality 客户端在发起握手时，直接伪装成去访问 `gateway.icloud.com` 或 `www.microsoft.com`，服务器会透明转交官方真实公钥。防火墙无论怎么模拟发包测试，得到的都是百分之百合法的微软/苹果证书，从数学和特征层面彻底免疫阻断。',
    tags: ['VLESS-Reality', 'SNI借用', '证书伪装', '主动探测免疫', '防封锁']
  },
  {
    id: 'tech-mtu-mss-clamping',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: '为什么在软路由或低性能设备上需要调整 MTU / MSS 值？',
    shortAnswer: '避免数据包在二层专线被多次拆包分片导致 CPU 飙升与下行网速腰斩。',
    detailedAnswer: '标准以太网数据包最大传输单元 (MTU) 是 1500 字节。而代理协议在传输数据时会给每个数据包额外套上一层加密标头（如 WireGuard 增加 60~80 字节，Trojan 增加 40 字节）。如果总长度超过 1500，路由器就必须将其拆分为两个碎包分别传输，造成极大的吞吐损耗。建议在客户端 TUN 模式下将 MTU 调整为 1420 甚至 1280，既能保障完整性又能杜绝分片。',
    tags: ['MTU设置', 'MSS', '数据包分片', '软路由优化', '1420黄金值']
  },
  {
    id: 'tech-multiplexing-mux',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: '客户端设置里的 Mux (多路复用) 开关到底要不要开启？',
    shortAnswer: '大带宽看 4K/8K 视频建议关闭 Mux；高频小请求查资料可开启以减少 TCP 握手开销。',
    detailedAnswer: 'Mux 的利弊权衡：\n- **开启优点**：将多个并发 HTTP 请求复用在一条 TCP 长连接中，免除反复三次握手的往返延迟，适合浏览包含大量小碎图的网页。\n- **关闭理由（大流量场景）**：由于所有流量都被塞入单条连接，一旦该连接发生轻微丢包，后方所有数据包都会发生严重的队头阻塞 (Head-of-Line Blocking)，看高码率视频时极易出现卡死。在当前高速专线网络下，普遍建议保持默认关闭。',
    tags: ['Mux多路复用', '队头阻塞', '4K卡顿', '连接复用', '客户端设置']
  },
  {
    id: 'tech-asn-bgp-peering',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: '怎么看懂一个节点的 ASN 编号？如何识别是不是正规 Tier-1 骨干运营商？',
    shortAnswer: 'ASN 代表自治网络编号，可通过 bgp.he.net 查询其是否直连 Cogent、Lumen、PCCW 等顶级骨干网。',
    detailedAnswer: '查询方法：\n在 `https://bgp.he.net` 输入节点的落地 IP 即可查询其 ASN。如果是 AS174 (Cogent)、AS3356 (Lumen)、AS3491 (PCCW) 等顶级国际运营商，说明该机房位于全球骨干传输核心位置，拥有海量互联对等（Peering）带宽，网络稳定性远胜于各类不知名的虚拟二级转售商。',
    tags: ['ASN查询', 'Tier-1运营商', 'BGP Peering', '机房骨干网', 'Cogent']
  },
  {
    id: 'tech-snell-protocol-mac',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: '什么是 Snell 协议？为什么它在 Surge 苹果生态圈子里极度流行？',
    shortAnswer: 'Snell 是 Surge 团队开发的轻量级私有闭源代理协议，内存开销极低且与 macOS/iOS 深度绑定。',
    detailedAnswer: 'Snell 协议完全摒弃了其他通用协议复杂的插件架构，采用极简的二进制封装与双向认证，CPU 占用率极低，在苹果设备上发热量和耗电控制近乎完美。缺点是完全闭源且仅受 Surge、Pico 等特定高端客户端支持，通用性不如 Shadowsocks 和 sing-box。',
    tags: ['Snell', 'Surge专属', '苹果生态', '极简协议', '低功耗']
  },
  {
    id: 'tech-grpc-vs-ws-transports',
    category: 'tech',
    categoryName: 'IEPL专线与协议',
    question: 'gRPC 与 WebSocket 传输层协议在晚高峰表现有什么差异？',
    shortAnswer: 'gRPC 跑在 HTTP/2 之上并发吞吐更高；WebSocket 穿透强但存在一定程度的握手头部冗余。',
    detailedAnswer: '对比机制：\n- **WebSocket**：基于标准的 HTTP 升级握手，可以完美伪装在各种 CDN（如 Cloudflare）背后，抗封锁能力强，但传输封装有额外的开销。\n- **gRPC**：基于 HTTP/2 协议实现多路复用与二进制流式传输，在单连接下能承载更高吞吐的大数据块传输，适合大文件下载和高清视频推流。在专线环境下推荐直接使用原生 TCP 或 gRPC。',
    tags: ['gRPC', 'WebSocket', '传输协议', 'HTTP/2', 'CDN分流']
  },

  // ==========================================
  // 4. 新手基础认知 (Basics) - 13 Items
  // ==========================================
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
  {
    id: 'base-rule-vs-global-direct',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '客户端里的“规则 (Rule)”、“全局 (Global)”与“直连 (Direct)”到底该怎么选？',
    shortAnswer: '99% 的时间保持“规则模式 (Rule)”；排障时临时使用“全局”；完全不用代理时选“直连”。',
    detailedAnswer: '三种模式的工作逻辑：\n- **规则模式 (Rule)**：由客户端内部的分流规则集决定去向。访问百度、微信走本地宽带直连；访问 Google、GitHub、ChatGPT 自动走节点加速，最省流量且不影响国内 App。\n- **全局模式 (Global)**：电脑发出的所有外网连接全部强行送往当前选中的海外节点。国内网站访问会变慢甚至被拦截，仅用于排查某个网站是否被分流规则遗漏。\n- **直连模式 (Direct)**：完全不经过任何节点，与没开客户端一样。',
    tags: ['规则模式', '全局模式', '直连模式', '分流设置', '模式选择']
  },
  {
    id: 'base-ping-vs-real-speed',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '为什么节点测试延迟（Ping）只有 25ms，看 4K 视频还是会频繁转圈缓冲？',
    shortAnswer: '延迟 (RTT) 只代表两地物理距离与握手时间；带宽 (Bandwidth) 才是决定下行下载速度的核心。',
    detailedAnswer: '打个生动的比方：延迟相当于道路上的汽车最高限速，带宽相当于这条高速公路有几条车道。一个香港节点的 Ping 只有 25ms，说明数据包往返飞快；但如果该节点总共只有 50Mbps 带宽却挤了 500 个人同时看视频，分配给你的真实下行速度可能只有 2Mbps，根本拉不动 4K 视频所需的 40Mbps 码率。看视频必须关注下行测速，而不是单纯看 Ping。',
    tags: ['延迟与带宽', 'Ping低卡顿', '下行速度', '4K缓冲', '网络常识']
  },
  {
    id: 'base-subscription-types',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '为什么有些订阅链接长得像乱码 (Base64)，有些是 Clash YAML，有些是 sing-box JSON？',
    shortAnswer: '开源代理生态发展导致的格式割裂，需根据客户端选型使用对应的配置或转换器。',
    detailedAnswer: '不同客户端格式区别：\n- **Base64 纯链接**：v2rayN 和早期小火箭的最原始格式，包含一串加密的 `vmess://` 或 `trojan://` 链接，无高级分流规则。\n- **Clash YAML**：被 Clash Verge、OpenClash 广泛采用的标准语法，包含完整的策略组与分流规则集合。\n- **sing-box JSON**：新一代核心的标准格式，采用更严谨高效的结构化语法。现代机场通常提供一键自适应订阅下发。',
    tags: ['订阅格式', 'Base64', 'Clash YAML', 'sing-box JSON', '格式差异']
  },
  {
    id: 'base-sub-auto-update',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '客户端有必要开启“自动更新订阅”吗？设置多长时间更新一次最科学？',
    shortAnswer: '非常有必要开启，建议设置为 24 小时自动更新一次，既能同步最新可用节点又不会被后台拉黑。',
    detailedAnswer: '很多机场为了应对机房维护或临时阻断，会定期轮换国内入口 IP 和备用节点。如果几个月不更新订阅，列表里失效的死节点会越来越多。但千万不要把更新间隔设为“每 10 分钟”，过于频繁的请求会触发机场服务端的防恶意刷新风控，甚至导致订阅 Token 被自动封锁 24 小时。',
    tags: ['自动更新订阅', '更新间隔', '节点轮换', '防拉黑', '24小时更新']
  },
  {
    id: 'base-how-traffic-metered',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '机场计费流量通常是单向计费还是双向计费？下载 10GB 实际会扣多少？',
    shortAnswer: '绝大多数正规商业机场实行单向计费（只计出向或入向大者），少数低价机场实行双向累计。',
    detailedAnswer: '计费透明度分析：\n在正规专线服务商处，你下载一个 10GB 的文件，系统就只扣除 10GB 流量加上微小的 TCP 协议握手报头。但在某些不良超售机场，计费规则被设为“上行流量 + 下行流量”强制双向相加，加上暗中上调的倍率，会导致账面流量扣除飞快。购买前可在用户中心查阅计费规则说明。',
    tags: ['单向计费', '双向计费', '流量扣除', '协议报头', '透明计费']
  },
  {
    id: 'base-what-is-dns-poisoning',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '到底什么是“DNS 污染”？为什么必须依赖 DoH 或 Fake-IP 才能彻底根治？',
    shortAnswer: '防火墙在公网抢答错误的虚假 IP，使用加密远端 DNS (DoH) 或虚假保留 IP (Fake-IP) 映射可直接绕过。',
    detailedAnswer: 'DNS 污染工作机制：\n当你的电脑使用传统的无加密 UDP 53 端口查询一个海外网站域名时，公共出口的防火墙会比真实的根域名服务器更快地发回一个错误的 IP 地址（抢答）。浏览器拿到假 IP 无法连接。在客户端开启 Fake-IP 模式后，系统根本不会把域名发往本地网络，而是瞬间分配一个本地虚拟保留 IP，真实解析动作全部打包丢给海外专线节点去完成，实现 100% 防投毒。',
    tags: ['DNS污染', 'Fake-IP', 'DoH', '抢答伪造', '解析安全']
  },
  {
    id: 'base-ipv6-leak-danger',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '开启代理时本地宽带的 IPv6 会带来哪些泄露风险？为什么很多教程建议关闭 IPv6？',
    shortAnswer: '很多海外网站同时支持 IPv4 和 IPv6，电脑会优先走本地无代理的 IPv6 裸奔直连导致拦截。',
    detailedAnswer: '现代家庭宽带大多普及了原生 IPv6。但大多数机场节点仅提供 IPv4 代理隧道。当访问同时拥有 A 记录与 AAAA 记录的网站时，操作系统往往优先发起 IPv6 握手。由于代理客户端没有接管 IPv6 协议栈，数据包就会脱离代理直接走本地网络出境，瞬间被防火墙阻断或向目标网站暴露真实运营商 IP。若不需要特殊的教育网 IPv6 资源，建议在客户端中关闭 IPv6 解析。',
    tags: ['IPv6泄露', 'AAAA记录', '裸奔直连', '关闭IPv6', '分流漏洞']
  },
  {
    id: 'base-node-name-emojis',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '节点列表前面的国旗图标、各类标签（如 IEPL-01 | [1.0x] | 流媒体）各代表什么含义？',
    shortAnswer: '标准化的节点属性标识：包含物理落地国家、专线类型、计费倍率乘数及解锁服务类型。',
    detailedAnswer: '标准节点拆解示例：\n`🇭🇰 香港 IEPL 01 [1.0x] | 4K流媒体 | ChatGPT`\n- `🇭🇰 香港`：数据包最终出海访问公网的物理落地机房所在地。\n- `IEPL`：采用以太网物理专线链路传输。\n- `[1.0x]`：该节点计费倍率为标准 1 倍。\n- `4K流媒体 / ChatGPT`：运维已部署原生干净 IP 出口，通过了 Netflix 与大模型白名单校验。',
    tags: ['节点名称', '国旗图标', '属性解析', '流媒体标识', '命名规范']
  },
  {
    id: 'base-what-is-subconverter',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '什么是订阅转换器？为什么绝不要在不知名的第三方公共转换网站输入订阅？',
    shortAnswer: '订阅转换器将通用配置重构为特定客户端格式，但公共第三方网站可能在后台静默记录并盗刷你的 Token。',
    detailedAnswer: '订阅转换是用来处理规则清洗和格式转换的强大开源工具。但许多在搜索引擎排名前列的所谓“免费订阅转换 API 托管站”，是由匿名个人搭建的。你在网页中填入的完整机场订阅链接，包含无密码访问凭证 Token。不良站长可在后端数据库完全截获并导出所有节点自用或转卖。建议使用客户端自带转换功能，或在本地 Docker 自建私有 Subconverter。',
    tags: ['订阅转换', 'Subconverter', 'Token窃取', '第三方API', '私有化部署']
  },
  {
    id: 'base-device-limit-rules',
    category: 'basics',
    categoryName: '新手基础认知',
    question: '机场套餐标注的“限制 3 台设备同时在线”是怎么判定的？手机电脑都在家算几台？',
    shortAnswer: '以同时连接到节点服务器的并发公网 IP 数量为准，同一家里的所有设备共用一个宽带 IP 只算 1 台。',
    detailedAnswer: '设备数判定的底层机制：\n机场服务端无法直接窥探你家里局域网具体有几台物理设备，只能统计到接入其入口节点的源公网 IP 数量。\n- 如果你的手机、笔记本和平板都连在同一个家庭 Wi-Fi 路由器下，从公网看只有一个运营商宽带 IP，系统通常只记录为 1 台并发设备。\n- 如果你一边用手机 5G 移动流量（公网 IP A），一边在公司电脑（公网 IP B），一边家里开着软路由（公网 IP C），此时就会占满 3 台并发配额。超过限制会导致新设备连接被拒绝。',
    tags: ['设备限制', '并发IP', '多设备同时在线', '家庭局域网', '超限阻断']
  },

  // ==========================================
  // 5. 账单、支付与防坑选型 (Billing) - 13 Items
  // ==========================================
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
  {
    id: 'bill-coupon-code-usage',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '购买套餐时优惠码通常在哪里输入？如何辨别真伪以防买贵？',
    shortAnswer: '在提交订单确认收银台前的“Promo Code / 优惠码”输入框填入，例如光速云专属码 AMM。',
    detailedAnswer: '很多新手在商品详情页选择好套餐后，直接点击立即购买并扫描二维码付款，白白错失了打折福利。正确姿势是在点击结账后，在订单确认页面找到“输入优惠码 (Promo Code)”输入框，填入官方合作优惠码（如光速云专属 8 折码 `AMM`）并点击“验证”，确认应付总金额成功扣减 20% 之后再前往支付网关结算。',
    tags: ['优惠码', '折扣码', '光速云优惠', 'AMM', '结账省钱']
  },
  {
    id: 'bill-reset-day-traffic',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '为什么我刚买套餐使用了一个星期，流量突然显示被重置清零了？',
    shortAnswer: '机场后台分为“自然月重置”和“购买日周期重置”，如果在月底最后几天购买可能会快速迎来新月。',
    detailedAnswer: '部分传统面板使用的是“每月 1 号统一重置”的财务逻辑。如果你在 10 月 28 号购买了月付套餐，系统会在 11 月 1 号直接进行新一轮流量清零重置（同时你的账户有效期也会扣除相应周期）。现代化机场（如光速云、微风网络）普遍采用“账单日弹性周期”，即 10 月 28 号购买，精准计算到 11 月 28 号才重置，避免了新用户的流量损失。',
    tags: ['重置日期', '流量重置', '自然月计费', '账单周期', '配额刷新']
  },
  {
    id: 'bill-refund-policy-reality',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '买了机场套餐觉得速度不满意，行业内真的支持无理由退款吗？',
    shortAnswer: '行业普遍属于虚拟数字服务不退款，但正规老牌在购买后 24 小时内因技术不可抗力支持折算退款。',
    detailedAnswer: '虚拟数字服务退款实务：\n绝大多数机场在用户服务协议 (Terms of Service) 中都明确注明“虚拟商品一经开通不予退款”。正规且有信誉的服务商通常设立了“试水保护机制”：若用户在开通 24 小时内、流量消耗未超过 5GB，且经技术客服协助仍无法解决本地三网连接故障的，可在后台工单提交退款申请，扣除少量手续费后原路退回。因此，坚持“先买月付试水”是最高效的自保法则。',
    tags: ['退款政策', '工单退款', '无理由退款', '争议申诉', '先月付试水']
  },
  {
    id: 'bill-crypto-usdt-guide',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '使用 USDT (TRC-20) 充值购买机场套餐有哪些注意事项？手续费多少？',
    shortAnswer: '务必核对网络类型为 TRC-20、转账金额必须精确到小数点后指定位数以便系统自动核销。',
    detailedAnswer: 'USDT 充值三项注意：\n1. **链路网络选择**：TRC-20（波场链）的手续费通常固定在 1~2 USDT 且秒级到账，千万不要误选手续费高达十数美元的 ERC-20（以太坊链）。\n2. **金额必须绝对一致**：机场收银系统通过特定的小数点尾数（例如 14.7892 USDT）来自动匹配订单号，多转或少转都会导致订单无法自动回调入账。\n3. **地址一次性原则**：部分平台每次生成的充值钱包地址仅保留 30 分钟，严禁向数天前保存的历史旧地址重复转账。',
    tags: ['USDT充值', 'TRC-20', '虚拟币支付', '波场链', '匿名充值']
  },
  {
    id: 'bill-bandwidth-rate-limit',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '套餐宣传的“峰值速率 1000Mbps / 1Gbps”，能保证我全天候跑满千兆吗？',
    shortAnswer: '属于突发共享峰值带宽 (Burst Bandwidth)，非昂贵的企业独享专线 (Dedicated)。',
    detailedAnswer: '带宽架构揭秘：\n运营商一条真正千兆独享（1:1 不超售）的国际专线，月租金往往高达数万元。民用机场套餐提供的“1000Mbps 峰值”，是指节点网卡支持千兆突发能力，在没有其他用户高强度占用时，你可以瞬时跑满千兆拉取 4K 视频；但在晚高峰多人并发时，会根据动态队列均衡分配（通常保障单用户 50~200Mbps 充足裕度）。只要晚高峰视频拖拽不缓冲，就属于优质合格线。',
    tags: ['峰值速率', '千兆带宽', '突发带宽', '独享专线', '带宽超售']
  },
  {
    id: 'bill-lifetime-scam-logic',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '为什么声称“永久买断、终身免费更新”的机场或软件基本上都是庞氏资金盘？',
    shortAnswer: '服务器机房租金和国际海缆带宽是持续产生的刚性月付支出，一次性买断无法支撑长期物理开销。',
    detailedAnswer: '经济学破产模型：\n任何基础设施服务都需要持续产生现金流来支付每个月的机房服务器电费、专线租金及技术人员维护成本。“终身买断”模式只能在前期依靠源源不断的新用户本金来补贴老用户的带宽。一旦新用户增长放缓，月度总收入无法覆盖机房月租，资金链瞬间归零断裂，唯一的结局就是跑路关停。健康的商业模式必须是可持续的周期性付费。',
    tags: ['终身买断', '永久VIP', '资金盘骗局', '经济学常识', '跑路必然性']
  },
  {
    id: 'bill-shared-account-risk',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '能跟朋友或室友合租一个大容量机场套餐吗？有哪些潜在的风控处罚？',
    shortAnswer: '同一个家庭局域网可以放心共享；跨城市跨不同公网 IP 共享极易触发多并发封号机制。',
    detailedAnswer: '合租合买的边界：\n- **同住室友**：大家都在同一个宽带 Wi-Fi 路由下，对外表现为单一公网 IP，无论多少台手机平板连接，均不会触发异地异网并发风控。\n- **跨城市拼车合租**：如果你在上海、室友在广州，两端网络同时高频调用专线节点，机场后端的风控规则引擎会判定该订阅链接存在“公开泄露或非法倒卖共享”行为，系统脚本会自动暂停该账户 12~24 小时甚至永久注销。建议各自分别购买独立月付套餐。',
    tags: ['合租拼车', '异地共享', '并发风控', '封号风险', '账号合买']
  },
  {
    id: 'bill-auto-renew-trap',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '使用海外信用卡购买机场套餐，如何彻底关闭自动循环续费 (Auto-Renew)？',
    shortAnswer: '在用户中心的“我的账单 / 订阅管理”中点击取消循环订阅，或直接在发卡行端解除授权。',
    detailedAnswer: '自动扣款取消流程：\n部分接入 Stripe 或海外信用卡网关的机场默认开启了按月自动扣款。如果下个月不想再用，登录后台用户中心，进入“我的账单 / 订购服务”，找到“取消自动扣款 (Cancel Recurring Subscription)”按钮点击确认。此时当前已付费的周期仍可正常使用直到到期，到期后系统不会再自动从信用卡划扣资金。',
    tags: ['自动续费', 'Stripe扣费', '取消循环订阅', '信用卡解绑', '账单管理']
  },
  {
    id: 'bill-sub-expire-warning',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '套餐快到期时若忘记及时续费，账户中的自定义节点配置和剩余流量会保留多久？',
    shortAnswer: '正规服务商通常提供 3~7 天保留宽限期，超时后系统会自动回收端口释放资源。',
    detailedAnswer: '宽限期机制 (Grace Period)：\n到期当天如果未完成续费，节点连接权限会即刻冻结。但正规服务商的数据库会为你保留账户信息及专属订阅 Token 约 3 到 7 天。在宽限期内重新续费，所有节点配置无需在客户端重新导入即可瞬间复活。若超过 15~30 天仍未续费，系统会将该僵尸账户移入归档清理池以释放有限的专线端口资源。',
    tags: ['套餐到期', '宽限期', '配置保留', '端口释放', '账户清理']
  },
  {
    id: 'bill-enterprise-custom-plan',
    category: 'billing',
    categoryName: '账单与防坑选型',
    question: '外贸跨国企业或跨境电商团队需要定制独立专线，通常有哪些高级定制服务？',
    shortAnswer: '包含专属纯净独享静态出口 IP、独占 BGP 入口物理端口、企业 SLA 连通性协议与定制发票。',
    detailedAnswer: '企业级定制方案特色：\n与普通大众共享的民用机场不同，企业定制专线提供一对一的专属服务：\n1. **独立独享固定住宅/商宽 IP**：该 IP 仅供你一家企业打理跨境电商店铺或调用大模型，彻底杜绝邻居投毒连坐封店风险。\n2. **物理端口隔离**：为企业配置独立的专线通道，完全免受晚高峰公共高峰抢带宽影响。\n3. **专属响应支持与法务合规票据**：提供 7×24 小时企业技术保障和合规离岸技术服务发票。',
    tags: ['企业定制专线', '独享IP', '跨境电商专用', '企业SLA', '高端定制']
  },

  // ==========================================
  // 6. 隐私安全与合规边界 (Compliance) - 12 Items
  // ==========================================
  {
    id: 'comp-can-airport-see-my-passwords',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '使用机场代理节点时，机场老板或服务器运维能看到我浏览的具体网页、聊天记录或账号密码吗？',
    shortAnswer: '绝无可能。现代互联网全部采用端到端 HTTPS / TLS 加密，中间节点只能看到目标域名 IP，无法窥探传输正文。',
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
  },
  {
    id: 'comp-root-ca-cert-risk',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '为什么绝对不能在手机或电脑上手动安装机场提供的“自定义根证书 (Root CA)”？',
    shortAnswer: '安装第三方根证书等同于将整台设备的 HTTPS 加密防线彻底卸除，他人可完全解密明文监听你的所有流量。',
    detailedAnswer: '根证书 (Root Certificate Authority) 属于操作系统最高安全信任凭证。一旦你在设备上信任了第三方的自签名根证书，中间人就可以伪造任意银行、微信或邮箱的伪造证书，并在传输中实施全面的中间人解密攻击 (MitM)。正规的商业机场纯粹提供 Socks5/Shadowsocks/VLESS 传输通道，**绝对不需要、也绝不应要求用户安装任何证书**。凡是要求下载描述文件或信任根证书的平台，应立刻卸载。',
    tags: ['根证书风险', 'Root CA', '中间人监听', 'HTTPS解密', '重大安全隐患']
  },
  {
    id: 'comp-no-logs-policy-audit',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '什么是“无日志 (No-Logs)”政策？如何判断一个服务商是不是真正无日志？',
    shortAnswer: '无日志要求节点服务器完全基于内存 (RAM-only) 运行，不将用户的连接 IP、访问时间写在物理硬盘上。',
    detailedAnswer: '真正的无日志技术架构：\n普通 Linux 服务器在默认配置下会记录 `/var/log` 系统连接与认证日志。承诺 No-Logs 的高水准服务商会做以下技术加固：\n1. **将日志目录挂载至内存临时文件系统 (tmpfs)**，重启即彻底焚毁清空。\n2. **禁用代理内核的连接访问追踪日志**，仅保留匿名汇总的流量消耗计数器用于账单扣减。\n3. 服务器物理磁盘进行高强度 BitLocker / LUKS 全盘加密，杜绝任何外部人员物理拆机提取数据。',
    tags: ['无日志政策', 'No-Logs', 'RAM-only服务器', '数据安全', '磁盘加密']
  },
  {
    id: 'comp-foreign-trade-ecommerce-ip',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '亚马逊 (Amazon) 和 eBay 卖家用普通机场节点打理店铺，为什么极易被关联封店？',
    shortAnswer: '多名卖家在同一公共机房节点登录不同店铺，平台风控会判定为同一人操纵多个马甲账号实施违规。',
    detailedAnswer: '跨境电商防关联铁律：\n亚马逊拥有极其严苛的防多账号碰撞算法。如果 A 卖家的店铺和 B 卖家的店铺都在同一个香港或美国机房出口 IP 登录，且该 IP 频繁被不同电脑指纹复用，亚马逊会直接判定两家店铺属于“关联账号 (Associated Accounts)”。一旦其中一家发生违规或侵权，整批店铺都会被连坐冻结关停。跨境电商卖家打理后台，必须使用专属的一对一独享固定纯净 IP。',
    tags: ['亚马逊封店', '店铺关联', '跨境电商', '独享固定IP', '电商防关联']
  },
  {
    id: 'comp-public-wifi-safety',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '在星巴克、机场公共 Wi-Fi 上网，开启代理客户端能否防范局域网黑客窃听？',
    shortAnswer: '能。TUN 模式会在本地构建端到端的加密隧道，公共 Wi-Fi 路由器和同局域网黑客只能抓到无意义的乱码。',
    detailedAnswer: '公共场所的开放 Wi-Fi 存在极高的中间人嗅探与 ARP 欺骗风险，黑客可以利用伪造热点或抓包工具记录未加密的本地数据包。当你开启具备强加密的代理客户端（如开启 TUN 模式配合 Trojan/VLESS 加密隧道）后，所有进出你电脑的数据在离开无线网卡前就已经被高强度加密打包，即便黑客拦截了空中广播数据包，也完全无法逆向还原出任何有效信息。',
    tags: ['公共Wi-Fi', 'ARP欺骗', '星巴克网络', '加密隧道', '局域网防窃听']
  },
  {
    id: 'comp-ddos-p2p-bt-ban',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '为什么几乎所有正规机场都严正声明“严禁使用节点下载 BT 种子 / P2P 下载”？',
    shortAnswer: 'BT 下载会触发海外版权方 (DMCA) 严重侵权投诉，导致机房服务器被直接掐线扣押并面临高额罚款。',
    detailedAnswer: 'P2P 协议的合规杀伤力：\n1. **欧美严苛的 DMCA 知识产权法律**：下载好莱坞电影或破解版游戏种子时，版权监测机构会在 P2P 蜂窝网络里主动爬取所有的分享者 IP。一旦抓到节点的出口 IP，版权方律师会在 24 小时内向托管机房下发法律警告函 (Abuse Notice)。\n2. **服务器连坐关机**：机房只要累计收到几张 DMCA 投诉，就会直接无预警拔除该物理服务器的电源并列入黑名单，连累整座机房的所有正常用户全部断流。因此，正规服务商都会在网关层通过规则直接屏蔽 BitTorrent 协议。',
    tags: ['BT下载禁令', 'P2P限制', 'DMCA版权', '机房滥用', '服务器查封']
  },
  {
    id: 'comp-telegram-phone-privacy',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '使用 Telegram（电报）如何隐藏自己的真实手机号，防止被群友或陌生人开盒？',
    shortAnswer: '在“隐私与安全”中将“电话号码”可见性强制设置为“没有人”，并关闭手机通讯录同步。',
    detailedAnswer: 'Telegram 隐私防泄漏必做设置：\n1. 打开 Telegram ➔ 进入“设置” ➔ 点击“隐私与安全” ➔ 点击“电话号码”，将“谁可以看到我的电话号码”修改为**“没有人 (Nobody)”**。\n2. 在下方“谁可以通过我的号码找到我”，修改为**“我的联系人 (My Contacts)”**。\n3. 找到“数据设置”，关闭“同步通讯录 (Sync Contacts)”并点击“删除已同步的联系人”。完成上述三步后，任何群成员点击你的个人资料，均无法获知你的真实手机号码。',
    tags: ['Telegram隐私', '隐藏手机号', '开盒防护', '通讯录同步', '电报安全']
  },
  {
    id: 'comp-cross-border-vpn-law',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '中国境内对于跨境联网技术的相关法规与企业审批政策是怎样的？',
    shortAnswer: '企事业单位开展跨国业务可向基础电信运营商申请合规国际物理专线，严禁擅自建立国际联网通道。',
    detailedAnswer: '法规与合规框架：\n依据《中华人民共和国计算机信息网络国际联网管理暂行规定》及工信部相关业务规范：\n1. 跨境网络必须通过国家批准设立的国际通信出入口局进行，任何个人与未经许可的机构严禁擅自租用国际线路或私设信道开展商业分销运营。\n2. 合法合规的跨国中资企业、外资企业及高校科研机构，有正常跨国业务需求的，应当通过中国电信、中国联通、中国移动等具备国际业务牌照的基础运营商，正式报备开通合规跨境物理专线通道。',
    tags: ['法律法规', '国际出入口局', '合规专线', '工信部规范', '企业报备']
  },
  {
    id: 'comp-malware-miner-injection',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '为什么严禁在网络论坛、网盘下载所谓的“破解版、修改版”代理客户端？',
    shortAnswer: '此类第三方安装包普遍被植入挖矿木马、键盘记录器及窃取浏览器 Session 凭证的后门脚本。',
    detailedAnswer: '黑产恶意改装套路：\n由于代理客户端需要获取系统管理员权限以管理网络虚拟网卡，黑产分子极喜欢在破解版安装包里捆绑恶意 Trojan 恶意木马。一旦安装，木马会在后台静默盗取 Chrome 保存的密码凭证、Telegram 会话文件及数字货币钱包助记词，甚至利用显卡在后台秘密挖矿。**必须始终坚持从开源官方 GitHub Releases 仓库或官方镜像站下载原版软件**。',
    tags: ['破解版木马', '挖矿后门', '凭证窃取', '官方镜像', '木马注入']
  },
  {
    id: 'comp-ip-abuse-reports',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '访问 Google 或 Cloudflare 经常频繁弹出人机验证码，是因为当前 IP 存在历史滥用吗？',
    shortAnswer: '是。说明当前公网出口被其他用户用于高频爬虫、发垃圾邮件或扫描，已被列入公共信誉黑名单。',
    detailedAnswer: 'IP 信誉评分机制：\nCloudflare 和 Google 的安全防御系统会实时追踪全球每一个公网 IP 的请求行为。如果某个节点在最近数小时内发起了数万次异常的自动化 HTTP 握手，该 IP 的信誉分就会被瞬间打入谷底，导致该出口下的所有用户在访问网页时都必须手动点击旋转图片或选择斑马线验证码。正规高端机场会建立严格的端口滥用熔断监控，保障出口 IP 长期处于高信誉纯净状态。',
    tags: ['人机验证', 'Cloudflare验证码', 'IP信誉', '爬虫滥用', 'Google验证码']
  },
  {
    id: 'comp-whistleblowing-security',
    category: 'compliance',
    categoryName: '隐私安全与合规',
    question: '如何向 Mitce 实验室提交恶意机场跑路、暗改偷跑倍率或安全漏洞的线索？',
    shortAnswer: '通过官方加密邮箱提交脱敏截图、测速凭证与工单记录，实验室将对线索来源进行严格去标识化保护。',
    detailedAnswer: '线索征集与保护机制：\nMitce 网络可观测性评测实验室致力于维护透明、客观的行业技术基准。如果你发现某些服务商存在恶意跑路前夕大促销、暗中将 1x 节点修改为 5x 偷跑流量、或在客户端安装包中捆绑暗桩等恶劣行径，可通过邮件 `contact@mitce.run` 提交相关抓包证据、工单沟通记录及测速数据。实验室安全工程师会进行独立复测核验，并在保护举报人绝对隐私的前提下，更新至跑路预警雷达与品牌测评大盘。',
    tags: ['线索举报', '跑路证据', '偷跑倍率', '安全审计', 'Mitce实验室']
  }
];
