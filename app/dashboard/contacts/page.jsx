"use client";
import React from "react";
import { Layout, theme, Input, Table,FloatButton, Modal, Divider, Button, notification  } from "antd";
import { ContactsOutlined } from "@ant-design/icons";
import { getContacts } from "@/utils/https/contacts";
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";
import { createContact } from "@/utils/https/contacts";
import LoadingSpinner from "@/components/LoadingSpinner";


const { Content } = Layout;
const { TextArea } = Input;

const AllContactsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });
  
  const [api, contextHolder] = notification.useNotification();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
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

  // Modals





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


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone_number = formData.get("phone");
    const description = formData.get("description");
    mutate({ name, email, phone_number, description });
    if (isSuccess) {
      e.target.reset();
      handleCancel();
    }
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
            bordered
            dataSource={filteredData ? filteredData : data}
            columns={columns}
            pagination={{ pageSize: 7 }}
          />
        </div>
      </Content>
      <FloatButton
        icon={<ContactsOutlined style={{ fontSize: 21 }} />}
        type="primary"
        onClick={showModal}
        style={{ right: 45, width: 50, height: 50 }}
      />
      <Modal
        title="Create new Contact"
        open={isModalOpen}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Divider />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5">
            <h2>Enter your details to create a new contact.</h2>
            <Input size="large" placeholder="Name" name="name" />
            <Input size="large" placeholder="Email" name="email" />
            <Input size="large" placeholder="Phone" name="phone" />
            <TextArea placeholder="Description" rows={3} name="description" />
          </div>
          <div className="flex justify-end mt-4 space-x-3">
            <Button size="large" style={{ width: 100 }} onClick={handleCancel}>
              Cancel
            </Button>
            <button
              type="submit"
              className="bg-primary rounded-md py-1 px-2 text-white font-semibold flex items-center justify-center border-none"
              style={{ width: 100 }}
            >
              Create
              {isPending && (
                <LoadingSpinner color="white" className="ml-2" fontSize={18} />
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AllContactsPage;
