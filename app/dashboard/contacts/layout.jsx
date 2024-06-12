"use client";
import React from "react";
import { FloatButton, Modal, Input, Divider, Button, notification } from "antd";
import { ContactsOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "@/utils/https/contacts";
import LoadingSpinner from "@/components/LoadingSpinner";

const ContactsLayout = ({ children }) => {
  const { TextArea } = Input;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [api, contextHolder] = notification.useNotification();

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

  return (
    <div>
      {contextHolder}

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
      <main>{children}</main>
    </div>
  );
};

export default ContactsLayout;
