'use client'
import React from 'react';
import { Layout, theme,Table,Input } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
const { Content } = Layout;


const AllGroupsPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const dataSource = [
        {
          key: '1',
          name: 'sostene',
          description: 'Software Developer',
          datecreated: '2023-10-09 15:48 PM',
        },
        {
          key: '2',
          name: 'Florien',
          description: 'Software Engineer',
          datecreated: '2023-10-09 15:48 PM',
        },
      ];

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          onclick: () => console.log('clicked')
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Date Created',
          dataIndex: 'datecreated',
          key: 'datecreated',
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
        <h3 >All Groups</h3>
        <div className="flex flex-col space-y-4 mt-4">
        <Input size="large" placeholder="Search group by name,number..." prefix={<TeamOutlined style={{fontSize:17,color:'gray'}} />} />
        <Table  bordered dataSource={dataSource} columns={columns} />
        </div>
        
      </Content>
  )
}

export default AllGroupsPage