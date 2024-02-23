"use client";
import React from "react";
import { FloatButton, Modal, Input, Divider, Button } from "antd";
import { ContactsOutlined, SearchOutlined } from "@ant-design/icons";

const ContactsLayout = ({ children }) => {
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
        <div className="flex flex-col space-y-5">
          <h2>Enter your details to create a new contact.</h2>
          <Input size="large" placeholder="Name" />
          <Input size="large" placeholder="Email" />
          <Input size="large" placeholder="Phone" />
          <TextArea placeholder="Description" rows={3} />
        </div>
        <div className="flex justify-end mt-4 space-x-3">
          <Button size="large" style={{ width: 100 }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" size="large" style={{ width: 100 }}>
            Create
          </Button>
        </div>
      </Modal>
      <main>{children}</main>
    </div>
  );
};

export default ContactsLayout;
