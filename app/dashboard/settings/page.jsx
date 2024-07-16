"use client";
import React from "react";
import { Layout, theme, Typography, Button, Card, Flex,Image } from "antd";

const { Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const myLoader=()=>{
  return `https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png`;
}


const SettingsPage = () => {
  const [value, setValue] = React.useState("horizontal");

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
      <Flex gap="middle" vertical={false}>
        <Image src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="Profile image" width={200} height={200} style={{  borderRadius: "20%" }} />
        <Flex vertical gap="16px">
          <Title level={4}>Profile</Title>
        <Button type="primary">Save</Button>
        </Flex>
      </Flex>
    </Content>
  );
};

export default SettingsPage;
