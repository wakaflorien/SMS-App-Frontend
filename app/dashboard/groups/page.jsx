"use client";
import React from "react";
import { Layout, theme, Table, Input } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getGroups } from "@/utils/https/groups";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";

const { Content } = Layout;

const AllGroupsPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data, isLoading, error } = useQuery({
    queryKey: "groups",
    queryFn: getGroups,
  });

  const [filteredData, setFilteredData] = React.useState(data);
  const [searchQuery, setSearchQuery] = React.useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      onclick: () => console.log("clicked"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  if (error)
    return (
      <DashboardFetchingError alertDescription="Unable to retrieve groups" />
    );

  if (isLoading) return <DashboardFetchingLoader categoryName="groups" />;

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
          placeholder="Search group by name,number..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setFilteredData(
              data.filter((group) =>
              group.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
          }}
          prefix={<TeamOutlined style={{ fontSize: 17, color: "gray" }} />}
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

export default AllGroupsPage;
