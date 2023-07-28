import { ethers } from "ethers";
import { createContext, useContext, useEffect } from "react";
import {
  useAccount,
  useBalance,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import abi from "../config/abi/LOL.abi.json";
import { tokens as _networks } from "../config/data";
import { LOLAbi, NODE_ENV, Props, Token } from "../types";

const token = _networks[process.env.NODE_ENV as NODE_ENV]["bsc"] as Token;

const walletContext = createContext({
  token,
  isConnected: false as boolean,
  balance: "0" as string | undefined,
  isLoading: false as boolean,
  address: "" as string | undefined,
  chainId: 0 as number | undefined,
  contract: {} as LOLAbi | undefined,
  transfer: async (to: string, amount: string) => "" as string,
});

const WalletProvider = ({ children }: Props): JSX.Element => {
  const { Provider } = walletContext;
  const { address, isConnected } = useAccount({
    onDisconnect() {
      window.location.reload();
    },
  });
  const { chain } = useNetwork();
  const provider = useProvider({ chainId: token.id });
  const { data: signer } = useSigner({ chainId: token.id });
  const {
    data: tokenBalance,
    isLoading,
    isError: isBalanceError,
  } = useBalance({
    address: address,
    token: token.contract as any,
  });
  const contract = useContract({
    address: token.contract,
    abi,
    signerOrProvider: signer,
  }) as LOLAbi;
  const { switchNetwork } = useSwitchNetwork({ chainId: token.id });

  const transfer = async (to: string, amount: string) => {
    try {
      if (!contract) {
        throw new Error("Contract not found");
      }
      const decimals = await contract?.decimals();
      const weiValue = ethers.utils.parseUnits(amount, decimals);
      const tx = await contract?.transfer(to, weiValue, {
        gasLimit: token.gasLimit,
      });
      await tx?.wait();
      return tx.hash;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (chain && chain.id !== token.id && switchNetwork) {
      switchNetwork();
    }
  }, [chain, switchNetwork]);

  useEffect(() => {
    provider
      .getCode(token.contract)
      .then((code) => {
        if (code === "0x") {
          console.log("Invalid token address");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [provider]);

  useEffect(() => {
    if (isBalanceError) {
      console.log("Error fetching balance");
    }
  }, [isBalanceError]);

  return (
    <Provider
      value={{
        token,
        isConnected,
        balance: tokenBalance?.formatted,
        isLoading,
        address,
        chainId: chain?.id,
        contract,
        transfer,
      }}
    >
      {children}
    </Provider>
  );
};

export default WalletProvider;

export const useWallet = () => useContext(walletContext);
