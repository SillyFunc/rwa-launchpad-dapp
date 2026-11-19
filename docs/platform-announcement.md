# 平台公告分页列表与详情接口 前端接口对接文档

## 1. 基本信息

| 项目 | 说明 |
| --- | --- |
| 关联任务 / 分支 | `platform-announcement` / `feat/platform-announcement` |
| 更新日期 | `2026-11-19` |
| 所属服务与路径前缀 | `deposit-api`（默认端口 `6410`，路径前缀 `/deposit`） |
| 变更类型 | `新增接口` |
| 需求来源 | 用户需求：公告为可分页获取的列表，结构含标题、富文本正文、发布者与发布时间；落地为繁体中文 + 英文双语字段的「列表 + 详情」两个查询接口 |
| 通用响应包装 | `MessageResult`（`code=0` 成功，非 `0` 失败；`message` 为提示文本；`data` 为业务数据） |

## 2. 接口总览

| 序号 | 变更类型 | 方法 | 完整路径（含 `/deposit`） | 鉴权要求 | 说明 |
| --- | --- | --- | --- | --- | --- |
| 1 | 新增 | GET | `/deposit/platformAnnouncement/page` | 无 | 分页查询当前可见公告列表，仅返回元数据（不含富文本正文） |
| 2 | 新增 | GET | `/deposit/platformAnnouncement/detail` | 无 | 查询单条可见公告详情，返回双语标题与双语富文本正文 |

可见性规则（两个接口共用同一套）：数据库中 `status = 1`（上线）且 `publish_time <= 当前服务器时间` 的公告才对外返回；下线或未到发布时间的公告在列表中不出现，按 `id` 请求详情同样返回「信息不存在」。

## 3. 接口详细定义

### 3.1 分页查询公告列表（`新增`）

- **完整路径**：`GET /deposit/platformAnnouncement/page`（相对路径 `/platformAnnouncement/page`）
- **传参方式**：`Query 参数`
- **请求头**：按需传 `Accept-Language`（仅影响参数越界时错误提示 `message` 的多语言文案，如 `zh-TW` / `en-US`；成功响应始终同时返回繁中、英文两组字段）
- **鉴权与切面**：无（未挂载 `@CheckChainSign` 与 `@ParamEnter`，未连接钱包亦可访问）

#### 请求参数

| 参数名 | 位置 | 类型 | 必填 | 默认值 | 约束 / 格式 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| `pageNo` | Query | `Integer` | 否 | `1` | `>= 1` | 页码，从 `1` 开始；`< 1` 时返回 `WRONG_PARAM` |
| `pageSize` | Query | `Integer` | 否 | `10` | `1..50` | 每页条数，上限 `50`；越界返回 `WRONG_PARAM` |

#### 请求示例

```http
GET /deposit/platformAnnouncement/page?pageNo=1&pageSize=10 HTTP/1.1
Accept: application/json
```

#### 响应结构体

外层固定为 `MessageResult`；`data` 为 Spring `Page` 序列化对象（本版本实际序列化字段如下，`number` 从 `0` 开始计数，即 `pageNo=1` 时 `number=0`）：

| 字段路径 | 类型 | 可空 | 说明 |
| --- | --- | --- | --- |
| `code` | `Integer` | 否 | 状态码：`0` 成功，非 `0` 失败 |
| `message` | `String` | 否 | 状态或错误描述 |
| `total` | `Long` | 是 | 固定为 `null`（本接口不使用，分页总数见 `data.totalElements`） |
| `data` | `Object` | 是 | 分页对象，见下行字段 |
| `data.content[]` | `Array<Object>` | 否 | 当前页公告列表项，按 `publishTime DESC, id DESC` 排序 |
| `data.content[].id` | `Long` | 否 | 公告 ID |
| `data.content[].titleZhHant` | `String` | 否 | 繁体中文标题 |
| `data.content[].titleEn` | `String` | 否 | 英文标题 |
| `data.content[].publisher` | `String` | 否 | 发布者（不区分语言） |
| `data.content[].publishTime` | `String` | 否 | 发布时间，`yyyy-MM-dd HH:mm:ss`（`GMT+8`） |
| `data.totalElements` | `Long` | 否 | 符合可见性条件的公告总数 |
| `data.totalPages` | `Integer` | 否 | 总页数 |
| `data.number` | `Integer` | 否 | 当前页码，**从 `0` 开始**（`pageNo - 1`） |
| `data.size` | `Integer` | 否 | 每页条数 |
| `data.numberOfElements` | `Integer` | 否 | 当前页实际返回条数 |
| `data.first` | `Boolean` | 否 | 是否为第一页 |
| `data.last` | `Boolean` | 否 | 是否为最后一页 |
| `data.sort` | `Array<Object>` | 否 | 排序信息，固定为 `publishTime DESC`、`id DESC` 两项 |

列表项**不包含** `contentZhHant` / `contentEn` / `status` / `createTime` / `updateTime`。

#### 成功响应示例

```json
{
  "code": 0,
  "message": "success",
  "total": null,
  "data": {
    "content": [
      {
        "id": 3,
        "titleZhHant": "平台例行維護公告",
        "titleEn": "Scheduled Platform Maintenance",
        "publisher": "RWA Launchpad",
        "publishTime": "2026-11-20 09:30:00"
      },
      {
        "id": 2,
        "titleZhHant": "新專案上線公告",
        "titleEn": "New Project Launch Announcement",
        "publisher": "RWA Launchpad",
        "publishTime": "2026-11-19 18:00:00"
      }
    ],
    "totalElements": 2,
    "totalPages": 1,
    "number": 0,
    "size": 10,
    "numberOfElements": 2,
    "first": true,
    "last": true,
    "sort": [
      {"direction": "DESC", "property": "publishTime", "ignoreCase": false, "nullHandling": "NATIVE", "ascending": false, "descending": true},
      {"direction": "DESC", "property": "id", "ignoreCase": false, "nullHandling": "NATIVE", "ascending": false, "descending": true}
    ]
  }
}
```

无可见公告时返回 `code=0` 且 `data.content=[]`、`data.totalElements=0`。

#### 异常与错误返回

| 场景 | `code` | `message`（示例或 i18n Key） | 前端处理建议 |
| --- | --- | --- | --- |
| `pageNo < 1`、`pageSize < 1` 或 `pageSize > 50` | `500` | `参数错误` / `Parameter error`（i18n Key：`WRONG_PARAM`） | 收敛分页控件取值范围并提示 |
| 可见公告的标题、发布者或发布时间为空（库内脏数据） | `500` | `未知错误`（服务端日志含记录 ID 与缺失列名） | 展示加载失败提示并联系运维排查数据 |

### 3.2 查询公告详情（`新增`）

- **完整路径**：`GET /deposit/platformAnnouncement/detail`（相对路径 `/platformAnnouncement/detail`）
- **传参方式**：`Query 参数`
- **请求头**：同 3.1
- **鉴权与切面**：无

#### 请求参数

| 参数名 | 位置 | 类型 | 必填 | 默认值 | 约束 / 格式 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| `id` | Query | `Long` | 是 | - | 公告 ID | 缺失时返回 `WRONG_PARAM`；不存在或不可见时返回 `INFO_NOT_EXIST` |

#### 请求示例

```http
GET /deposit/platformAnnouncement/detail?id=3 HTTP/1.1
Accept: application/json
```

#### 响应结构体

外层固定为 `MessageResult`：

| 字段路径 | 类型 | 可空 | 说明 |
| --- | --- | --- | --- |
| `code` | `Integer` | 否 | 状态码：`0` 成功，非 `0` 失败 |
| `message` | `String` | 否 | 状态或错误描述 |
| `total` | `Long` | 是 | 固定为 `null` |
| `data` | `Object` | 是 | 公告详情对象；`id` 不存在或不可见时 `data=null` 且返回错误码 |
| `data.id` | `Long` | 否 | 公告 ID |
| `data.titleZhHant` | `String` | 否 | 繁体中文标题 |
| `data.titleEn` | `String` | 否 | 英文标题 |
| `data.contentZhHant` | `String` | 否 | 繁体中文正文（富文本 HTML，原样返回） |
| `data.contentEn` | `String` | 否 | 英文正文（富文本 HTML，原样返回） |
| `data.publisher` | `String` | 否 | 发布者（不区分语言） |
| `data.publishTime` | `String` | 否 | 发布时间，`yyyy-MM-dd HH:mm:ss`（`GMT+8`） |

详情**不包含** `status` / `createTime` / `updateTime`。

#### 成功响应示例

```json
{
  "code": 0,
  "message": "success",
  "total": null,
  "data": {
    "id": 3,
    "titleZhHant": "平台例行維護公告",
    "titleEn": "Scheduled Platform Maintenance",
    "contentZhHant": "<article><h1>平台例行維護公告</h1><p>平台將於 2026-11-21 02:00-04:00 (GMT+8) 進行例行維護。</p><table><tbody><tr><td><strong>影響範圍</strong></td><td>充值與提現暫停</td></tr></tbody></table></article>",
    "contentEn": "<article><h1>Scheduled Platform Maintenance</h1><p>The platform will undergo routine maintenance from 02:00 to 04:00 on 2026-11-21 (GMT+8).</p><table><tbody><tr><td><strong>Impact</strong></td><td>Deposits and withdrawals paused</td></tr></tbody></table></article>",
    "publisher": "RWA Launchpad",
    "publishTime": "2026-11-20 09:30:00"
  }
}
```

#### 异常与错误返回

| 场景 | `code` | `message`（示例或 i18n Key） | 前端处理建议 |
| --- | --- | --- | --- |
| 未传 `id` 参数 | `500` | `参数错误` / `Parameter error`（i18n Key：`WRONG_PARAM`） | 检查调用参数 |
| `id` 不存在、`status=0`（已下线）或 `publish_time` 未到 | `500` | `信息不存在` / `Information does not exist`（i18n Key：`INFO_NOT_EXIST`） | 展示「公告不存在或已下线」空态；无需区分具体原因 |
| 可见公告的标题、正文、发布者或发布时间为空（库内脏数据） | `500` | `未知错误`（服务端日志含记录 ID 与缺失列名） | 展示加载失败提示并联系运维排查数据 |

## 4. 联调与注意事项

- **调用顺序与前置依赖**：无前置接口依赖；典型链路为先调 `/page` 取列表，再按列表项 `id` 调 `/detail` 取正文。两接口共用同一套可见性规则，前端无需（也无法）通过详情接口绕过列表可见范围。
- **富文本渲染与 XSS**：`contentZhHant` / `contentEn` 为服务端原样返回的富文本 HTML（含 `<article>`、`<section>`、`<table>`、`<strong>` 等标签与 `&amp;` 等实体字符），不做转义或截断。此为存储型富文本，前端必须在受控渲染容器内展示并做好常规 XSS 防护。
- **多语言**：一条公告同时携带繁中、英文两组字段，前端按当前语言环境展示 `titleZhHant`/`contentZhHant` 或 `titleEn`/`contentEn`；`publisher` 不区分语言。
- **分页约定**：请求 `pageNo` 从 `1` 开始，响应 `data.number` 从 `0` 开始（`number = pageNo - 1`）；`pageSize` 上限 `50`。
- **时间与精度约定**：时间字段格式为 `yyyy-MM-dd HH:mm:ss`（`GMT+8`）。`publish_time` 列为不带时区的 `DATETIME`，录入时按北京时间（GMT+8）填写；可见性判断依赖 JDBC URL 中的 `serverTimezone=Asia/Shanghai`（`config/application-launcher.properties.example` 已包含），否则「到点生效」会按数据库会话时区偏移。
- **环境与数据前提**：部署新版 `deposit-api` 前，必须先在目标 MySQL 库执行 `sql/create_platform_announcement.sql` 完成 `platform_announcement` 建表，否则接口查询将报错。本次不提供写接口或管理后台，公告由运营通过 SQL 直接写库；未到 `publish_time` 或 `status=0` 的记录不会对外展示，可用于提前录入定时发布。
- **运营录入示例（仅作说明，未在任何环境执行）**：

```sql
INSERT INTO `platform_announcement`
  (`title_zh_hant`, `title_en`, `content_zh_hant`, `content_en`, `publisher`, `publish_time`, `status`)
VALUES (
  '平台例行維護公告',
  'Scheduled Platform Maintenance',
  '<article><h1>平台例行維護公告</h1><p>平台將於 2026-11-21 02:00-04:00 (GMT+8) 進行例行維護，期間充值與提現暫停。</p></article>',
  '<article><h1>Scheduled Platform Maintenance</h1><p>The platform will undergo routine maintenance from 02:00 to 04:00 on 2026-11-21 (GMT+8); deposits and withdrawals will be paused.</p></article>',
  'RWA Launchpad',
  '2026-11-20 09:30:00',
  1
);
```
