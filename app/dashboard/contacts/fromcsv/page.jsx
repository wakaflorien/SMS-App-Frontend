"use client";
import React from "react";
import { Layout, theme, Button, message, Upload ,Input} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Content } = Layout;

const ContactsFromCsvPage = () => {
  const { TextArea } = Input;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const props = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <div className="flex flex-col space-y-4 w-1/2">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <TextArea rows={3} />
      <Button type="primary" size="large" style={{ width: 120 }} >Create</Button>
      </div>
    </Content>
  );
};

export default ContactsFromCsvPage;
