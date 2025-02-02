import { createTransport } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello there!</h2>
      <p>${text}</p>
      <p>💋, your magisty</p>
    </div>
  `;
}

type Envelope = {
  from: string;
  to: string[] | null;
};

type MailResponse = {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelop: Envelope;
  messageId: string;
};

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info: MailResponse = await transport.sendMail({
    to,
    from: 'test.example.com',
    subject: 'Your password reset token',
    html: makeANiceEmail(`Your password reset token is here
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}"></a>`),
  });

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log('message sent. Preview it at some address');
  }
}
