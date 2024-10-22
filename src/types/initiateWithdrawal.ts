import { l2ToL1MessagePasserABI } from '../constants/abi.js'
import type { Address, Hex } from 'viem'

// export const OVM_ETH = '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'

export const ABI = l2ToL1MessagePasserABI
export const FUNCTION = 'initiateWithdrawal'

export type WithdrawToInitiateParameters = {
  target: Address
  gasLimit?: number
  data?: Hex
}

// export type WithdrawInitiateWithdrawalParameters = Omit<WithdrawToInitiateParameters, 'l2Token'>
