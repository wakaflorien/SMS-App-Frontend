"use client";
import React from "react";
import { Layout, theme, Table, Input, Tag, message } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/utils/https/messages";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";

const { Content } = Layout;

const AllMessagesPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data, isLoading, error } = useQuery({
    queryKey: "messages",
    queryFn: getMessages,
  });

  const newData = data?.map((message) => {
    return {...message, messageStatus:'fail'}
  });

  console.log(newData)

  const [filteredData, setFilteredData] = React.useState(newData);
  const [searchQuery, setSearchQuery] = React.useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Message Content",
      dataIndex: "messageBody",
      key: "messageBody",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "messageStatus",
      key: "messageStatus",
      render: (_, { messageStatus }) => {
        return (
          <Tag
            color={
              messageStatus === "delivered"
                ? "green"
                : messageStatus === "sent"
                ? "geekblue"
                : "volcano"
            }
          >
            {messageStatus}
          </Tag>
        );
      },
    },
    {
      title: "Date Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  if (error)
    return (
      <DashboardFetchingError alertDescription="Unable to retrieve groups" />
    );

  if (isLoading) return <DashboardFetchingLoader categoryName="Messages" />;

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
      <h3>All Messages</h3>
      <Input
        size="large"
        placeholder="Search message by name, message..."
        className="my-4"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setFilteredData(
            data.filter((message) =>
              message.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
          );
        }}
        prefix={<TeamOutlined style={{ fontSize: 17, color: "gray" }} />}
      />

      <Table
        bordered
        dataSource={filteredData ? filteredData : newData}
        columns={columns}
      />
    </Content>
  );
};

export default AllMessagesPage;
