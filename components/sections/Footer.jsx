"use client";
import { useRef } from "react";
import { Wrapper } from "../layout/Wrapper";
import { Checkbox, Form, Input, Button, Select, notification } from "antd";
import emailjs from "@emailjs/browser";
import axios from "axios";

const { Option } = Select
export const itemStyles = {
  inputStyles: { borderRadius: "0px !important", height: "45px", width: "100%", textDecoration: "capitalize" }
}

export function Footer() {
  const [form] = Form.useForm();
  const formSend = useRef();

  const onFinish = (values) => {
    console.log('Success:', values);

    const data = {
      service_id: 'process.env.NEXT_PUBLIC_SERVICE_ID',
      template_id: 'process.env.NEXT_PUBLIC_TEMPLATE_ID',
      user_id: 'process.env.NEXT_PUBLIC_MAILJS_PUBLIC_KEY',
      template_params: {
        'username': 'James',
        'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
      }
    };
    try {
      const response = axios.post("https://api.emailjs.com/api/v1.0/email/send", data)
      console.log("respones", response)
      return response
    } catch (error) {
      notification.error({
        message: "Failed",
        description: error.message
      })
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const prefixSelector = (
    <Form.Item name="prefix" className="bg-white/25">
      <Select
        style={itemStyles.inputStyles}
        className="!bg-transparent !border-none"
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="bg-blue-500 text-white opacity-100 min-h-screen flex items-center relative" id="contact">
      <Wrapper className="py-14 xl:py-20 grid xl:grid-cols-12 gap-28 w-full">
        <div className="xl:col-span-5 max-w-full space-y-11">
          <h1 className="text-2xl xl:text-5xl font-extrabold">
            Contact SMSPortal
          </h1>
          <Form
            name="contactForm"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            form={form}
            layout="vertical"
            className="flex flex-col gap-2"
          >
            <Form.Item
              label=""
              name="name"
              className="bg-white/25"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input
                placeholder="Full Name"
                className="!bg-transparent !border-none"
                style={itemStyles.inputStyles}
              />
            </Form.Item>
            <Form.Item
              label=""
              name="phone"
              className="bg-white/25"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input
                placeholder="Phone number"
                className="!bg-transparent !border-none"
                style={itemStyles.inputStyles}
              // addonBefore={prefixSelector}
              />
            </Form.Item>
            <Form.Item
              label=""
              name="email"
              className="bg-white/25"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                placeholder="Email"
                className="!bg-transparent !border-none"
                style={itemStyles.inputStyles}
              />
            </Form.Item>
            <Form.Item
              name="organization"
              className="bg-white/25"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input
                style={itemStyles.inputStyles}
                className="!bg-transparent !border-none"
                placeholder="Organization"
              />
            </Form.Item>
            <Form.Item
              name="message"
              className="bg-white/25"
              rules={[
                {
                  required: true,
                  message: 'Please input Messsage!',
                },
              ]}
            >
              <Input.TextArea
                showCount maxLength={100}
                placeholder="Type your message here ..."
                className="!bg-transparent !border-none !rounded-none"
                style={{
                  height: 120,
                  resize: 'none',
                }}
              />
            </Form.Item>
            <Form.Item
              className="bg-white/25"
            >
              <Button
                className="!bg-blue-500 !border-white !text-white uppercase !text-sm font-bold"
                style={itemStyles.inputStyles}
                type="secondary"
                htmlType="submit"
                block
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="xl:col-span-5">
          <div className="flex flex-col gap-y-7 max-w-full">
            <h1 className=" text-3xl xl:text-6xl font-extrabold mb-8">
              <p>Sales & Support</p>
              <p>Space Centre</p>
            </h1>
            <div className="text-xl">
              If you require any further information about InfoText Services, please do not hesitate to contact us. Our team of highly trained professionals are on standby to assist you.
            </div>
            <div className="flex flex-col">
              <div className="grid  grid-cols-2 xl:grid-cols-12">
                <div className="text-white font-bold xl:col-span-8">
                  Monday to Friday
                </div>
                <div className="text-white xl:col-span-4">
                  <p>8am - 5pm(UTC+2)</p>
                </div>
              </div>
              <div className="grid grid-cols-2 xl:grid-cols-12">
                <div className="text-white font-bold xl:col-span-8">Telphone</div>
                <div className="text-white xl:col-span-4">
                  <p>SA: 086 111 2021</p>
                  <p>Telephone: +353 (0)21 731 9734</p>
                </div>
              </div>
              <div className="grid  grid-cols-2 xl:grid-cols-12">
                <div className="text-white font-bold xl:col-span-8">Email</div>
                <div className="text-white xl:col-span-4">
                  <p>info@infotext.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
