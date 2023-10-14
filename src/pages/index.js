
import { useState, useEffect } from "react";
import RecentActivity from "./components/RecentActivity" 
import AccountDetails from "./components/AccountDetails";
import Unconnectwall from "./components/Unconnect";
import { ConnectButton } from '@rainbow-me/rainbowkit'; 
import { useConnect, useAccount, useDisconnect } from "wagmi";
import axios from 'axios';
import { Layout } from "antd";





export default function Home() {

  const { address, isConnected } = useAccount();
  //console.log(address)

  const[name, setName] = useState("---");
  const [balance, setBalance] = useState("---");
  const [requests, setRequests] = useState("---");
  const [history, sethistory] = useState("---");

  //console.log(balance)

  async function getNameandBalance () {
    try{
    const res = await axios.get(`http://localhost:3000/api/getNameAndBalance?userAddress=${address}`); //${address}`);//, {params: { userAddress: address},});

    const response = res.data;
    //console.log(response.balance);
    if(response.name[1]){
      setName(response.name[0]);
    }
    setBalance(String(response.balance));
    setRequests(response.requests);
    sethistory(response.history)
   }catch(error) {
    console.error("error", error)
   }

  }

  //console.log(balance)


  useEffect(() => {
   if (!isConnected) return;
   getNameandBalance();
  }, [isConnected])

  const hist = Array.isArray({history});

  
  return (<div>
       <header>
         <div>
         <ConnectButton />
         </div>
      </header>
        <div>
         {isConnected ? (
          <div>
            <h1>{address}</h1>
            <h1>balance = {balance}</h1>
            <h1>username = {name}</h1>
            <AccountDetails address={address}
                  name={name}
                  balance={balance}/>
            <RecentActivity history= {history}/>
          </div>
         ) : (
          <Unconnectwall/>
         )}
       </div>
      </div>
  );
}

