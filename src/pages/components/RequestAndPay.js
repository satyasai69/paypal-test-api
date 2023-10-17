import React, { useState, useEffect} from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber, message } from "antd";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { goerli } from "viem/chains";
import ABI from "../api/abi.json";

function RequestAndPay (requests, getNameAndBalance) {


    const contractadd = "0xb5Ce67ec775BDD14c62BEC526a4DdabCcE54610C"

    const [ PayModal, setPayModal ] = useState(false);
    const [ requestModal, setrequestModal ] = useState(false);
  

    const { config } = usePrepareContractWrite({
        chanId: goerli.id,
        address: contractadd,
        abi: ABI,
        functionName: "payRequest",
        args: [0],
        overrider: {
            value: String(Number(requests["1"][0]*1e18)),
        }
    })

    const { write, data } = useContractWrite(config)

    const { isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    const { config: configRequest } = usePrepareContractWrite({
        chanId: goerli.id,
        address: contractadd,
        abi: ABI,
        functionName: "createRequest",
         args: [requestAddress, requestAmount, requestMessage]
    })

    const {write:writeRequest, data:dataRequest} = useContractWrite(configRequest)

    const { isSuccess: isSuccessRequest } = useWaitForTransaction({
        hash: dataRequest?.hash,
    })


    const showPayModal = () =>{
        setPayModal(true);
    }

    const hidePayModal = () => {
        setPayModal(false);
    }

    const showRequestPay = () => {
        setrequestModal(true);
    }

    const hideRequestModal = () => {
        setrequestModal(false)
    }

useEffect(() =>{
    if(isSuccess || isSuccessRequest) {
        getNameAndBalance();
    }
} , [isSuccess, isSuccessRequest])

    return(
        <>
         
        </>
    )
}

export default RequestAndPay;