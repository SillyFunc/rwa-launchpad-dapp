# RWA 资产发行平台玩法说明接口 前端接口对接文档

## 1. 基本信息

| 项目 | 说明 |
| --- | --- |
| 关联任务 / 分支 | `gameplay-guide` / `main`（当前工作区改动） |
| 更新日期 | `2026-11-19` |
| 所属服务与路径前缀 | `deposit-api`（默认端口 `6410`，路径前缀 `/deposit`） |
| 变更类型 | `新增接口` |
| 需求来源 | 用户需求：新增无参 GET 接口，以富文本形式返回 RWA 资产发行平台玩法说明（含繁体中文 `contentZhHant`、英文 `contentEn` 两个字段） |
| 通用响应包装 | `MessageResult`（`code=0` 成功，非 `0` 失败；`message` 为提示文本；`data` 为业务数据） |

## 2. 接口总览

| 序号 | 变更类型 | 方法 | 完整路径（含 `/deposit`） | 鉴权要求 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 1 | 新增 | GET | `/deposit/gameplayGuide` | 无 | 获取当前启用的 RWA 资产发行平台玩法说明，返回繁体中文与英文两份富文本 HTML 内容 |

## 3. 接口详细定义

### 3.1 获取平台玩法说明（`新增`）

- **完整路径**：`GET /deposit/gameplayGuide`（相对路径 `/gameplayGuide`）
- **传参方式**：无需传参
- **请求头**：按需传 `Accept-Language`（仅影响无可用配置时错误提示 `message` 的多语言文案，如 `zh-TW` / `en-US`；成功响应始终同时返回 `contentZhHant` 与 `contentEn` 两个字段）
- **鉴权与切面**：无（未挂载 `@CheckChainSign` 与 `@ParamEnter`，用户连接钱包前亦可直接访问）

#### 请求参数

无。

#### 请求示例

```http
GET /deposit/gameplayGuide HTTP/1.1
Accept: application/json
```

#### 响应结构体

外层固定为 `MessageResult`：

| 字段路径 | 类型 | 可空 | 说明 | 变更标记 |
| --- | --- | --- | --- | --- |
| `code` | `Integer` | 否 | 状态码：`0` 成功，非 `0` 失败 | 原有 |
| `message` | `String` | 否 | 状态或错误描述 | 原有 |
| `total` | `Long` | 是 | 固定为 `null` | 原有 |
| `data` | `Object` | 是 | 玩法说明对象；查询失败时为 `null` | 新增 |
| `data.contentZhHant` | `String` | 否 | 繁体中文玩法说明富文本内容（语义化 HTML 片段，根节点为 `<article>`） | 新增 |
| `data.contentEn` | `String` | 否 | 英文玩法说明富文本内容（语义化 HTML 片段，根节点为 `<article>`） | 新增 |
| `data.updateTime` | `String` | 是 | 最近更新时间（格式 `yyyy-MM-dd HH:mm:ss`，时区 `GMT+8`） | 新增 |

#### 成功响应示例

```json
{
  "code": 0,
  "message": "success",
  "total": null,
  "data": {
    "contentZhHant": "<article>\n  <h1>RWA 資產發行平台玩法說明</h1>\n  <p>歡迎使用 RWA（Real World Assets，現實世界資產）資產發行平台……</p>\n</article>",
    "contentEn": "<article>\n  <h1>RWA Asset Launchpad User Guide</h1>\n  <p>Welcome to the RWA (Real World Assets) Asset Launchpad Platform...</p>\n</article>",
    "updateTime": "2026-11-19 22:07:59"
  }
}
```

#### 异常与错误返回

| 场景 | `code` | `message`（示例或 i18n Key） | 前端处理建议 |
| --- | --- | --- | --- |
| 表 `gameplay_guide` 中无启用记录（`status = 1` 不存在） | `500` | `信息不存在` / `Information does not exist`（i18n Key：`INFO_NOT_EXIST`） | 展示「暂未配置玩法说明」空态提示 |
| 已启用记录缺失 `content_zh_hant` 或 `content_en`（库内数据为空或纯空白） | `500` | `未知错误`（服务端日志记录对应记录 ID 与缺失列名） | 展示加载失败提示并联系运维/后端排查数据 |

## 4. 联调与注意事项

- **调用顺序与前置依赖**：无前置接口依赖，可在 DApp 任意页面（含未连接钱包状态）直接调用。
- **富文本渲染与主题适配**：
  - `contentZhHant` 与 `contentEn` 均为标准语义化 HTML 片段（使用 `<article>`、`<section>`、`<h1>`~`<h3>`、`<p>`、`<ul>`/`<ol>`/`<li>`、`<table>`、`<blockquote>`、`<strong>`），不包含 `<html>`/`<body>` 外壳与硬编码浅色/深色内联样式，前端直接放入带排版样式的富文本容器即可自动适配浅色/深色主题。
  - 前端按当前语言环境展示 `contentZhHant`（繁体中文）或 `contentEn`（英文），并做好常规 XSS 防护策略（如受控渲染容器）。
- **时间格式约定**：`updateTime` 采用 `yyyy-MM-dd HH:mm:ss`（`GMT+8`）。
- **环境与数据前提**：部署新版 `deposit-api` 前，必须先在目标 MySQL 库执行 `sql/create_gameplay_guide.sql` 完成 `gameplay_guide` 建表与初始化数据写入；后台后续更新玩法说明时，只需更新该记录或新增一条 `status = 1` 记录（接口默认按 `update_time DESC, id DESC` 取最新一条启用记录）。
