import { optimismPortalABI } from '../constants/abi.js'
import type { Address, Hex } from 'viem'

// TODO(Wilson): Consider moving these to actions/wallet/L1/types
export const ABI = optimismPortalABI
export const FUNCTION = 'depositERC20Transaction'

export type DepositCustomGasParameters = {
  to: Address
  mint: bigint
  value: bigint
  gasLimit: number
  isCreation?: boolean
  data?: Hex
}
