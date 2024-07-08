"use client";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";
import { createGroup, getGroups } from "@/utils/https/groups";
import { SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,Divider,FloatButton,Input,
  Layout,Modal,Table,notification,theme,
} from "antd";
import React from "react";

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
  const [api, contextHolder] = notification.useNotification();

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
      render: (date) => new Date(date).toDateString(),
    },
  ];

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Group Created",
      description: "Group has been successfully created",
    });
  };

  const querryClient = useQueryClient();
  const {
    mutate,
    isPending,
    error: createError,
    isSuccess,
  } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      querryClient.invalidateQueries("groups");
      openNotificationWithIcon("success");
      setTimeout(() => {
        handleCancel();
      })
      // handleCancel();
    },
  });
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutate({
      name: formData.get("name"),
      description: formData.get("description"),
    });
  };

  if (error)
    return (
      <DashboardFetchingError alertDescription="Unable to retrieve groups" />
    );

  if (isLoading) return <DashboardFetchingLoader categoryName="groups" />;

  return (
    <>
      {contextHolder}
      <FloatButton
        icon={<TeamOutlined style={{ fontSize: 21 }} />}
        type="primary"
        onClick={showModal}
        style={{ right: 45, width: 50, height: 50 }}
      />
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
            pagination={{ pageSize: 7 }}
          />
        </div>
      </Content>

      <Modal
        title="Create new Group"
        open={isModalOpen}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Divider />
        <form onSubmit={handleCreateGroup}>
          <div className="flex flex-col space-y-4">
            <h2>Enter details of new Group</h2>
            <Input
              size="large"
              name="name"
              placeholder="Group Name"
              prefix={<SearchOutlined color="red" />}
            />
            <TextArea placeholder="Description" name="description" rows={4} />
          </div>
          <div className="flex justify-end mt-4 space-x-3">
            <Button size="large" style={{ width: 100 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: 100 }}
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AllGroupsPage;
