"use client";
import React from "react";
import { FloatButton, Modal, Input, Divider, Button } from "antd";
import { TeamOutlined, SearchOutlined } from "@ant-design/icons";

const GroupsLayout = ({ children }) => {
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
        icon={<TeamOutlined style={{ fontSize: 21 }} />}
        type="primary"
        onClick={showModal}
        style={{ right: 50, width: 55, height: 55 }}
      />
      <Modal
        title="Create new Group"
        open={isModalOpen}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Divider />
        <div className="flex flex-col space-y-4">
          <h2>Enter details of new Group</h2>
          <Input
            size="large"
            placeholder="Group Name"
            prefix={<SearchOutlined color="red" />}
          />
          <TextArea placeholder="Description" rows={4} />
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

export default GroupsLayout;
