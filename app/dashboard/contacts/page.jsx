"use client";
import React from "react";
import { Layout, theme, Input, Table } from "antd";
import { ContactsOutlined } from "@ant-design/icons";
import { getContacts } from "@/utils/https/contacts";
import { useQuery } from "@tanstack/react-query";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";

const { Content } = Layout;

const AllContactsPage = () => {
  const { data, isLoading, error } = useQuery({
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

  if (error)
    return (
      <DashboardFetchingError alertDescription="Unable to retrieve contacts" />
    );

  if (isLoading) return <DashboardFetchingLoader categoryName="contacts" />;

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
