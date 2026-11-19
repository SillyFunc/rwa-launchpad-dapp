# RWA 发币详情接口扩展 前端接口对接文档

## 1. 基本信息

| 项目 | 说明 |
| --- | --- |
| 关联任务 / 分支 | `rwa-detail-extension` / `feat/rwa-detail-extension` |
| 更新日期 | `2026-11-19` |
| 所属服务与路径前缀 | `deposit-api`（默认端口 `6410`，路径前缀 `/deposit`） |
| 变更类型 | `修改现有接口` |
| 需求来源 | 页面字段文字描述（扩展 `tokenomicsInfo`、`utilityInfo`、`businessInfo` 三个对象） |
| 通用响应包装 | `MessageResult`（`code=0` 成功，非 `0` 失败；`message` 为提示文本；`data` 为业务数据） |

## 2. 接口总览

| 序号 | 变更类型 | 方法 | 完整路径（含 `/deposit`） | 鉴权要求 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 1 | 修改 | POST | `/deposit/exSwap/rwa/swapCoinIssuedDetail` | 无 | 查询 RWA 项目详情，在原字段基础上新增 `tokenomicsInfo`、`utilityInfo`、`businessInfo` |

## 3. 修改现有接口的变更差异说明

### `POST /deposit/exSwap/rwa/swapCoinIssuedDetail`

- **改动概要**：在原有 `coin_issued_rwa` 表新增 3 个可空 JSON 文本列（`tokenomics_info`、`utility_info`、`business_info`），由详情接口解析为结构化对象并增量返回；同时补齐请求参数 `id` 为空时的明确错误返回。
- **旧版前端兼容性**：**完全向后兼容**。请求路径、HTTP 方法、请求参数 `id` 及原 `CoinIssuedRwa` 全部顶层字段保持不变；仅在 `data` 对象中增量追加 3 个新键，不暴露底层原始 JSON 字符串字段。分页列表接口 `POST /deposit/exSwap/rwa/swapCoinIssuedPage` 响应结构**未变更**，不返回这三个新字段。

#### 请求参数变更

| 变更类型 | 参数名 | 位置 | 类型 | 是否必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| 修改（校验收紧） | `id` | Form / Query | `Long` | 是 | - | RWA 项目主键 ID；原接口未判空会触发内部异常，现显式返回参数错误（`code=500`） |

> 本次未新增、重命名或废弃任何请求参数。

#### 响应字段变更

| 变更类型 | 字段路径 | 类型 | 可空 | 说明 |
| --- | --- | --- | --- | --- |
| 新增 | `data.tokenomicsInfo` | `Object` | 否（主记录存在时） | 代币经济分配百分比对象；未配置时 10 个子字段均返回数值 `0` |
| 新增 | `data.tokenomicsInfo.seed` | `Number` (`BigDecimal`) | 否 | Seed 占比百分数（例如 `15` 表示 15%，`15.5` 表示 15.5%） |
| 新增 | `data.tokenomicsInfo.privateSale` | `Number` (`BigDecimal`) | 否 | Private 占比百分数 |
| 新增 | `data.tokenomicsInfo.publicSale` | `Number` (`BigDecimal`) | 否 | Public 占比百分数 |
| 新增 | `data.tokenomicsInfo.liquidity` | `Number` (`BigDecimal`) | 否 | Liquidity 占比百分数 |
| 新增 | `data.tokenomicsInfo.treasury` | `Number` (`BigDecimal`) | 否 | Treasury 占比百分数 |
| 新增 | `data.tokenomicsInfo.coreTeam` | `Number` (`BigDecimal`) | 否 | Core Team 占比百分数 |
| 新增 | `data.tokenomicsInfo.advisory` | `Number` (`BigDecimal`) | 否 | Advisory 占比百分数 |
| 新增 | `data.tokenomicsInfo.ecosystemRewards` | `Number` (`BigDecimal`) | 否 | Ecosystem Rewards 占比百分数 |
| 新增 | `data.tokenomicsInfo.kol` | `Number` (`BigDecimal`) | 否 | KOL 占比百分数 |
| 新增 | `data.tokenomicsInfo.unlocked` | `Number` (`BigDecimal`) | 否 | Unlocked 占比百分数 |
| 新增 | `data.utilityInfo` | `Object` | 否（主记录存在时） | 实用性说明对象；未配置时返回 `{"description": "", "childs": []}` |
| 新增 | `data.utilityInfo.description` | `String` | 否 | 实用性主描述文本；未配置时为 `""` |
| 新增 | `data.utilityInfo.childs` | `Array<String>` | 否 | 实用性要点文字数组；未配置时为 `[]` |
| 新增 | `data.businessInfo` | `Object` | 否（主记录存在时） | 业务介绍对象；未配置时返回 `{"description": "", "childs": []}` |
| 新增 | `data.businessInfo.description` | `String` | 否 | 业务介绍主描述文本；未配置时为 `""` |
| 新增 | `data.businessInfo.childs` | `Array<String>` | 否 | 业务介绍要点文字数组；未配置时为 `[]` |

## 4. 接口详细定义

### 4.1 获取 RWA 发币项目详情（`修改`）

- **完整路径**：`POST /deposit/exSwap/rwa/swapCoinIssuedDetail`（相对路径 `/exSwap/rwa/swapCoinIssuedDetail`）
- **传参方式**：`application/x-www-form-urlencoded` 或 Query 参数
- **请求头**：按需传 `Accept-Language`（影响错误提示 `message` 的中英文文案，如 `zh-CN` / `en-US`；`utilityInfo` 与 `businessInfo` 业务文本暂不做多语言切换）
- **鉴权与切面**：无（未挂载 `@CheckChainSign` 与 `@ParamEnter`）

#### 请求参数

| 参数名 | 位置 | 类型 | 必填 | 默认值 | 约束 / 格式 | 说明 | 变更标记 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `id` | Form / Query | `Long` | 是 | - | 正整数 | `coin_issued_rwa` 主键 ID | 修改（补齐空值校验） |

#### 请求示例

```http
POST /deposit/exSwap/rwa/swapCoinIssuedDetail
Content-Type: application/x-www-form-urlencoded

id=149
```

#### 响应结构体

外层固定为 `MessageResult`：

| 字段路径 | 类型 | 可空 | 说明 | 变更标记 |
| --- | --- | --- | --- | --- |
| `code` | `Integer` | 否 | 状态码：`0` 成功，非 `0` 失败 | 原有 |
| `message` | `String` | 否 | 状态或错误描述 | 原有 |
| `total` | `Long` | 是 | 固定为 `null` | 原有 |
| `data` | `Object` | 是 | RWA 详情对象；当 `id` 对应主记录不存在时为 `null` | 修改 |
| `data.id` | `Long` | 否 | 主键 ID | 原有 |
| `data.name` | `String` | 是 | 币种简称 | 原有 |
| `data.symbol` | `String` | 是 | 代币符号 | 原有 |
| `data.fullName` | `String` | 是 | 币种全称 | 原有 |
| `data.coinImg` | `String` | 是 | 币种图标 URL | 原有 |
| `data.address` | `String` | 是 | 地址 | 原有 |
| `data.creatorAddress` | `String` | 是 | 创建者地址 | 原有 |
| `data.coinContractAddress` | `String` | 是 | 代币合约地址 | 原有 |
| `data.presaleAddress` | `String` | 是 | 预售合约地址 | 原有 |
| `data.coinStatus` | `Integer` | 是 | 币种状态：`0`-草稿、`1`-上链、`2`-预售中、`3`-内盘交易、`4`-已完成 | 原有 |
| `data.status` | `Integer` | 否 | 审核/链上解析状态：`0`-无 hash、`1`-有 hash 无合约、`2`-有合约无预售、`3`-完整 | 原有 |
| `data.createTime` | `String` | 是 | 创建时间（`yyyy-MM-dd HH:mm:ss`，`GMT+8`） | 原有 |
| `data.<其它既有 CoinIssuedRwa 字段>` | - | - | 其余全部既有字段名、类型与值保持原样输出（见 `CoinIssuedRwa.java`） | 原有 |
| `data.tokenomicsInfo` | `Object` | 否 | 代币经济分配百分比对象 | 新增 |
| `data.tokenomicsInfo.seed` | `Number` | 否 | Seed 百分比（数值型百分数，例如 `10` = 10%） | 新增 |
| `data.tokenomicsInfo.privateSale` | `Number` | 否 | Private 百分比 | 新增 |
| `data.tokenomicsInfo.publicSale` | `Number` | 否 | Public 百分比 | 新增 |
| `data.tokenomicsInfo.liquidity` | `Number` | 否 | Liquidity 百分比 | 新增 |
| `data.tokenomicsInfo.treasury` | `Number` | 否 | Treasury 百分比 | 新增 |
| `data.tokenomicsInfo.coreTeam` | `Number` | 否 | Core Team 百分比 | 新增 |
| `data.tokenomicsInfo.advisory` | `Number` | 否 | Advisory 百分比 | 新增 |
| `data.tokenomicsInfo.ecosystemRewards` | `Number` | 否 | Ecosystem Rewards 百分比 | 新增 |
| `data.tokenomicsInfo.kol` | `Number` | 否 | KOL 百分比 | 新增 |
| `data.tokenomicsInfo.unlocked` | `Number` | 否 | Unlocked 百分比 | 新增 |
| `data.utilityInfo` | `Object` | 否 | 实用性说明对象 | 新增 |
| `data.utilityInfo.description` | `String` | 否 | 实用性描述，未配置时为 `""` | 新增 |
| `data.utilityInfo.childs` | `Array<String>` | 否 | 实用性要点文字数组，未配置时为 `[]` | 新增 |
| `data.businessInfo` | `Object` | 否 | 业务介绍对象 | 新增 |
| `data.businessInfo.description` | `String` | 否 | 业务介绍描述，未配置时为 `""` | 新增 |
| `data.businessInfo.childs` | `Array<String>` | 否 | 业务介绍要点文字数组，未配置时为 `[]` | 新增 |

#### 成功响应示例（已配置扩展字段）

```json
{
  "code": 0,
  "message": "success",
  "total": null,
  "data": {
    "id": 149,
    "name": "RWA-DEMO",
    "symbol": "RWAD",
    "fullName": "RWA Demo Token",
    "address": "0x534E17386241e781FEFF418C35A85f1036C370BC",
    "coinContractAddress": "0x0a4c21d6a6a9d89c7b97cbcfc92a0b8dd0d58888",
    "coinStatus": 2,
    "status": 2,
    "canSwap": 1,
    "createTime": "2026-10-23 15:59:03",
    "tokenomicsInfo": {
      "seed": 10,
      "privateSale": 15.5,
      "publicSale": 20,
      "liquidity": 12.3456,
      "treasury": 8,
      "coreTeam": 10,
      "advisory": 4.1544,
      "ecosystemRewards": 15,
      "kol": 5,
      "unlocked": 0
    },
    "utilityInfo": {
      "description": "Token utility overview",
      "childs": [
        "Staking rewards",
        "Governance voting"
      ]
    },
    "businessInfo": {
      "description": "RWA business model",
      "childs": [
        "Commercial real estate",
        "Quarterly revenue share"
      ]
    }
  }
}
```

#### 成功响应示例（历史数据 / 扩展字段未配置）

```json
{
  "code": 0,
  "message": "success",
  "total": null,
  "data": {
    "id": 201,
    "name": "RWA-LEGACY",
    "tokenomicsInfo": {
      "seed": 0,
      "privateSale": 0,
      "publicSale": 0,
      "liquidity": 0,
      "treasury": 0,
      "coreTeam": 0,
      "advisory": 0,
      "ecosystemRewards": 0,
      "kol": 0,
      "unlocked": 0
    },
    "utilityInfo": {
      "description": "",
      "childs": []
    },
    "businessInfo": {
      "description": "",
      "childs": []
    }
  }
}
```

#### 异常与错误返回

| 场景 | `code` | `message`（示例或 i18n Key） | 前端处理建议 |
| --- | --- | --- | --- |
| 未传 `id` 或 `id` 为空 | `500` | `参数错误` / `Parameter error`（i18n Key：`WRONG_PARAM`） | 路由跳转或调用前校验项目 ID |
| `id` 对应 RWA 主记录不存在 | `0` | `success`（此时 `data` 为 `null`） | 展示空态或「项目不存在」提示 |
| 库内 `tokenomics_info` / `utility_info` / `business_info` 存有非法 JSON 或错误值类型 | `500` | `未知错误`（服务端日志记录具体 `rwaId`、列名与字段） | 展示加载失败提示并联系后端排查数据 |

## 5. 联调与注意事项

- **调用顺序与前置依赖**：无前置接口依赖；页面通常从 `POST /deposit/exSwap/rwa/swapCoinIssuedPage` 获取 `id` 后调用本详情接口。
- **百分比展示约定**：`tokenomicsInfo` 下 10 个字段为数值型百分数（`15.5` 即代表 `15.5%`），前端直接拼接 `%` 展示即可，无需再乘以 `100`。数值已去除多余尾零且不输出科学计数法。
- **上线顺序与数据库录入格式**：
  - 部署前必须**先在目标 MySQL 库执行 `sql/coin_issued_rwa_add_detail_columns.sql` 加列，再启动新版 `deposit-api`**（避免列表与详情接口出现 `Unknown column`）。
  - 3 个 JSON 列允许留空（`NULL` / 空字符串）；填写时必须为合法 JSON 对象：
    - `tokenomics_info` 示例：`{"seed":10,"privateSale":15.5,"publicSale":20,"liquidity":12.3456,"treasury":8,"coreTeam":10,"advisory":4.1544,"ecosystemRewards":15,"kol":5,"unlocked":0}`（值为 JSON 数字，不能写 `"15%"` 字符串；省略的键默认 `0`）。
    - `utility_info` / `business_info` 示例：`{"description":"说明文案","childs":["要点一","要点二"]}`（`description` 为字符串，`childs` 为字符串数组）。
