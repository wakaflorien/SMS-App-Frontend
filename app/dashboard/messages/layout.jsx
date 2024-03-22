"use client";
import React from "react";
import { FloatButton, Modal, Input, Divider, Button } from "antd";
import { MessageOutlined, SearchOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/utils/https/messages";

const MessagesLayout = ({ children }) => {
  const { TextArea } = Input;
  const querryClient = useQueryClient();
  const { mutate, data, isPending, error } = useMutation({
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
    // mutate();
  };

  return (
    <>
      <FloatButton
        icon={<MessageOutlined style={{ fontSize: 21 }} />}
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
            <Button type="primary" size="large" style={{ width: 100 }}>
              Send
            </Button>
          </div>
        </form>
      </Modal>
      {children}
    </>
  );
};

export default MessagesLayout;
