"use client";
import React from "react";
import { Layout, theme, Select, Input,Button } from "antd";
const { Content } = Layout;

const SendMessageToGroup = () => {
  const { TextArea } = Input;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
      <div className="flex flex-col space-y-3">
        <Select
          style={{
            width: 300,
          }}
          placeholder="Select group"
          options={[
            {
              value: "1",
              label: "Group 1",
            },
            {
              value: "2",
              label: "Group 2",
            },
          ]}
        />
        {/* <span>Search using group name.</span> */}
        <TextArea rows={4} />
        <Button type="primary" size="large" style={{width:120}}>Send</Button>
      </div>
    </Content>
  );
};

export default SendMessageToGroup;
