
import { useState, useEffect } from "react";
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

  console.log(balance)

 /*async function getNameandBalance() {
    try {
      // Construct the URL with query parameters
      const queryParams = new URLSearchParams({ userAddress: address }).toString();
      //const apiUrl = `http://localhost:3001/api/getNameAndBalance?${queryParams}`;
  
      // Make a GET request using the fetch function
      const response = await fetch("http://localhost:3000/api/getNameAndBalance?userAddress=0x2CA7AD0205B8aA8c3ccf778C80474d6aC23eeADD");
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
  
      console.log(responseData.requests);
  
      if (responseData.name[1]) {
        setName(responseData.name[0]);
      }
  
      setBalance(responseData.balance);
      setRequest(responseData.requests);
      sethistory(responseData.history);
    } catch (error) {
      console.error('Error:', error);
    }
  }*/

  useEffect(() => {
   if (!isConnected) return;
   getNameandBalance();
  }, [isConnected])

  return (
     
      <div>
        <ConnectButton />
        {isConnected ? (
          <div>
          <h1>{address} ,  {balance}</h1>
          <h1>hi</h1>
          </div>
        ) : (
          <h1>place connet web3 wallet</h1>
        )}
        
      </div>
    
  )
}
