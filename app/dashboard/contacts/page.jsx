'use client'
import React from 'react';
import { Layout, theme,Input,Table } from 'antd';
import { ContactsOutlined } from '@ant-design/icons';
const { Content } = Layout;


const AllContactsPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const dataSource = [
        {
          key: '1',
          name: 'sostene',
          phonenumber: '+250787938344',
          email: 'sostene@gamil.com',
        },
        {
          key: '2',
          name: 'kaleb',
          phonenumber: '+250783008344',
          email: 'kaleb@gamil.com',
        },
        {
          key: '3',
          name: 'florien',
          phonenumber: '+250787938370',
          email: 'florien@gamil.com',
        },
      ];

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Phone Number',
          dataIndex: 'phonenumber',
          key: 'phonenumber',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
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
        <Input size="large" placeholder="Search Contact" prefix={<ContactsOutlined style={{fontSize:17,color:'gray'}} />} />
        <Table  bordered dataSource={dataSource} columns={columns} />
        </div>
      </Content>
  )
}

export default AllContactsPage