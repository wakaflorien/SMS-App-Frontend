"use client";
import React from "react";
import { Layout, theme, Button, Upload, Input, Form, Progress } from "antd";
import { readFile } from "@/utils/https/functions/readFile";
import { useMutation } from "@tanstack/react-query";
import { acceptExtensions } from "../../messages/fromcsv/page";
import { createBulkontacts } from "@/utils/https/contacts";
import { Icon } from "@iconify/react";

const { Content } = Layout;

const ContactsFromCsvPage = () => {
  const { form } = Form.useForm()
  const { TextArea } = Input;
  const { Dragger } = Upload;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [formValues, setFormValues] = React.useState([{
      name: "",
      email: "",
      phone_number: "",
    }]);
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [fileData, setFileData] = React.useState([]);


  const fileProcessing = async (file, onSuccess, onError) => {
    if (file) {
      setUploadLoading(true);
      const response = await readFile(file);
      // TODO: validate the response
      if (response) {
        setUploadLoading(false)
        setUploadSuccess(true);
        setFileData(response.fileData);

        // Update the state with the response data
        // setFormValues(response.fileData.map(item => ({
        //   name: item.name,
        //   email: item.email,
        //   phone_number: item.phone_number,
        //   description: item.description
        // })));

      setFormValues(prevState => [...response.fileData.map(item => ({
        name: item.name,
        email: item.email,
        phone_number: item.phone_number,
        description: "Bulk contact"
      }))]);
      
        onSuccess("Ok");
        message.success("Upload successful");
      } else {
        setUploadLoading(false)
        setUploadSuccess(false);
        onSuccess("Ok");
        onError("Something went wrong. Please try again later");
      }
    }
  }

  const props = {
    name: 'file',
    accept: acceptExtensions,
    showUploadList: true,
    multiple: true,
    customRequest: async ({ onSuccess, onError, file }) => {
      fileProcessing(file, onSuccess, onError)
    },
  };

  const { mutate, data, isPending, error, isSuccess } = useMutation({
    mutationFn: createBulkontacts,
    onSuccess: () => {
      setFormValues({
        name: "",
        email: "",
        phone_number: "",
      });
      querryClient.invalidateQueries("contacts");
    },
  });

  const handleSubmit = async () => {
    const payload = {
      contacts: formValues
    }
    mutate(payload);
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
        onFinish={async () => {
          await handleSubmit();

          // form.resetFields();
        }}
      >
        <Form.Item label="File" name="file" rules={[{ required: true, message: "Please select file" }]}>
          <Dragger {...props} className="flex flex-col items-center rounded-md bg-white  w-full text-[#1677FF]" >
            <div className='flex flex-col items-center gap-2'>
              <p className="flex items-center justify-center">
                <Icon icon="fa6-solid:file-circle-plus" width="40" height="36" className='text-[#1677FF]' />
              </p>
              <p className="p-2 rounded-md text-white bg-[#1677FF] items-center justify-center">Select an Excel or CSV file to upload</p>
              <p className="text-center text-base">
                Or drag and drop it here
              </p>
            </div>
          </Dragger>
        </Form.Item>

        {isPending || uploadLoading && (<Progress />)}
        <Button type="primary" htmlType="submit" size="large" style={{ width: 120 }} loading={isPending}>
          Create
        </Button>
      </Form>
    </Content>
  );
};

export default ContactsFromCsvPage;
