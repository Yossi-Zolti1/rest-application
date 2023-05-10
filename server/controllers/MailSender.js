import nodeMailer from 'nodemailer';



class MailResetPass {
  constructor() { }
  static async sendEmail(to, id, token, typeOfMail, password) {

    let html;
    let subject;
    if (typeOfMail === 'ressetPass') {
      html = `<a href="${process.env.CLIENT_HOST}/resetPassword/${id}/${token}" class="btn btn-primary">לחץ כאן לאיפוס סיסמה</a>`;
      subject = "אתר מסעדות - איפוס סיסמה";
    } else if (typeOfMail === 'createOwner') {
      html = `
          <p>קישור לאתר מסעדות: <a href="${process.env.CLIENT_HOST}">${process.env.CLIENT_HOST}</a></p>
          <p>סיסמה: ${password}</p>
        `;
      subject = "אתר מסעדות - המנוי נוצר בהצלחה!";
    }

    let transformMail = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ybdevltd@gmail.com",
        pass: process.env.EMAIL_PASSWORD
      },
      connectionTimeout: 6000,
    });

    let details = {
      from: "ybdevltd@gmail.com",
      to: to,
      subject: "אתר מסעדות - איפוס סיסמה",
      html: html,
    }

    try {
      const result = await Promise.race([
        transformMail.sendMail(details),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Email sending timed out")), 6000)
        ),
      ]);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Error sending email");
    }

  }
}

export default MailResetPass;
