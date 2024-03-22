"use client";
import React from "react";
import { FloatButton, Modal, Input, Divider, Button } from "antd";
import { ContactsOutlined, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "@/utils/https/contacts";
import LoadingSpinner from "@/components/LoadingSpinner";

const ContactsLayout = ({ children }) => {
  const { TextArea } = Input;

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const querryClient = useQueryClient();
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      querryClient.invalidateQueries("contacts");
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
    console.log(formData);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone_number = formData.get("phone");
    const description = formData.get("description");
    mutate({ name, email, phone_number, description });
    if (data) {
      handleCancel();
    }
  };

  return (
    <div>
      <FloatButton
        icon={<ContactsOutlined style={{ fontSize: 21 }} />}
        type="primary"
        onClick={showModal}
        style={{ right: 50, width: 55, height: 55 }}
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
              className="bg-primary rounded-md py-1 px-2 text-white font-semibold"
              style={{ width: 100 }}
            >
              Create{" "}
              {isPending && <LoadingSpinner color="white" fontSize={20} />}
            </button>
            {/* <Button
              type="primary"
              typeof="submit"
              size="large"
              style={{ width: 100 }}
            >
              Create
            </Button> */}
          </div>
        </form>
      </Modal>
      <main>{children}</main>
    </div>
  );
};

export default ContactsLayout;
