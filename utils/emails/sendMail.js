import emailjs from "@emailjs/browser"
import { message } from "antd";

// var templateParams = {
//     name: 'James',
//     notes: 'Check this out!',
//   };

export const sendEmail = (templateParams) => {
      emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID, 
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
         templateParams,
         process.env.NEXT_PUBLIC_MAILJS_PUBLIC_KEY
         ).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          message.success("Success!: Email sent successfully")
        },
        (error) => {
          console.log('FAILED...', error);
          message.error("Failed!: Sending email failed")
        },
      );
}