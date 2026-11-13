import { postForm } from './client.ts'
import type { PageParams, PageResult } from './types.ts'

export interface RwaProject {
  id: number
  hash: string
  name: string
  symbol: string
  address: string
  creatorAddress: string
  contractAddress: string
  coinContractAddress: string
  presaleAddress: string | null
  tradeAddress: string | null
  backingPoolAddress: string | null
  pledgeContractAddress: string | null
  feeRecipient: string | null
  backingReceiver: string | null
  devLpReceiver: string | null
  secretAddress: string | null
  chatAt: string
  coinImg: string | null
  fullName: string | null
  coinPrecision: string | null
  network: string | null
  issuer: string | null
  officialWebsite: string | null
  whitePaperLink: string | null
  contractInformation: string | null
  releaseDeclaration: string | null
  website: string | null
  telegram: string | null
  twitter: string | null
  zhIntroduction: string | null
  enIntroduction: string | null
  meta: string | null
  status: number
  coinStatus: number
  launchType: number
  isInternalExchange: number
  canSwap: number
  top: number | null
  auditRemark: string | null
  auditTime: string | null
  /** 格式 `YYYY-MM-DD HH:mm:ss` */
  createTime: string
  startTime: string | null
  endTime: string | null
  unit: number | null
  minTxFee: number | null
  maxTxFee: number | null
  feeLogicType: number
  marketCap: number
  issuePrice: number
  totalIssuance: number
  calculationRate: number
  issuanceCycle: number | null
  minHoldBalance: number
  realPrice: number
  presalePrice: number
  tradePrice: number
  domesticPrice: number
  totalSupply: number | null
  remainSupply: string | null
  maxTotalNum: number | null
  softCapRate: number | null
  presaleMaxNum: number | null
  insideMaxNum: number | null
  lgeCopies: number | null
  rate: number
  vestingDis: number | null
  hardcap: number | null
  softcap: number | null
  totalRaise: number | null
  vestingInfo: string | null
  allowedTiers: string | null
  miniInvestment: number | null
  tokenGeneration: string | null
  soft: number | null
  thb: string | null
  tokenAmount: number | null
  maxBuyPerWallet: number
  vestingDelay: number | null
  vestingRate: number | null
  backingShare: number | null
  userLpShare: number | null
  devLpShare: number | null
  basePresaleCount: number | null
  withdrawFeeRate: number
  minWithdrawAmount: number
  maxWithdrawAmount: number
  buyTax: number
  sellTax: number
  taxDuration: number
  antiFarmerDuration: number
  liqExpectedOutputAmount: string
  salt: string
  creationFee: number
  presaleTokenPrice: number | null
  minLiquidityAmount: number | null
  slippage: number | null
  creatorBuyTokens: number | null
  buybackVaultEnabled: number
  mode: number
  triggerType: number
  firstExecuteAt: number | null
  intervalSeconds: number | null
  triggerAmount: number | null
  buybackAmount: number | null
  marketBps: number
  deflationBps: number
  lpBps: number
  dividendBps: number
  minDividendBalance: number | null
  lastExecuteAt: number | null
  pair: unknown
}

export type RwaProjectDetail = RwaProject

export function getRwaProjectDetail(id: number, signal?: AbortSignal) {
  return postForm<RwaProjectDetail>(
    'deposit/exSwap/rwa/swapCoinIssuedDetail',
    { id },
    signal,
  )
}

export function listRwaProjects(params: PageParams, signal?: AbortSignal) {
  return postForm<PageResult<RwaProject>>(
    'deposit/exSwap/rwa/swapCoinIssuedPage',
    { ...params, model: 1 },
    signal,
  )
}
