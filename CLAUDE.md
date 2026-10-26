# RWA Launchpad DApp

RWA 资产发射平台（BSC）的前端 DApp。

## 技术栈与命令

- Vite 8 + React 19 + TypeScript，已开启 React Compiler（无需为性能手写 `useMemo` / `useCallback` / `memo`）
- 包管理：pnpm
- `pnpm dev` 开发 · `pnpm build` 类型检查并构建 · `pnpm lint` 运行 oxlint

## 开发约定

1. **优先复用成熟库**；组件源代码可控（组件代码放在仓库内、可直接修改，而不是黑盒依赖）；统一设计语言；**严格限制重复依赖**（同一职责只保留一个库，新增依赖前先确认现有依赖无法覆盖）；低耦合高内聚。
2. **样式**：统一使用 Tailwind CSS v4（`@tailwindcss/vite`，入口 `src/index.css`），不新增独立 `.css` 文件或内联 `style`（运行时动态值除外）。
3. **图标**：统一使用 Lucide（`lucide-react`）。
4. **动画**：统一使用 Motion（`motion`，从 `motion/react` 引入）。
5. **状态管理**：统一使用 Zustand，只存放客户端/UI 状态；服务端数据与链上数据由 TanStack Query 缓存，不复制进 store。
6. **网络请求**：统一使用 TanStack Query（`@tanstack/react-query`）管理请求的缓存、加载与错误状态；axios 只作为 `queryFn` / `mutationFn` 内的传输层，组件中不直接调用。
7. **钱包**：连接钱包、读取合约、发送交易统一使用 RainbowKit（基于 wagmi + viem），链上读写用 wagmi hooks；wagmi 与业务请求共用同一个 `QueryClient`。
8. **路由**：`react-router`。
9. 待补充…
