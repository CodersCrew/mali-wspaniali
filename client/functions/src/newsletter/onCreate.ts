import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';

export const sendNewsletter = functions.firestore.document('newsletter/{newsletterId}').onCreate(event => {
    const { key } = functions.config().sendgrid;
    const data = event.data();

    sgMail.setApiKey(key);

    return sgMail.send({
        to: data.recipients,
        from: 'malwspdev@gmail.com',
        subject: data.topic,
        html: data.message,
    });
});
