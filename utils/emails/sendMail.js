import emailjs from "@emailjs/browser";
import { message } from "antd";

export const sendEmail = async (templateParams) => {
  // console.log("templateParams", templateParams);
  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_MAILJS_PUBLIC_KEY,
    blockHeadless: true,
    blockList: {
      list: ["foo@emailjs.com", "bar@emailjs.com"],
      watchVariable: "userEmail",
    },
    limitRate: {
      id: "app",
      throttle: 10000,
    },
  });

  emailjs
    .send(
      process.env.NEXT_PUBLIC_SERVICE_ID,
      process.env.NEXT_PUBLIC_TEMPLATE_ID,
      templateParams,
      process.env.NEXT_PUBLIC_MAILJS_PUBLIC_KEY,
    )
    .then(
      (response) => {
        // console.log("SUCCESS!", response.status, response.text);
        message.success("Success!: Email sent successfully");
      },
      (error) => {
        // console.log("FAILED...", error.text);
        message.error(error.text || "Failed!: Sending email failed");
      },
    );
};
