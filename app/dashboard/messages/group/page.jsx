"use client";
import React from "react";
import { Layout, theme, Select, Input, Button, notification, Form } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroups } from "@/utils/https/groups";
import { filterOption } from "../page";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { sendMessage } from "@/utils/https/messages";
const { Content } = Layout;

const SendMessageToGroup = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = Cookies.get("token");
  const decoded = token && jwtDecode(token);
  const querryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: "groups",
    queryFn: getGroups,
  });
  const { mutate, isPending, isSuccess } = useMutation({
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

  const [sendMessagePayload, setSendMessagePayload] = React.useState({
    from: decoded.phone_number, // Replace with logged in user
    numbers: [],
    message: "",
    isGroup: true
  })

  if (error)
    return (
      <DashboardFetchingError alertDescription="Unable to retrieve groups" />
    );

  if (isLoading) return <DashboardFetchingLoader categoryName="Groups" />;

  // if (isSuccess) {
  //   notification.success({
  //     message: "Success",
  //     description: "Message sent ",
  //     placement: "topRight",
  //   });
  // }
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
        <Form
          layout="vertical"
          form={form}
          onFinish={() => {
            mutate(sendMessagePayload)
            // form.resetFields()
          }}
          className="w-1/2"
        >
          <Form.Item name="numbers" label="Group name" rules={[{ required: true, message: "Please select group" }]}>
            <Select
              mode={"multiple"}
              allowClear={true}
              placeholder="Please select group"
              style={{ width: "100%" }}
              className="capitalize !h-[40px] border-none"
              onSearch={() => console.log("")}
              filterOption={filterOption}
              options={data?.filter((item) => item.contacts.length > 0)?.map((item) => ({
                value: item._id,
                label: item.name,
                key: item._id,
                groupContacts: item.contacts.map((contact) => contact.phone_number),
              }))}
              onChange={(value, option) => {
                setSendMessagePayload((prevState) => ({
                  ...prevState,
                  numbers: option[0]?.groupContacts,
                }))
              }}
              loading={isLoading}
            />
          </Form.Item>
          <Form.Item name="message" label="Message" rules={[{ required: true, message: "Please enter message" }]}>
            <TextArea rows={4} onChange={(e) => setSendMessagePayload((prevState) => ({ ...prevState, message: e.target.value }))} />
          </Form.Item>
          {/* <span>Search using group name.</span> */}
          <Button type="primary" size="large"
            style={{ width: 120 }}
            htmlType="submit"
            loading={isPending}
          >Send</Button>
        </Form>
    </Content>
  );
};

export default SendMessageToGroup;
