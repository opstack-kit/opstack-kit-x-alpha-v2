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
import { type RawOrContractAddress, resolveAddress } from '../../../types/addresses.js'
import { ABI, type DepositCustomGasParameters, FUNCTION } from '../../../types/depositCustomGas.js'
import type { L1WriteActionBaseType } from '../../../types/l1Actions.js'

export type WriteDepositCustomGasParameters<
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  _chainId = TChain extends Chain ? TChain['id'] : number,
> =
  & { args: DepositCustomGasParameters; optimismPortalABI: RawOrContractAddress<_chainId> }
  & L1WriteActionBaseType<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
    TChain,
    TAccount,
    TChainOverride
  >

/**
 * Deposits ERC20 tokens to L2 using the standard bridge
 * @param parameters - {@link WriteDepositCustomGasParameters}
 * @returns A [Transaction Hash](https://viem.sh/docs/glossary/terms.html#hash). {@link WriteContractReturnType}
 */
export async function writeDepositCustomGas< // writeDepositCustomGas
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    args: { to, mint, value, gasLimit, isCreation = false, data = '0x' },
    optimismPortalABI,
    ...rest
  }: WriteDepositCustomGasParameters<
    TChain,
    TAccount,
    TChainOverride
  >,
): Promise<WriteContractReturnType> {
  return writeContract(client, {
    address: resolveAddress(optimismPortalABI),
    abi: ABI,
    functionName: FUNCTION,
    args: [to, mint, value, gasLimit, isCreation, data],
    ...rest,
  } as unknown as WriteContractParameters<
    typeof ABI,
    typeof FUNCTION,
    ContractFunctionArgs<typeof ABI, 'nonpayable', typeof FUNCTION>,
    TChain,
    TAccount,
    TChainOverride
  >)
}
