"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  WechatOutlined,
  ContactsOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useRouter, usePathname } from "next/navigation";
const { Sider } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();

  const menuItems = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      key: "2",
      icon: <WechatOutlined />,
      label: "Messages",
      children: [
        { key: "2.1", label: "All Messages", link: "/dashboard/messages" },
        {
          key: "2.2",
          label: "Send New Message",
          link: "/dashboard/messages/new",
        },
        {
          key: "2.3",
          label: "Send To group",
          link: "/dashboard/messages/group",
        },
        {
          key: "2.4",
          label: "Send From CSV",
          link: "/dashboard/messages/fromcsv",
        },
      ],
    },
    {
      key: "3",
      icon: <ContactsOutlined />,
      label: "Contacts",
      children: [
        { key: "3.1", label: "All Contacts", link: "/dashboard/contacts" },
        {
          key: "3.2",
          label: "Add New Contact",
          link: "/dashboard/contacts/new",
        },
        {
          key: "3.3",
          label: "Add From CSV",
          link: "/dashboard/contacts/fromcsv",
        },
      ],
    },
    {
      key: "4",
      icon: <TeamOutlined />,
      label: "Groups",
      children: [
        { key: "4.1", label: "All Groups", link: "/dashboard/groups" },
        { key: "4.2", label: "Create Group", link: "/dashboard/groups/create" },
      ],
    },
    {
      key: "5",
      icon: <SettingOutlined />,
      label: "Settings",
      link: "/dashboard/settings",
    },
  ];

  const renderMenuItems = (items) =>
    items.map((item) =>
      item.children ? (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label} theme="light" 
        >
          {item.children.map((child) => (
            <Menu.Item key={child.key} onClick={() => router.push(child.link)} >
              {child.label}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ) : (
        <Menu.Item
          icon={item.icon}
          key={item.key}
          onClick={() => router.push(item.link)}
        >
          {item.label}
        </Menu.Item>
      )
    );

  const currentPath = usePathname(); // Use the usePathname hook
  const defaultSelectedKeys = menuItems
    .map((item) =>
      item.link || item.children.link === currentPath.replace(/\?$/, "")
        ? item.key || item.children.keys
        : null
    )
    .filter((key) => key !== null);

  console.log(defaultSelectedKeys);
  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKeys]}
          className="h-screen !bg-primary"
          theme="dark"
        >
          {renderMenuItems(menuItems)}
        </Menu>
      </Sider>
      <Layout>
        <DashboardHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />
        {children}
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
