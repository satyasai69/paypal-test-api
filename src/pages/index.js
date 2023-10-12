
import { useState, useEffect } from "react";
import RecentActivity from "./componets/RecentActivity" //<RecentActivity history={history}/>
import AccountDetails from "./componets/AccountDetails";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useConnect, useAccount, useDisconnect } from "wagmi";
import axios from 'axios';




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

  
  
  return (
    <>
      <div>
       <div>
        <ConnectButton />
       </div>
       <div>
        {isConnected ? (
          <div>
            <h1>{address}</h1>
            <h1>balance = {balance}</h1>
            <AccountDetails address={address}
                  name={name}
                  balance={balance}/>
          </div>
        ) : (
          <div>
           <h1>place connet web3 wallet</h1>
          </div>
        )}
       </div>
      </div>
    </>
  )
}
