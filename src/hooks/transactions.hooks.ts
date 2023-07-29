import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getTransactions } from "../api";

export function useTransactions(address: string | undefined, chain: string | undefined) {
    const { isLoading, isError, data, error } = useQuery({ queryKey: ['transactions', chain], queryFn: () => getTransactions(address as string, chain as string), enabled: !!(address && chain) })
    if (isError) {
        if (error instanceof Error) toast.error(error.message, { autoClose: 5000 })
        else {
            toast.error('Errors while fetching data. Please check and try again.', { autoClose: 5000 })
        }
    }
    return { isLoading, data }
};
