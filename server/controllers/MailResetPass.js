import nodeMailer from 'nodemailer';

class MailResetPass {
    constructor() { }
    static sendEmail(to, id, token) {
        let transformMail = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                 user: "ybdevltd@gmail.com",
                 pass: process.env.EMAIL_PASSWORD
            }
        });

        let details = {
            from: "ybdevltd@gmail.com",
            to: to,
            subject: "אתר מסעדות - איפוס סיסמה",
            html: `<a href="${process.env.CLIENT_HOST}/resetPassword/${id}/${token}" class="btn btn-primary">לחץ כאן לאיפוס סיסמה</a>`
            // text: "יש להיכנס ללינק המצורף כדי לאפס את הסיסמה" + "\n" + serverHost + "/resetPassword/" + id + "/" + token,
        }

        transformMail.sendMail(details, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("success");
            }
        })

    }
}

export default MailResetPass;
