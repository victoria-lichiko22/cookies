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

export const sendMessage = async (chat_id, text) => {
    await fetch(`https://api.telegram.org/bot${process.env.API_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chat_id,
            text: text,
        })
    })

    return true;
};

export const sendButton = async (chat_id, text) => {
    const body = JSON.stringify({
        chat_id: chat_id,
        text: text,
        reply_markup: { inline_keyboard: [[{
            text: "keyboard text",
            web_app: { url: `${process.env.WEB_APP_URL}`}
        }]]}
    })
    console.log(body);
    const resp = await fetch(`https://api.telegram.org/bot${process.env.API_TOKEN}/sendMessage`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    console.log(resp.status, await resp.text())
   return true
};
