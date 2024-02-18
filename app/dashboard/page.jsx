"use client";
import React, { useState } from "react";
import {
  ContactsOutlined,
  AppstoreOutlined,
  SettingOutlined,
  WechatOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Card } from "antd";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
const { Header, Sider, Content } = Layout;

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let content = null;

  switch (selectedMenuItem) {
    case "1":
      content = (
        <div>
          <h1>Dashboard Content</h1>
          <div className="flex space-x-8 mt-3">
          <Card
            style={{
              width: 310,
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            style={{
              width: 300,
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            style={{
              width: 300,
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            style={{
              width: 300,
            }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          </div>
          
        </div>
      );
      break;
    case "2":
      content = <div>Messages Content</div>;
      break;
    case "3":
      content = <div>Contacts Content</div>;
      break;
    case "4":
      content = <div>Groups Content</div>;
      break;
      case "5":
        content = <div>Settings Content</div>;
        break;
    default:
      content = <div>Default Content</div>;
  }

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        background="#1a337b"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedMenuItem]}
          onClick={handleMenuClick} // Handle menu item click
          items={[
            {
              key: "1",
              icon: <AppstoreOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <WechatOutlined />,
              label: "Messages",
            },
            {
              key: "3",
              icon: <ContactsOutlined />,
              label: "Contacts",
            },
            {
              key: "4",
              icon: <TeamOutlined />,
              label: "Groups",
            },
            {
              key: "5",
              icon: <SettingOutlined />,
              label: "Settings",
            },
          ]}
        />
      </Sider>
      <Layout>
        <DashboardHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {content} {/* Render content based on selectedMenuItem */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
