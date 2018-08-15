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
        if (message.MsgType === 'event') {
            if (message.Event === 'subscribe') {
                if (message.EventKey && message.Ticket){
                    res.reply('Thanks for your subscribe by scan qrcode');
                }
                else{
                    res.reply('Thanks for your subscribe');
                }
            }
            else if (message.Event === 'unsubscribe'){
                res.reply('This message will be pushed onto the device.');
            }
            else if (message.Event === 'LOCATION'){
                res.reply('This message will be pushed onto the device.');
            }
            else if (message.Event === 'CLICK'){
                res.reply('Click the menu.');
            }
        }
        else if (message.MsgType === 'text') {
            res.reply('This is a text');
        }
        else if (message.MsgType === 'image') {
            res.reply('This is a text');
        }
        else if (message.MsgType === 'voice') {
            res.reply('This is a text');
        }
        else if (message.MsgType === 'video') {
            res.reply('This is a text');
        }
        else if (message.MsgType === 'location') {
            res.reply('This is a text');
        }
        else if (message.MsgType === 'link') {
            res.reply('This is a text');
        }
        else if (message.MsgType === 'shortvideo') {
            res.reply('This is a text');
        }
    }));

};

export default initWechat;