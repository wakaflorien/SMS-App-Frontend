import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined,UserOutlined,LogoutOutlined } from "@ant-design/icons";
import { Layout, Button ,Flex,Dropdown,Space,Avatar} from "antd";
import { auth } from "@/app/api/firebase";


const { Header } = Layout;

const DashboardHeader = ({ collapsed, setCollapsed, colorBgContainer }) => {
  const items = [
    {
      label: <a href="#" className="px-2 flex gap-2 text-base" onClick={() => {
        auth.signOut();
        if(auth.currentUser === null){
          window.location.href = "/login";
        }
      }}> <UserOutlined /> Profile</a>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <a href="#" className="px-2 flex gap-2 text-base"> <LogoutOutlined />Logout</a>,
      key: '1',
    },
  ];

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Flex justify="space-between">
      
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Dropdown menu={{items}} trigger={['click']} className="mr-2 md:mr-6">
        <Space direction="vertical" size={16}>
          <Space wrap size={16}>
          <Avatar size={50} icon={<UserOutlined />} />
          </Space>
        </Space>
        
      </Dropdown>
      </Flex>
    </Header>
  );
};

export default DashboardHeader;
