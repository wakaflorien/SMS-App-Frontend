"use client";
import React, { useState } from "react";
import { Layout, theme, Input, Table, FloatButton, Modal, Divider, Button, notification, Form, Flex, Avatar, Typography, Collapse } from "antd";
import { ContactsOutlined, UserOutlined } from "@ant-design/icons";
import { getContact, getContacts } from "@/utils/https/contacts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";
import { createContact } from "@/utils/https/contacts";


const { Content } = Layout;
const { TextArea } = Input;
const { Text, Title } = Typography;

const AllContactsPage = () => {
  const { form } = Form.useForm()

  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const [api, contextHolder] = notification.useNotification();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState(data);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [contactPayload, setContactPayload] = React.useState({
    name: "",
    phone_number: "",
    email: "",
    description: "",
  })
  const [contactId, setContactId] = React.useState(null)
  const [modalType, setModalyType] = useState("create");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="capitalize">{text}</span>
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
      render: (text, record) => <a onClick={() => {
        setModalyType("view");
        showModal();
        setContactId(record._id);
      }}>View</a>,
    },
  ];


  const { data: contactData, isLoading: contactLoading, error: contactError } = useQuery({
    queryKey: ["contact", contactId],
    queryFn: () => getContact(contactId),
  });

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Contact Created",
      description: "Contact has been successfully created",
    });
  };

  const querryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      querryClient.invalidateQueries("contacts");
      openNotificationWithIcon("success");
    },
  });

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
    mutate(contactPayload);
    handleCancel();
  };

  if (error)
    return (
      <DashboardFetchingError alertDescription="Unable to retrieve contacts" />
    );

  if (isLoading) return <DashboardFetchingLoader categoryName="contacts" />;

  return (
    <>
      {contextHolder}

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
            prefix={
              <ContactsOutlined style={{ fontSize: 17, color: "gray" }} />
            }
          />
          <Table
            bordered={false}
            dataSource={filteredData ? filteredData : data}
            columns={columns}
            pagination={{ pageSize: 7 }}
          />
        </div>
      </Content>
      <FloatButton
        icon={<ContactsOutlined style={{ fontSize: 21 }} />}
        type="primary"
        onClick={() => {
          setModalyType("create");
          showModal();
        }}
        style={{ right: 45, width: 50, height: 50 }}
      />
      <Modal
        title={modalType === "view" ? "View Contact" : "Create new Contact"}
        open={isModalOpen}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {modalType === "create" && (<>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            onFinish={() => {
              handleSubmit();
              // form.resetFields();
            }}
            className="space-y-4"
            initialValues={contactPayload}
          >
            <h2>Enter your details to create a new contact.</h2>
            <Form.Item name={"name"} label="Name" rules={[{ required: true, message: "Please enter your name" }]}>
              <Input size="large" placeholder="Name" onChange={(e) => setContactPayload((prevState) => ({ ...prevState, name: e.target.value }))} />
            </Form.Item>
            <Form.Item name={"email"} label="Email" rules={[{ required: true, message: "Please enter your email" }]}>
              <Input size="large" placeholder="Email" onChange={(e) => setContactPayload((prevState) => ({ ...prevState, email: e.target.value }))} />
            </Form.Item>
            <Form.Item name={"phone_number"} label="Phone" rules={[{ required: true, message: "Please enter your phone number" }]}>
              <Input size="large" placeholder="Phone" maxLength={13} onChange={(e) => setContactPayload((prevState) => ({ ...prevState, phone_number: e.target.value }))} />
            </Form.Item>
            <Form.Item name={"description"} label="Description" rules={[{ required: true, message: "Please enter your description" }]}>
              <TextArea placeholder="Description" rows={3} onChange={(e) => setContactPayload((prevState) => ({ ...prevState, description: e.target.value }))} />
            </Form.Item>
            <div className="flex justify-end mt-4 space-x-3">
              <Button size="large" style={{ width: 100 }} onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isPending}
                style={{ width: 100 }}
              >
                Create
              </Button>
            </div>
          </Form>
        </>)}
        {modalType === "view" && (<>
          <Divider />
          {contactLoading ? <DashboardFetchingLoader categoryName="contacts" /> : (<Flex vertical gap={8}>
            <Avatar size={80} icon={<UserOutlined />} />
            <Title level={5}>{contactData.name}</Title>
            <Collapse
              items={[{
                key: 1, label: "Contact Details", children: <Flex vertical gap={4}>
                  <Text>{contactData.email}</Text>
                  <Text>{contactData.phone_number}</Text>
                  <Text>{contactData.description}</Text>
                </Flex>
              }]}>
            </Collapse>
            <Flex>
              <Button
                onClick={() => {
                  setModalyType("create");
                  showModal();
                  setContactPayload(contactData);
                }}
                type="primary"
                size="large" >
                Edit Contact
              </Button>
            </Flex>
          </Flex>)}
        </>)}
      </Modal>
    </>
  );
};

export default AllContactsPage;
