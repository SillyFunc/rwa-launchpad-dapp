# RWA Launchpad DApp

RWA 资产发射平台（BSC）的前端 DApp。

## 技术栈与命令

- Vite 8 + React 19 + TypeScript，已开启 React Compiler（无需为性能手写 `useMemo` / `useCallback` / `memo`）
- 包管理：pnpm
- `pnpm dev` 开发 · `pnpm build` 类型检查并构建 · `pnpm lint` 运行 oxlint
- 新增带编译脚本的依赖时，需在 `pnpm-workspace.yaml` 的 `allowBuilds` 中明确允许或拒绝，否则 `pnpm install` 会失败

## 环境变量

复制 `.env.example` 为 `.env.local` 后再运行，变量均在 `src/config/rainbowkit.ts` 读取：

- `VITE_WALLETCONNECT_PROJECT_ID`：留空时不启用 WalletConnect，钱包列表只剩浏览器注入钱包（手机扫码、跳转钱包 App 不可用）；生产环境必须配置在 https://cloud.reown.com 申请的真实 projectId
- `VITE_ENABLE_TESTNETS`：为 `true` 时加入 BSC 测试网
- `VITE_BSC_RPC_URL`：BSC 主网自定义 RPC，优先于公共节点（`bsc-rpc.publicnode.com` 的 HTTP / WebSocket 作为回退）
- `VITE_BSC_TESTNET_RPC_URL`：BSC 测试网自定义 RPC，留空使用链默认节点

## 目录

- 路径别名：`@/` 指向 `src/`，定义在 `tsconfig.app.json` 的 `paths`，Vite 通过 `resolve.tsconfigPaths` 读取同一份配置
- `src/config/`：全局单例配置（`rainbowkit.ts` 链与钱包、`queryClient.ts` 共用的 QueryClient）
- `src/providers/AppProviders.tsx`：Provider 嵌套顺序 Wagmi → QueryClient → RainbowKit，在 `main.tsx` 中包裹整个应用
- `src/router.ts`：路由表（`createHashRouter`）；`App.tsx` 是根布局（Header + `<Outlet />` + Footer），页面作为它的子路由。页脚默认显示，个别页面在路由上加 `handle: { hideFooter: true }` 隐藏
- `src/pages/`：页面组件（`HomePage` → `/`）
- `src/pages/onboarding/`：KYC 两步流程，`OnboardingLayout` 下 `PersonalInfoStep` → `/onboarding`、`CompanyDocumentsStep` → `/onboarding/documents`；两步的 Zod schema、内存草稿 `useKycDraftStore` 与提交 mutation `kycMutations.ts` 同在此目录。每步提交只经过 mutation，接入后端时只改 mutation 内部
- `src/components/`：通用组件（如 `WalletButton.tsx`）；`src/components/layout/`：`Header`、`Footer` 等布局组件；`src/components/form/`：表单通用组件（`FieldLabel`、`FieldError`、`TextField`、`AttachmentUpload`）
- `src/stores/`：全局 UI 状态（如 `useSidebarStore`），只属于单个页面的 store 放在该页面目录内
- `src/utils/`：通用工具函数，`format.ts` 放显示用的格式化函数（如 `shortenAddress`、`formatFileSize`），`form.ts` 放 TanStack Form 辅助函数
- `src/assets/`：设计稿导出的静态素材

## 开发约定

1. **优先复用成熟库**；组件源代码可控（组件代码放在仓库内、可直接修改，而不是黑盒依赖）；统一设计语言；**严格限制重复依赖**（同一职责只保留一个库，新增依赖前先确认现有依赖无法覆盖）；低耦合高内聚。
2. **样式**：统一使用 Tailwind CSS v4（`@tailwindcss/vite`，入口 `src/index.css`），不新增独立 `.css` 文件或内联 `style`（运行时动态值除外）。
3. **组件库**：统一使用 TDesign Mobile（`tdesign-mobile-react`），样式已在 `main.tsx` 全局引入；查询组件 API 与示例优先使用 TDesign MCP（`tdesign-mcp-server`，配置在 `.mcp.json`）。
4. **图标**：统一使用 Lucide（`lucide-react`）。
5. **动画**：统一使用 Motion（`motion`，从 `motion/react` 引入）。
6. **状态管理**：统一使用 Zustand，只存放客户端/UI 状态；服务端数据与链上数据由 TanStack Query 缓存，不复制进 store。
7. **网络请求**：统一使用 TanStack Query（`@tanstack/react-query`）管理请求的缓存、加载与错误状态；axios 只作为 `queryFn` / `mutationFn` 内的传输层，组件中不直接调用。
8. **表单**：统一使用 TanStack Form（`@tanstack/react-form`）管理表单状态与校验；类型校验统一使用 Zod（`zod` v4），schema 直接传给 TanStack Form 的 `validators`，不引入额外的适配器包。
9. **钱包**：连接钱包统一使用 RainbowKit（基于 wagmi + viem，弹窗语言 `zh-CN`），链上读写用 wagmi hooks；wagmi 与业务请求共用同一个 `QueryClient`。自定义连接按钮用 `ConnectButton.Custom`，它和 RainbowKit 的弹窗都必须位于 `RainbowKitProvider` 内。
10. **路由**：`react-router`。
11. **主题**：全站统一 dark 风格，不做浅色模式，不使用 `dark:` 变体；全局底色与文字色在 `src/index.css` 的 base 层设置，RainbowKit 使用 `darkTheme()`（在 `AppProviders.tsx` 中覆盖了字体），TDesign 由 `index.html` 中 `<html theme-mode="dark">` 开启暗色，品牌色（`#FCD438`）等主题变量在 `src/index.css` 中覆盖。
12. **字体**：西文与数字用 Inter Variable（`@fontsource-variable/inter` 的 `opsz.css`，自托管，大字号自动切换为 Display 字形），中文回退到各平台系统字体；字体栈只在 `src/index.css` 的 `@theme` 中定义为 `--font-sans`，TDesign 的 `--td-font-family` 与 RainbowKit 的 `fonts.body` 都指向它。组件中不写死字体；金额、价格等数字加 `tabular-nums`。
13. **注释**：禁止编写教学式注释（解释代码在做什么、复述库或 API 的用法、分步讲解）；只在原因不明显时（workaround、业务约束）写一行简短注释。
14. **导入路径**：跨目录导入统一使用 `@/` 别名（如 `@/assets/logo.svg`、`@/components/WalletButton.tsx`），同目录内用 `./`，不使用 `../`。
15. 待补充…
