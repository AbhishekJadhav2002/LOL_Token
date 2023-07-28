import { Web3Modal } from "@web3modal/react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { WagmiConfig } from "wagmi";
import "./App.css";
import { Navbar } from "./components";
import { ethereumClient, wagmiClient } from "./config/web3config";
import WalletProvider from "./context/web3.context";
import { Home } from "./pages";

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <WalletProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <ToastContainer />

        <Web3Modal
          projectId={process.env.REACT_APP_WEB3_PROJECT_ID as string}
          ethereumClient={ethereumClient}
          themeVariables={{
            "--w3m-accent-color": "#2563eb",
          }}
        />
      </WalletProvider>
    </WagmiConfig>
  );
}

export default App;
