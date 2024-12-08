import CryptoJS from "crypto-js";

export function generateSignature({ channelSecret, uri, requestBody, nonce }) {
    //RequestBody轉為JSON字符串
    const requestBodyString = JSON.stringify(requestBody);

    //名字符串
    const signatureString = `${channelSecret}${uri}${requestBodyString}${nonce}`;

    //HMAC-SHA256 加密
    const signature = CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(signatureString, channelSecret),
    );

    return signature;
}
