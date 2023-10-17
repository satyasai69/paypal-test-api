import React, { useState, useEffect} from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber, message } from "antd";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { goerli } from "viem/chains";
import ABI from "../api/abi.json";

function RequestAndPay (requests, getNameAndBalance) {


    const contractadd = "0xb5Ce67ec775BDD14c62BEC526a4DdabCcE54610C"

    const { config } = usePrepareContractWrite({
        chanId: goerli.id,
        address: contractadd,
        abi: ABI,
        functionName: "payRequest",
        args: [0]
    })

    const { write, data } = useContractWrite(config)

    const { config: configRequest } = usePrepareContractWrite({
        chanId: goerli.id,
        address: contractadd,
        abi: ABI,
        functionName: "createRequest",
         args: [requestAddress, requestAmount, requestMessage]
    })

    const {write:writeRequest, data:dataRequest} = useContractWrite(configRequest)

    return(
        <>

        </>
    )
}

export default RequestAndPay;