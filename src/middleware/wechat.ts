import * as wechat from 'wechat';

const initWechat = (app) => {
    const config = {
        token: process.env.WECHAT_TOKEN,
        appid: process.env.WECHAT_APPID,
        encodingAESKey: process.env.NODE_ENV === 'production' ? process.env.WECHAT_AESKEY : undefined,
        checkSignature: process.env.NODE_ENV === 'production',
    };
    app.use('/wechat', wechat(config, (req, res, next) => {
        // message is located in req.weixin
        const message = req.weixin;
        if (message.MsgType === 'text') {
            // device text
            res.reply('This message will be pushed onto the device.');
        }
        else if (message.MsgType === 'device_event') {
            if (message.Event === 'subscribe_status' ||
                message.Event === 'unsubscribe_status') {
                // subscribe or unsubscribe the WIFI device status,the reply should be 1 or 0
                res.reply(1);
            } else {
                res.reply('This message will be pushed onto the device.');
            }
        }
    }));

};

export default initWechat;