import axios from 'axios';
import { Chains } from '../types';

const backend = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
    validateStatus: function (status) {
        return status >= 200 && status <= 302
    }
})

export const getBalance = async (address: string, chain: Chains): Promise<string> => await backend.get(`/token/balance/${chain}/${address}`);
export const getTransactions = async (address: string, chain: string) => await backend.get(`/token/transactions/${chain}/${address}`);
