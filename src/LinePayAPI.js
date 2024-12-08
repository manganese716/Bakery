import { v4 as uuidv4 } from "uuid";
import { generateSignature } from "./utiles";

const proxyUrl = "http://localhost:3000/api/proxy";

export async function handlePaymentAPI({ linePayBody }) {
    const nonce = uuidv4();

    const lineRequestURI = "/v3/payments/request";

    const signature = generateSignature({
        channelSecret: import.meta.env.VITE_LINEPAY_SECRET_KEY,
        uri: lineRequestURI,
        requestBody: linePayBody,
        nonce: nonce,
    });

    const url = `${import.meta.env.VITE_LINEPAY_SITE}${lineRequestURI}`;

    const headers = {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": import.meta.env.VITE_LINEPAY_CHANNEL_ID,
        "X-LINE-Authorization-Nonce": nonce,
        "X-LINE-Authorization": signature,
    };

    //丟給代理
    const res = await fetch(proxyUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: linePayBody,
            headers: headers,
            url: url,
        }),
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    console.log(data);

    return data;
}

export async function handleConfirmAPI({ transactionId, amount }) {
    console.log("transactionId", transactionId);

    //創建LinePayBosy
    const linePayBody = {
        amount,
        currency: "TWD",
    };

    const nonce = uuidv4();

    const lineConfirmURI = `/v3/payments/${transactionId}/confirm`;

    const signature = generateSignature({
        channelSecret: import.meta.env.VITE_LINEPAY_SECRET_KEY,
        uri: lineConfirmURI,
        requestBody: linePayBody,
        nonce: nonce,
    });

    const url = `${import.meta.env.VITE_LINEPAY_SITE}${lineConfirmURI}`;

    const headers = {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": import.meta.env.VITE_LINEPAY_CHANNEL_ID,
        "X-LINE-Authorization-Nonce": nonce,
        "X-LINE-Authorization": signature,
    };

    //丟給代理
    const res = await fetch(proxyUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: linePayBody,
            headers: headers,
            url: url,
        }),
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    console.log("handleConfirmAPI", data);

    return data;
}
