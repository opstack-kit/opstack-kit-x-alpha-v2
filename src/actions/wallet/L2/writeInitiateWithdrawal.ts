import type {
  Account,
  Chain,
  ContractFunctionArgs,
  Transport,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'
import { writeContract } from 'viem/actions'
import type { L2WriteContractParameters } from '../../../types/l2Actions.js'
import { opStackL2ChainContracts, OpStackL2Contract } from '../../../types/opStackContracts.js'
import { ABI, FUNCTION, type WithdrawToInitiateParameters } from '../../../types/initiateWithdrawal.js'

export type WriteWithdrawInitiateParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
> =
  & { args: WithdrawToInitiateParameters }
  & L2WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'payable', typeof FUNCTION>,
    TChain,
    TAccount,
    TChainOverride
  >

/**
 * Withdraws ERC20 tokens to an L1 address.
 *
 * @param {Address} target the address to withdraw to on L1
 * @param {Bigint} gasLimit the minimum gas limit for the withdrawal
 * @param {Hex} [data] the extra data for the withdrawal
 *
 * @returns {Promise<Hash>} the hash of the transaction
 */
export async function writeInitiateWithdrawal<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
>(client: WalletClient<Transport, TChain, TAccount>, {
  args: { target, gasLimit, data = '0x' },
  amount,
  ...rest
}: WriteWithdrawInitiateParameters<
  TChain,
  TAccount,
  TChainOverride
> & { amount: bigint }
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    abi: ABI,
    functionName: FUNCTION,
    args: [target, gasLimit, data],
    address: opStackL2ChainContracts[OpStackL2Contract.L2ToL1MessagePasser].address,
    value: amount,
    ...rest,
  } as unknown as WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<
      typeof ABI,
      'payable',
      typeof FUNCTION
    >,
    TChain,
    TAccount,
    TChainOverride
  >)
}
