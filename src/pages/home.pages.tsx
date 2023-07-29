import { Web3Button } from "@web3modal/react";
import { useState } from "react";
import { Transactions, Transfer } from "../components";
import { useWallet } from "../context/web3.context";

export default function Home() {
  const [tab, setTab] = useState(0);
  const { isConnected } = useWallet();

  const tabs = [
    {
      name: "Transfer",
      href: "#",
      component: <Transfer />,
    },
    {
      name: "Purchase",
      href: "#",
      component: <Transactions />,
    },
    {
      name: "Transactions",
      href: "#",
      component: <Transactions />,
    },
  ];

  return (
    <div className="w-full max-w-6xl md:my-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select tab
        </label>
        <select
          id="tabs"
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {tabs.map((_tab, index) => (
            <option
              key={index}
              onClick={() => setTab(index)}
              className={`${tab === index ? "text-blue-700" : ""}`}
            >
              {_tab.name}
            </option>
          ))}
        </select>
      </div>
      <ul
        className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400"
        id="fullWidthTab"
        data-tabs-toggle="#fullWidthTabContent"
        role="tablist"
      >
        {tabs.map((_tab, index) => (
          <li key={index} className="flex-1">
            <button
              onClick={() => setTab(index)}
              type="button"
              role="tab"
              aria-controls="stats"
              aria-selected="true"
              className={`${
                tab === index
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              } w-full py-4 px-1 font-medium focus:outline-none`}
            >
              {_tab.name}
            </button>
          </li>
        ))}
      </ul>
      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600"
      >
        <div
          className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
          {isConnected ? (
            tabs[tab].component
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-6">
              <h1 className="text-2xl font-medium text-gray-700 dark:text-white">
                Please connect your wallet to continue
              </h1>
              <Web3Button />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
