import nodemailer from 'nodemailer';
import OAuth2 from 'google-auth-library';

export class Email {
    constructor(user, url){
        this.to = user.email
        this.firstName = user.name.split(' ')[0]
        // this.url = url;
        this.url = `http://localhost:5173/resetPassword/${url}`
        this.from = `Social Network <'chiendeptrai2002@gmail.com'>`
    }

    async newTransport(){
        const myOAuth2Client = new OAuth2.OAuth2Client(
            process.env.CLIENT_ID_OAUTH2,
            process.env.CLIENT_ID_SECRET_OAUTH2
        )
        myOAuth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN_OAUTH2
        })
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        const myAccessToken = myAccessTokenObject.token
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: "pnc232002@gmail.com",
                clientId: process.env.CLIENT_ID_OAUTH2,
                clientSecret: process.env.CLIENT_ID_SECRET_OAUTH2,
                refresh_token: process.env.REFRESH_TOKEN_OAUTH2,
                accessToken: myAccessToken
            }
        })
    }
    async send(template, subject){
        const html = {url: this.url, content: `<div>
        <h4>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn.</h4>
        <div>Vui lòng truy cập vào đường dẫn để lấy lại mật khẩu</div>
        <div>URL: ${this.url}</div>
        <div>Đổi mật khẩu có hiệu lực trong vòng 10 phút.</div>
        Nếu bạn không đổi mật khẩu bạn vẫn có thể đăng nhập bằng mật khẩu cũ.
        </div>`}
        const mailOptions = {
            // to: this.to,
            to: this.to,
            subject,
            html,
            text: "thử email"
        }
        const transPort = await this.newTransport()
        await transPort.sendMail(mailOptions);
    }
    async sendWelcome(){
        await this.send('welcome', 'Welcome to the Social NetWork family!')
    }
    async sendPasswordReset(){
        await this.send('passwordReset', 'Your password reset token ( valid for only 10 minutes)')
    }
}