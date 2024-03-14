"use client";
import React from "react";
import { Layout, theme, Input, Table, Spin, Alert } from "antd";
import { ContactsOutlined, LoadingOutlined } from "@ant-design/icons";
import { getContacts } from "@/utils/https/contacts";
import { useQuery } from "@tanstack/react-query";

const { Content } = Layout;

const AllContactsPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const [filteredData, setFilteredData] = React.useState(data);
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => <a onClick={() => console.log(record)}>View</a>,
    },
  ];

  // const handleSearch = ()

  if (error)
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
        <Alert
          message="Error!"
          description="Unable to retrieve contacts"
          type="error"
        />
      </Content>
    );

  if (isLoading)
    return (
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className="flex justify-center items-center space-x-5"
      >
        <div className="flex justify-center items-center space-x-5">
          <span>Retrieving contacts</span>
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 32,
                }}
                spin
              />
            }
          />
        </div>
      </Content>
    );

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
      <h3>All Groups</h3>
      <div className="flex flex-col space-y-4 mt-4">
        <Input
          size="large"
          placeholder="Search Contact"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setFilteredData(
              data.filter((contact) =>
                contact.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
          }}
          prefix={<ContactsOutlined style={{ fontSize: 17, color: "gray" }} />}
        />
        <Table
          bordered
          dataSource={filteredData ? filteredData : data}
          columns={columns}
        />
      </div>
    </Content>
  );
};

export default AllContactsPage;
