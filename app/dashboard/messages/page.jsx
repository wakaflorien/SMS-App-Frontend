'use client'
import React from 'react';
import { Layout, theme,Table,Typography } from 'antd';
const { Content } = Layout;
const { Title } = Typography;


const AllMessagesPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const dataSource = [
        {
          key: '1',
          name: 'Mike',
          messageContent: '32',
          Target: '10 Downing Street',
          Group: '10 Downing Street',
          Email: 'sostene@fuelcapp.com',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Message Content',
          dataIndex: 'Message Content',
          key: 'Message Content',
        },
        {
          title: 'Target',
          dataIndex: 'Target',
          key: 'Target',
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'Email',
        },
        {
          title: 'Date Time',
          dataIndex: 'Date Time',
          key: 'Date Time',
        },
        {
          title: 'Group',
          dataIndex: 'Group',
          key: 'Group',
        },
      ];

  return (
    <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Title level={3}>All Messages</Title>
        <Table dataSource={dataSource} columns={columns}  />
      </Content>
  )
}

export default AllMessagesPage