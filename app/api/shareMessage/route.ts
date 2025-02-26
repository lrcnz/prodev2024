import { setDefaultResultOrder } from 'node:dns';

import { type NextRequest } from 'next/server';
setDefaultResultOrder('ipv4first');

const BOT_TOKEN = process.env.BOT_TOKEN || '8012156179:AAEKe8evO086TeCuoVTinLIMs3e_y5Xj9fQ';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return Response.json(
      { error: 'Method Not Allowed' },
      {
        status: 405,
      }
    );
  }

  try {
    const { user_id, amount = 20, type } = await req.json();

    let payload: any = {};
    if (type === 'share') {
      payload = {
        photo_url: 'https://prodev2024.vercel.app/share/share.png', // 发送完整的图片
        thumb_url: 'https://prodev2024.vercel.app/share/share.png', // 预览缩略图
        caption: `Join me in the new PayFi app, earn up 11.90% yield with Gluon's Savings Strategy`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open Gluon',
                url: `t.me/GluonMoneyBot/gluon`,
              },
            ],
          ],
        },
      };
    }
    if (type === 'send') {
      payload = {
        photo_url: 'https://prodev2024.vercel.app/share/send2.png', // 发送完整的图片
        thumb_url: 'https://prodev2024.vercel.app/share/send2.png', // 预览缩略图
        caption: `\nHere you go\!\n🎉🎉A Friend sent you **${amount || 20} USD**`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Receive',
                url: `t.me/GluonMoneyBot/gluon?startapp=send-${amount || 20}`,
              },
            ],
          ],
        },
      };
    }
    if (type === 'raffle') {
      payload = {
        photo_url: 'https://prodev2024.vercel.app/share/raffle.png', // 发送完整的图片
        thumb_url: 'https://prodev2024.vercel.app/share/raffle.png', // 预览缩略图
        caption: `\nHere you go\!\n🎉🎉A Friend sent you **a Raffle**`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open',
                url: `t.me/GluonMoneyBot/gluon?startapp=raffle-${amount}`,
              },
            ],
          ],
        },
      };
    }
    if (type === 'earn') {
      payload = {
        photo_url: 'https://prodev2024.vercel.app/share/strategy.png', // 发送完整的图片
        thumb_url: 'https://prodev2024.vercel.app/share/strategy.png', // 预览缩略图
        caption: `\nJoin my safe BTC strategy and earn together\!\n\nCheckout Alice’s BTC Strategy, 2,510 followers\.`,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Open Strategy',
                url: `t.me/GluonMoneyBot/gluon?startapp=earn`,
              },
            ],
          ],
        },
      };
    }
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/savePreparedInlineMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id,
        allow_user_chats: true,
        allow_bot_chats: true,
        allow_group_chats: true,
        allow_channel_chats: true,
        result: {
          type: 'photo',
          id: 'photo-' + Date.now(),
          title: 'Gluon Money',
          parse_mode: 'Markdown',
          ...payload,
        },
      }),
    });

    const data = await response.json();

    if (data.ok) {
      return Response.json(
        { prepared_message_id: data.result.id },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        { error: 'Failed to save message', details: data },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error('Error saving message:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
      }
    );
  }
}
