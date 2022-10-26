const sgMail = require('@sendgrid/mail');

const emailApi = {

    createEmail: async function createEmail(adress) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: adress.email,
            from: 'mariabjuv@gmail.com',
            subject: 'Edit a document with friends',
            text: 'You got asked to join your team and edit a document klick the link to register today',
            html: `<a href="https://www.student.bth.se/~mabs21/editor">Click to sign UP</a> `

        }

            (async () => {
                try {
                    await sgMail.send(msg);
                } catch (error) {
                    console.log(error);
                }
            })();

        return `message been sent to ${msg.to}`
    }
}

module.exports = emailApi;