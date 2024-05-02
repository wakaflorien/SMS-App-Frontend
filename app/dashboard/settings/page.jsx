"use client";
import React from "react";
import { Layout, theme } from "antd";
const { Content } = Layout;

const SettingsPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  /*
      TODO
      - generate reports of total number of messages sent , and total number of messages delivered
       with start date and end date ,  content number, wheather they were to a group or not  so they 
       can bill people even after they used the service      
      */
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
      SettingsPage --- Content
    </Content>
  );
};

export default SettingsPage;
