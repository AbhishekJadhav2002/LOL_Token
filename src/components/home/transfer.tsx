import { useState } from "react";
import { toast } from "react-toastify";
import { useWallet } from "../../context/web3.context";

export default function Transfer() {
  const { balance, transfer } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const form = e.currentTarget;
      const address = form.address.value;
      const value = form.amount.value;
      const tx = await transfer(address, value);
      toast.success(`Transaction sent: ${tx}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      autoComplete="off"
      autoCorrect="off"
      className="max-w-3xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 text-center">
        <span className="px-3 py-1 text-lg leading-0 rounded-lg bg-blue-800 outline-dashed outline-2 outline-offset-2 outline-blue-700">
          LOL Token Balance: {balance}
        </span>
      </div>
      <div className="mb-6">
        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter receiver address
        </label>
        <input
          type="text"
          id="address"
          className="w-full font-[Consolas] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="0x00000000"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="amount"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter amount (in ether)
        </label>
        <input
          type="amount"
          id="amount"
          className="w-full font-[Consolas] tracking-wide dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="0.0000"
          required
        />
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input id="terms" type="checkbox" value="" className="" required />
        </div>
        <label
          htmlFor="terms"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="/terms"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loading ? "Loading..." : "Send Transaction"}
      </button>
    </form>
  );
}
