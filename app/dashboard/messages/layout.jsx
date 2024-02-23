"use client";
import React from "react";
import { FloatButton, Modal, Input, Divider } from "antd";
import { MessageOutlined, SearchOutlined } from "@ant-design/icons";

const MessagesLayout = ({ children }) => {
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
    <>
      <FloatButton
        icon={<MessageOutlined />}
        type="primary"
        onClick={showModal}
        style={{ right: 50, width: 55, height: 55 }}
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
        <div className="flex flex-col space-y-5">
          <Input
            size="large"
            placeholder="Search Contact by names, number..."
            prefix={<SearchOutlined color="red" />}
          />
          <TextArea placeholder="Message..." rows={4} />
        </div>
      </Modal>
      {children}
    </>
  );
};

export default MessagesLayout;
