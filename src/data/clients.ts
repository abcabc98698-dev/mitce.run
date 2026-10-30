export interface ClientItem {
  name: string;
  category: 'desktop' | 'mobile' | 'router';
  platform: ('Windows' | 'macOS' | 'iOS' | 'Android' | 'Linux' | 'OpenWrt')[];
  core: string;
  features: string;
  badge?: string;
  recommended: boolean;
  pricing: '免费开源' | 'App Store 付费' | '商业软件';
  targetAudience: string;
  githubOrSite: string;
  setupGuideSummary: string;
}

export const CLIENTS_DATA: ClientItem[] = [
  // Desktop - Windows & macOS & Linux
  {
    name: 'Clash Verge Rev',
    category: 'desktop',
    platform: ['Windows', 'macOS', 'Linux'],
    core: 'Mihomo (Clash Meta) 内核',
    features: '智能规则分流、TUN 虚拟网卡模式、现代化 Fluent UI、订阅自动更新、自建规则覆写与脚本',
    badge: '桌面端主力推荐',
    recommended: true,
    pricing: '免费开源',
    targetAudience: '90% 电脑端用户的最佳选择，从新手一键开启 TUN 到进阶分流规则全支持',
    githubOrSite: 'https://github.com/clash-verge-rev/clash-verge-rev',
    setupGuideSummary: '下载对应架构安装包（Windows 选 x64，macOS 区分 Intel 与 Apple Silicon），在「订阅」页面粘贴机场订阅链接，开启「系统代理」或「TUN 模式」即可秒级连通。'
  },
  {
    name: 'v2rayN',
    category: 'desktop',
    platform: ['Windows', 'macOS', 'Linux'],
    core: 'Xray / sing-box / V2Ray 多核心',
    features: '原生支持 VLESS-Reality、Trojan、Shadowsocks 等最新协议，节点批量测速与多路复用',
    badge: '多协议极速调试',
    recommended: true,
    pricing: '免费开源',
    targetAudience: '习惯经典列表管理、需要深度调试 VLESS / Reality 节点与自定义路由的高级用户',
    githubOrSite: 'https://github.com/2dust/v2rayN',
    setupGuideSummary: '解压即用，支持直接从剪贴板导入节点链接或通用订阅，自动获取 Xray/sing-box 核心，配合路由规则设置绕过大陆 IP。'
  },
  {
    name: 'FlClash',
    category: 'desktop',
    platform: ['Windows', 'macOS', 'Linux', 'Android'],
    core: 'Mihomo 内核',
    features: '基于 Flutter 打造的现代化轻量级多端统一界面，内存占用极低，极简设计',
    badge: '极简轻量',
    recommended: true,
    pricing: '免费开源',
    targetAudience: '喜欢现代审美、厌烦繁重配置面板、追求极低资源占用的用户',
    githubOrSite: 'https://github.com/chen08209/FlClash',
    setupGuideSummary: '单文件轻巧启动，跨平台界面逻辑一致，支持一键粘贴订阅与自动切换节点。'
  },
  {
    name: 'Surge Mac',
    category: 'desktop',
    platform: ['macOS'],
    core: 'Surge 专有引擎',
    features: '企业级网络调试、数据包捕获分析、超强 DNS 劫持防护、MITM 解密与专业仪表盘',
    badge: 'Mac 顶级神器',
    recommended: false,
    pricing: '商业软件',
    targetAudience: '对网络可观测性、网络调试抓包有极致要求的 Mac 专业开发者与极客',
    githubOrSite: 'https://nssurge.com',
    setupGuideSummary: '通过购买激活码授权，使用专属规则配置文件或托管托管配置，体验最强 Mac 网络接管。'
  },
  {
    name: 'Hiddify',
    category: 'desktop',
    platform: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    core: 'sing-box 内核',
    features: '全平台覆盖、自动智能延迟选点、多协议无缝自适应、傻瓜式导入体验',
    badge: '全平台一键通',
    recommended: true,
    pricing: '免费开源',
    targetAudience: '全平台切换频繁，希望各设备使用完全一致的操作逻辑的新手',
    githubOrSite: 'https://github.com/hiddify/hiddify-app',
    setupGuideSummary: '粘贴任意格式订阅（支持 Clash、sing-box、V2Ray 等多种格式），软件自动解析，点击大按钮一键直连。'
  },

  // Mobile - iOS & Android
  {
    name: 'Shadowrocket (小火箭)',
    category: 'mobile',
    platform: ['iOS'],
    core: '自研高性能代理引擎',
    features: 'iOS 装机必备神器！支持扫码导入、节点群组、规则重写、节点批量真连接延迟测速与快捷指令集成',
    badge: 'iOS 首选标杆',
    recommended: true,
    pricing: 'App Store 付费',
    targetAudience: '所有 iPhone 和 iPad 用户的最佳伴侣（需非国区 Apple ID 购买，约 $2.99）',
    githubOrSite: 'https://apps.apple.com/app/shadowrocket/id932747118',
    setupGuideSummary: '登录美区/港区 Apple ID 购买下载，打开 App 点击右上角「+」，类型选「Subscribe」，粘贴机场订阅链接，开启全局路由「配置」模式即可。'
  },
  {
    name: 'v2rayNG',
    category: 'mobile',
    platform: ['Android'],
    core: 'Xray 内核',
    features: '安卓平台最成熟持久的经典客户端，分应用代理、自选分流路由规则、轻量稳定防后台被杀',
    badge: '安卓装机必选',
    recommended: true,
    pricing: '免费开源',
    targetAudience: '所有安卓手机与平板用户，轻量省电、抗断连',
    githubOrSite: 'https://github.com/2dust/v2rayNG',
    setupGuideSummary: 'GitHub Releases 或应用商店获取 APK，左上角侧边栏「订阅分组设置」添加订阅，回到主页更新订阅即可测速连通。'
  },
  {
    name: 'Stash',
    category: 'mobile',
    platform: ['iOS', 'macOS'],
    core: 'Clash 内核（iOS 原生定制）',
    features: '支持标准 Clash 策略组、覆写功能、分流测试、按域名/IP 精确分流，UI 极其优雅',
    badge: 'iOS 进阶首选',
    recommended: false,
    pricing: 'App Store 付费',
    targetAudience: '习惯 Clash 策略组与复杂分流规则的高阶 iOS 用户',
    githubOrSite: 'https://stash.ws',
    setupGuideSummary: '美区 App Store 购买下载，直接导入机场 Clash 订阅链接，自动生成策略组，支持按需规则分流。'
  },
  {
    name: 'Quantumult X (圈 X)',
    category: 'mobile',
    platform: ['iOS'],
    core: '专有高速网络内核',
    features: '重写规则 (Rewrite)、JS 脚本增强、高级策略组分流、极高吞吐低电量消耗',
    badge: '极客高定工具',
    recommended: false,
    pricing: 'App Store 付费',
    targetAudience: '喜欢深度定制分流、去广告与自动化脚本的高级 iOS 极客',
    githubOrSite: 'https://apps.apple.com/app/quantumult-x/id1453926364',
    setupGuideSummary: '添加服务器资源解析器与分流规则，配置策略组，适合有规则折腾经验的用户。'
  },

  // Router - OpenWrt & 网关
  {
    name: 'OpenClash',
    category: 'router',
    platform: ['OpenWrt'],
    core: 'Mihomo / Clash 内核',
    features: '软路由装机率最高的透明代理插件，支持 Fake-IP、Redir-Host 模式，局域网全设备无感知科学上网',
    badge: '软路由装机标配',
    recommended: true,
    pricing: '免费开源',
    targetAudience: '拥有软路由或 NAS 旁路由，希望家里所有电视、游戏机、手机免客户端翻墙的家庭与团队',
    githubOrSite: 'https://github.com/vernesong/OpenClash',
    setupGuideSummary: '在 LuCI 管理界面上传 ipk 安装，在「配置文件订阅」输入机场订阅链接，切换至「Fake-IP (TUN)」模式启动，局域网所有设备即享专线加速。'
  },
  {
    name: 'PassWall2',
    category: 'router',
    platform: ['OpenWrt'],
    core: 'Xray / sing-box / Trojan-Go',
    features: '节点列表清晰直观、自动分流规则、国内白名单机制、故障自动节点切换',
    badge: '简单易用路由方案',
    recommended: true,
    pricing: '免费开源',
    targetAudience: '追求路由插件配置简单、故障自动倒换的 OpenWrt 用户',
    githubOrSite: 'https://github.com/xiaorouji/openwrt-passwall',
    setupGuideSummary: '添加机场订阅后一键更新节点，设置 TCP/UDP 主节点与分流黑白名单，配置直观。'
  },
  {
    name: 'Nikki',
    category: 'router',
    platform: ['OpenWrt'],
    core: 'Mihomo 原生现代内核',
    features: '专为 OpenWrt 24.10+ 最新系统打造的原生极简透明代理插件，内存开销极低',
    badge: '新版 OpenWrt 优选',
    recommended: true,
    pricing: '免费开源',
    targetAudience: '运行较新 OpenWrt 24+ 版本、追求极简与现代化配置的软路由极客',
    githubOrSite: 'https://github.com/nikkinikki-org/OpenWrt-nikki',
    setupGuideSummary: '针对新内核 OpenWrt 设计，依赖现代 nftables 防火墙，轻巧高效无卡顿。'
  }
];

export const DESKTOP_CLIENTS = CLIENTS_DATA.filter(c => c.category === 'desktop');
export const MOBILE_CLIENTS = CLIENTS_DATA.filter(c => c.category === 'mobile');
export const ROUTER_CLIENTS = CLIENTS_DATA.filter(c => c.category === 'router');
