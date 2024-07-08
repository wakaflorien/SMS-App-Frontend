"use client";
import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Layout, theme, Table, Input, Tag, Select,FloatButton, Modal, Divider, Button } from "antd";
import { TeamOutlined,MessageOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "@/utils/https/messages";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";

import { sendMessage } from "@/utils/https/messages";

const { Content } = Layout;
const { TextArea } = Input;

const AllMessagesPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = Cookies.get("token");
  const decoded = token && jwtDecode(token);

  const { data, isLoading, error } = useQuery({
    queryKey: "messages",
    queryFn: getMessages,
  });

  const newData = data?.map((message) => {
    return { ...message, messageStatus: "sent" };
  });

  console.log(newData);

  const [filteredData, setFilteredData] = React.useState(newData);
  const [searchQuery, setSearchQuery] = React.useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: ["user","full_name"],
      key: "name",
    },
    {
      title: "Message Content",
      dataIndex: "message",
      key: "message",
    },
    // {
    //   title: "Target",
    //   dataIndex: "target",
    //   key: "target",
    // },
    {
      title: "Email",
      dataIndex: ["user","email"],
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "messageStatus",
      key: "messageStatus",
      render: (_, { messageStatus }) => {
        return (
          <Tag color={messageStatus === "sent" ? "geekblue" : "volcano"}>
            {messageStatus}
          </Tag>
        );
      },
    },
    {
      title: "Date Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toDateString(),
    },
  ];


  // FORMS


  const querryClient = useQueryClient();

  const { mutate, data:newSmsData, isPending, error:smsData, isSuccess } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      querryClient.invalidateQueries("messages");
    },
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const numbers = formData.get("number");
    const message = formData.get("message");
    const messageInfo = {
      from: decoded.phone_number,
      numbers,
      message,
    };
    mutate(messageInfo);
    if (isSuccess) {
      e.target.reset();
    }
  };


  if (error)
    return (
      <DashboardFetchingError alertDescription="Unable to retrieve groups" />
    );

  if (isLoading) return <DashboardFetchingLoader categoryName="Messages" />;

  return (
    <>
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
      <div className="flex justify-between items-center">
        <Input
          size="large"
          placeholder="Search message by name, message..."
          className="my-4 mr-8"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setFilteredData(
              data.filter((message) =>
                message.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
          }}
          prefix={<TeamOutlined style={{ fontSize: 17, color: "gray" }} />}
        />
        <Select
          defaultValue="All"
          size="large"
          style={{ width: 180 }}
          // onChange={handleChange}
          options={[
            { value: "sent", label: "Sent" },
            { value: "faild", label: "Failed" },
          ]}
        />
      </div>

      <Table
        bordered
        dataSource={filteredData ? filteredData : newData}
        columns={columns}
        pagination={{ pageSize: 7 }}
      />
    </Content>
    {/* create form */}
    <FloatButton
        icon={<MessageOutlined style={{ fontSize: 21 }} />}
        type="primary"
        onClick={showModal}
        style={{ right: 45, width: 50, height: 50 }}
      />
      <Modal
        title="Message / Send to number"
        open={isModalOpen}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Divider />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5">
            <Input
              size="large"
              name="number"
              placeholder="Search Contact by names, number..."
              prefix={<SearchOutlined color="red" />}
            />
            <TextArea placeholder="Message..." rows={4} name="message" />
          </div>
          <div className="flex justify-end mt-3 space-x-3">
            <Button size="large" style={{ width: 100 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" size="large" style={{ width: 100 }}>
              Send
            </Button>
          </div>
        </form>
      </Modal>

    </>
  );
};

export default AllMessagesPage;
