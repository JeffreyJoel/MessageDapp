import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import contractABI from "./abi.json";
import { useState } from "react";

function App() {
  const [text, setText] = useState();
  const [retievedMessage, setRetrievedMessage] = useState();

  const contractAddress = "0xBebbe35279130f5A43BC3510A6296fB7e1Fee4F5";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      //  console.log(contract.getDeployedCode());

      try {
        const transaction = await contract.getMessage();
        console.log(transaction);
        setRetrievedMessage(transaction);
        console.log("message gotten");
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function setMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      //  console.log(contract.getDeployedCode());

      try {
        const transaction = await contract.setMessage(text);
        await transaction.wait();
        console.log(`message set to ${text}`);
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setMessage();
            }}
          >
            Submit
          </button>
        </div>

        <button
          onClick={() => {
            getMessage();
          }}
        >
          Get message
        </button>

        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
         <p>{retievedMessage}</p>
      </header>
     
    </div>
  );
}

export default App;
