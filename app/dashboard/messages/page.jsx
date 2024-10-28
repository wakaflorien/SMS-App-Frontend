"use client";
import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Layout, theme, Table, Input, Tag, Select, FloatButton, Modal, Divider, Button, notification, Form } from "antd";
import { TeamOutlined, MessageOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "@/utils/https/messages";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";

import { sendMessage } from "@/utils/https/messages";
import { getContacts } from "@/utils/https/contacts";
import { useRouter } from "next/navigation";

const { Content } = Layout;
const { TextArea } = Input;

export const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
const AllMessagesPage = () => {
  const { form } = Form.useForm()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = Cookies.get("token");
  const decoded = token && jwtDecode(token);
  const { id: userId } = decoded;

  const querryClient = useQueryClient();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sendMessagePayload, setSendMessagePayload] = React.useState({
    from: decoded.phone_number, // Replace with logged in user
    numbers: [],
    message: "",
    isGroup: false
  })

  if (!token) {
    router.push("/");
  }

  const { data, isLoading, error } = useQuery({
    queryKey: "messages",
    queryFn: getMessages,
  });

  const { data: contacts, isLoading: contactsLoading, error: contactsError } = useQuery({
    queryKey: "contacts",
    queryFn: getContacts,
  });

  const newData = data?.filter((message) => message?.user?._id === userId)?.map((message) => {
    return { ...message, messageStatus: "sent" };
  });

  const [filteredData, setFilteredData] = React.useState(newData);
  const { mutate, data: newSmsData, isPending, error: smsData, isSuccess } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setSendMessagePayload({
        from: decoded.phone_number, // Replace with logged in user
        numbers: [],
        message: "",
        isGroup: true
      });
      querryClient.invalidateQueries("messages");
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: ["user", "full_name"],
      key: "name",
      render: (text) => <span className="capitalize">{text}</span>
    },
    {
      title: "Message Content",
      dataIndex: "message",
      key: "message",
      render: (text) => <span className="capitalize">{text}</span>
    },
    // {
    //   title: "Target",
    //   dataIndex: "target",
    //   key: "target",
    // },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: "Delivery Status",
      dataIndex: "messageStatus",
      key: "messageStatus",
      render: (_, { messageStatus, status }) => {
        return (
          <Tag color={status === "sent" ? "geekblue" : "volcano"} className="capitalize">
            {status}
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    mutate(sendMessagePayload);
    handleCancel();
    // useQueryClient().refetchQueries("messages");
  };

  const onSearch = (value) => {
    if (!value || value.length < 1) {
      setFilteredData(newData);
      return;
    }

    const searchValue = value.toLowerCase();

    const filteredData = newData.filter((item) => {
      const { smsSenderId, message, number, messageStatus, user } = item;
      const { full_name, email, phone_number } = user;

      return (
        smsSenderId?.toLowerCase().includes(searchValue) ||
        message?.toLowerCase().includes(searchValue) ||
        number?.toLowerCase().includes(searchValue) ||
        full_name?.toLowerCase().includes(searchValue) ||
        email?.toLowerCase().includes(searchValue) ||
        phone_number?.toLowerCase().includes(searchValue) ||
        messageStatus?.toLowerCase().includes(searchValue)
      );
    });

    setFilteredData(filteredData);
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
              onSearch(e.target.value);
            }}
            prefix={<TeamOutlined style={{ fontSize: 17, color: "gray" }} />}
          />
          <Select
            defaultValue="All"
            size="large"
            style={{ width: 180 }}
            onChange={(e) => onSearch(e)}
            options={[
              { value: "sent", label: "Sent" },
              { value: "failed", label: "Failed" },
            ]}
          />
        </div>

        <Table
          bordered
          dataSource={filteredData || newData}
          columns={columns}
          pagination={{ pageSize: 7 }}
          loading={isLoading}
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
        <Form
          form={form}
          layout="vertical"
          onFinish={() => {
            handleSubmit();
            form.resetFields();
          }}>
          <div className="flex flex-col ">
            <Form.Item name="from" label="Contacts" rules={[{ required: true, message: "Please enter from number" }]}>
              <Select
                mode={"multiple"}
                allowClear={true}
                placeholder="Please select contacts"
                style={{ width: "100%" }}
                className="capitalize !h-[40px] border-none"
                onSearch={() => console.log("")}
                filterOption={filterOption}
                options={contacts?.map((item) => ({
                  value: item.phone_number,
                  label: item.name,
                  key: item._id,
                }))}
                onChange={(value, option) => {
                  setSendMessagePayload((prevState) => ({
                    ...prevState,
                    numbers: value,
                  }))
                }}
                loading={contactsLoading}
              />
            </Form.Item>
            <Form.Item name="message" label="Message" rules={[{ required: true, message: "Please enter message" }]}>
              <TextArea placeholder="Message..." rows={4} onChange={(e) => setSendMessagePayload((prevState) => ({ ...prevState, message: e.target.value }))} />
            </Form.Item>
          </div>
          <div className="flex justify-end mt-3 space-x-3">
            <Button size="large" style={{ width: 100 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" size="large" style={{ width: 100 }} loading={isPending}>
              Send
            </Button>
          </div>
        </Form>
      </Modal >

    </>
  );
};

export default AllMessagesPage;
