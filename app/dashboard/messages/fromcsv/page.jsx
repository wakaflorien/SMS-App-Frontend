"use client";
import React from "react";
import { Layout, theme, Button, Upload, Input, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { readFile } from "@/utils/https/functions/readFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { sendMessage } from "@/utils/https/messages";

const { Content } = Layout;
const allowedExtensions = ['.csv', '.xls', '.xlsx'];
const acceptExtensions = allowedExtensions.join(',');

const MessagesFromCsv = () => {
  const { form } = Form.useForm()
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const token = Cookies.get("token");
  const decoded = token && jwtDecode(token);
  const querryClient = useQueryClient();

  const [formValues, setFormValues] = React.useState({
    from: decoded.phone_number,
    numbers: [],
    message: "",
    isGroup: false
  });
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [fileData, setFileData] = React.useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fileProcessing = async (file) => {
    if (file) {
      setUploadLoading(true);
      const response = await readFile(file);
      // TODO: validate the response
      if (response) {
        setUploadLoading(false)
        setUploadSuccess(true);
        setFileData(response.fileData);
        setFormValues((prev) => ({ ...prev, numbers: response.fileData.map((item) => item.phone_number) }));

      } else {
        setUploadLoading(false)
        setUploadSuccess(false);
      }
    }
  }

  const props = {
    name: 'file',
    accept: acceptExtensions,
    showUploadList: false,
    multiple: true,
    customRequest: async ({ onSuccess, onError, file }) => {
      fileProcessing(file)
    }
  };

  const { mutate, data: newSmsData, isPending, error: smsData, isSuccess } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setFormValues({
        from: decoded.phone_number, // Replace with logged in user
        numbers: [],
        message: "",
        isGroup: true
      });
      querryClient.invalidateQueries("messages");
    },
  });

  const handleSubmit = () => {
    mutate(formValues);
  };

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
        className="w-1/2"
        onFinish={()=> {
          console.log(formValues);
          handleSubmit();
          form.resetFields();
        }}
      >
        <Form.Item label="File" name="file" rules={[{ required: true, message: "Please select file" }]}>
          <Dragger {...props} className="flex flex-col items-center rounded-md bg-white border-2 border-dashed border-[#1677FF] w-full text-[#1677FF]" >
            {uploadLoading ? "Uploading ...." : (<div className='flex flex-col items-center gap-2'>
              <p className="flex items-center justify-center">
                <Icon icon="fa6-solid:file-circle-plus" width="40" height="36" className='text-[#1677FF]' />
              </p>
              <p className="p-2 rounded-md text-white bg-[#1677FF] items-center justify-center">Select an Excel or CSV file to upload</p>
              <p className="text-center text-base">
                Or drag and drop it here
              </p>
            </div>)}
          </Dragger>
        </Form.Item>
        <Form.Item label="Message" name="message" rules={[{ required: true, message: "Please enter message" }]}>
          <TextArea rows={4} onChange={(e) => setFormValues((prevState) => ({ ...prevState, message: e.target.value }))} />
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large" style={{ width: 120 }} loading={isPending}>
          Create
        </Button>
      </Form>

    </Content>
  );
};

export default MessagesFromCsv;
