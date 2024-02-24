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
          name: 'Info Text',
          messagecontent: 'Hellooo',
          target: 'Home',
          group: '2023-10-25',
          datetime: '2023-10-25 19:09 PM',
          email: 'sostene@fuelcapp.com',
        },
        {
          key: '2',
          name: 'Info Text',
          messagecontent: 'Hiiiiii',
          target: 'Home',
          group: '2023-10-25',
          datetime: '2023-10-25 19:09 PM',
          email: 'sostene@fuelcapp.com',
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
          dataIndex: 'messagecontent',
          key: 'messagecontent',
        },
        {
          title: 'Target',
          dataIndex: 'target',
          key: 'target',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Date Time',
          dataIndex: 'datetime',
          key: 'datetime',
        },
        {
          title: 'Group',
          dataIndex: 'group',
          key: 'group',
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
        <Table bordered dataSource={dataSource} columns={columns}  />
      </Content>
  )
}

export default AllMessagesPage