// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// /api/getNameAndBalance?userAddress=

import Moralis from "moralis";
import ABI from "./abi.json";

// Initialize Moralis with your API key
Moralis.start({
  apiKey: process.env.MORALIS_KEY || eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImMxNWYzNmExLTllZmEtNGVmMy1iZTVjLWEyNzVjNjRmOTRkOSIsIm9yZ0lkIjoiMzYwNTA0IiwidXNlcklkIjoiMzcwNTAxIiwidHlwZUlkIjoiZGEyM2NiYjgtNTU3MC00NzVlLWJmNWYtMTJhM2RhMzAwNmNjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTY5MTcyNzksImV4cCI6NDg1MjY3NzI3OX0.XGj3NLimcD8p2V7gO1ZORsRdqXQYUMmZ5IugzJNeVXo // Replace with your Moralis API key
});

// Utility function to convert an array to objects
async function convertArrayToObjects(arr) {
  // Your conversion logic here
  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    type: transaction[0],
    amount: transaction[1],
    message: transaction[2],
    address: `${transaction[3].slice(0,4)}...${transaction[3].slice(0,4)}`,
    subject: transaction[4],
  }));

  return dataArray.reverse();
}

// Define the API route handler
export default async function handler(req, res) {
  // Check if the HTTP method is GET
  if (req.method !== "GET") {
    return res.status(405).end(); // Method not allowed
  }

  // Extract the userAddress from the query parameters
  const { userAddress } = req.query;

  try {
    // Query Moralis to get user information
    const response = await Moralis.EvmApi.utils.runContractFunction({
      chain: "0x5",
      address: "0x5371066fE7fbd627F157e096d73940d1a897F3bB", // Replace with your contract address
      functionName: "getUserName",
      abi: ABI,
      params: { _user: userAddress },
    });

    // Extract the user's name from the Moralis response
    const jsonResponseName = response.raw;

    // Continue with your logic here...
    const secresponse = await Moralis.EvmApi.balance.getNativeBalance({
      chain: "0x5",
      address: userAddress, // Replace with your contract address
    })

    const jsonResponsebal = (secresponse.raw.balance / 1e18).toFixed(2)

    /*const threeresponse = await Moralis.EvmApi.token.getTokenPrice({
      address : "0x024f245F740667fF208068d593E4C7f8f26416f2", //DAI testnet address
    })
   
     const  jsonresponseDoller = (threeresponse.raw.usdPrice * jsonResponsebal).toFixed(2);
    */
     const fourResponse = await Moralis.EvmApi.utils.runContractFunction({
      chain: "0x5",
      address: "0x5371066fE7fbd627F157e096d73940d1a897F3bB",
      functionName: "getAllHistroy",
      abi: ABI,
      params: { _user: userAddress },
    });
  
    const jsonResponseHistory = convertArrayToObjects(fourResponse.raw);
   
   
    const fiveResponse = await Moralis.EvmApi.utils.runContractFunction({
      chain: "0x5",
      address: "0x5371066fE7fbd627F157e096d73940d1a897F3bB",
      functionName: "getMyRequests",
      abi: ABI,
      params: { _user: userAddress },
    });
  
    const jsonResponseRequests = fiveResponse.raw;

   
    // Prepare the JSON response with user data
    const jsonResponse = {
      name: jsonResponseName,
      balance:  jsonResponsebal,
      //dollars: jsonresponseDoller, 
      history: jsonResponseHistory, 
      requests: jsonResponseRequests, 
      // Add other properties here...
    };

    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
