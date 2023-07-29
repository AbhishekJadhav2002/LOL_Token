import { Suspense, useMemo, useState } from "react";
import {
  TableColumn,
  TableColumnBase,
} from "react-data-table-component/dist/src/DataTable/types";
import { useWallet } from "../../context/web3.context";
import { useTransactions } from "../../hooks/transactions.hooks";
import Table from "../table";

export default function Transactions() {
  const [eventName, setEventName] = useState("Transfer");
  const { address, chainId } = useWallet();
  const { isLoading, data } = useTransactions(
    address,
    chainId === 97 || chainId === 56 ? "bsc" : ""
  );

  const column = useMemo(
    (): TableColumn<TableColumnBase>[] => [
      {
        name: "Event",
        selector: (row: any) => row["name"],
        sortable: true,
      },
      {
        name: "Chain",
        selector: (row: any) => row["chain"],
      },
      {
        name: "args",
        selector: (row: any) => row["args"],
        format: (row: any) => (
          <pre className="whitespace-pre-wrap">[{row["args"][0]}]</pre>
        ),
      },
      {
        name: "Timestamp",
        selector: (row: any) => row["createdAt"],
        sortable: true,
      },
    ],
    []
  );

  const expandableRowsComponent = ({ data: { args } }: any) => (
    <p className="px-6 py-2 text-sm">
      <strong>args : </strong>
      {args.map((arg: any, index: number) => (
        <pre className="whitespace-pre-wrap" key={index}>
          {typeof arg === "object" ? (
            Object.keys(arg).map((key) => (
              <code key={key}>
                {key}: {arg[key].toString()}{" "}
              </code>
            ))
          ) : (
            <code>{arg}</code>
          )}
        </pre>
      ))}
    </p>
  );

  const _data = useMemo(() => {
    if (eventName === "Transfer") {
      return data?.data?.filter((item: any) => item.name === "Transfer");
    } else if (eventName === "Approval") {
      return data?.data?.filter((item: any) => item.name === "Approval");
    } else if (eventName === "Mint") {
      return data?.data?.filter((item: any) => item.name === "Mint");
    } else {
      return [];
    }
  }, [eventName, data]);

  return (
    <>
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
        Select Event
      </h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="transfer-radio"
              type="radio"
              value="Transfer"
              name="list-radio"
              className="opacity-0 absolute"
              checked={eventName === "Transfer"}
              onClick={() => setEventName("Transfer")}
            />
            <label
              htmlFor="transfer-radio"
              className={`w-full text-center py-3 ml-2 text-sm font-medium cursor-pointer ${
                eventName === "Transfer"
                  ? "text-blue-900 dark:text-blue-500"
                  : "text-gray-900 dark:text-gray-300"
              }`}
            >
              Transfer{" "}
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="approval-radio"
              type="radio"
              value="Approval"
              name="list-radio"
              className="opacity-0 absolute"
              checked={eventName === "Approval"}
              onClick={() => setEventName("Approval")}
            />
            <label
              htmlFor="approval-radio"
              className={`w-full text-center py-3 ml-2 text-sm font-medium cursor-pointer ${
                eventName === "Approval"
                  ? "text-blue-900 dark:text-blue-500"
                  : "text-gray-900 dark:text-gray-300"
              }`}
            >
              Approval
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="mint-radio"
              type="radio"
              value="Mint"
              name="list-radio"
              className="opacity-0 absolute"
              checked={eventName === "Mint"}
              onClick={() => setEventName("Mint")}
            />
            <label
              htmlFor="mint-radio"
              className={`w-full text-center py-3 ml-2 text-sm font-medium cursor-pointer ${
                eventName === "Mint"
                  ? "text-blue-900 dark:text-blue-500"
                  : "text-gray-900 dark:text-gray-300"
              }`}
            >
              Mint
            </label>
          </div>
        </li>
      </ul>

      <Suspense fallback={<h1>Loading...</h1>}>
        <Table
          outerClassName="mt-4"
          loading={isLoading}
          columns={column}
          data={_data}
          keyField="_id"
          expandableRows
          expandableRowsComponent={expandableRowsComponent}
        />
      </Suspense>
    </>
  );
}
