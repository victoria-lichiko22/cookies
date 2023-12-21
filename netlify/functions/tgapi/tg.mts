import crypto from "crypto";

export const verifyInitData = (telegramInitData: string): boolean => {
    const urlParams = new URLSearchParams(telegramInitData);

    const hash = urlParams.get('hash');
    urlParams.delete('hash');
    urlParams.sort();

    let dataCheckString = '';
    for (const [key, value] of urlParams.entries()) {
        dataCheckString += `${key}=${value}\n`;
    }
    dataCheckString = dataCheckString.slice(0, -1);

    const secret = crypto.createHmac('sha256', 'WebAppData').update(process.env.API_TOKEN ?? '');
    const calculatedHash = crypto.createHmac('sha256', secret.digest()).update(dataCheckString).digest('hex');

    return calculatedHash === hash;
}

const axios = require("axios").default;

export const sendMessage = async (chat_id, text) => {
    await fetch(`https://api.telegram.org/bot${process.env.API_TOKEN}/sendMessage?chat_id=${chat_id}&text=${text}`);
    return true;
};
