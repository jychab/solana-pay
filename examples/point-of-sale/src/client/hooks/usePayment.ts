import { PublicKey, TransactionSignature } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { createContext, useContext } from 'react';
import { Confirmations } from '../types';

export enum PaymentStatus {
    New = 'New',
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    Valid = 'Valid',
    Invalid = 'Invalid',
    Finalized = 'Finalized',
}

export interface Reward {
    name: string;
    symbol: string;
    description: string;
    image: string;
    receiverAddress: string;
}

export interface PaymentContextState {
    amount: BigNumber | undefined;
    setAmount(amount: BigNumber | undefined): void;
    memo: string | undefined;
    setMemo(memo: string | undefined): void;
    reference: PublicKey | undefined;
    signature: TransactionSignature | undefined;
    status: PaymentStatus;
    confirmations: Confirmations;
    progress: number;
    url: URL;
    reset(): void;
    generate(): void;
    reward: Reward | undefined;
    setReward(reward: Reward | undefined): void;
}

export const PaymentContext = createContext<PaymentContextState>({} as PaymentContextState);

export function usePayment(): PaymentContextState {
    return useContext(PaymentContext);
}
