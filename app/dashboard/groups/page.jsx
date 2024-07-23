"use client";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";
import { getContacts } from "@/utils/https/contacts";
import { addContactsToGroup, createGroup, deleteGroup, deleteGroupContact, getGroups } from "@/utils/https/groups";
import { SearchOutlined, TeamOutlined, CaretDownFilled, CaretUpFilled, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button, Collapse, Divider, Flex, FloatButton, Form, Input,
  Layout, List, Modal, Skeleton, Statistic, Table, Tooltip, Typography, Upload, notification, theme,
} from "antd";
import React from "react";

const { Content } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    onclick: () => console.log("clicked"),
    render: (text) => <span className="capitalize">{text}</span>
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <span className="capitalize">{text}</span>
  },
  {
    title: "Date Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => new Date(date).toDateString(),
  },
  Table.EXPAND_COLUMN
];

const contactsColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span className="capitalize">{text}</span>
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
];

const AllGroupsPage = () => {
  const { form } = Form.useForm()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data, isLoading, error } = useQuery({
    queryKey: "groups",
    queryFn: getGroups,
  });

  const { data: contactsData, isLoading: contactsLoading, error: contactsError } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState(data);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [modalType, setModalyType] = React.useState("create");
  const [currentGroup, setCurrentGroup] = React.useState({});
  const [formValues, setFormValues] = React.useState({
    contactIds: [],
  })
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Group Created",
      description: "Group has been successfully created",
    });
  };

  const queryClient = useQueryClient();
  const { mutate: removeGroupContactQuery, isPending: removePending, error: deleteError, isSuccess: deleteSuccess } = useMutation({
    mutationKey: ["groups", currentGroup._id],
    mutationFn: ({ payload }) => deleteGroupContact({ id: currentGroup._id, payload }),
    onSuccess: () => {
      // Invalidate and refetch groups query to update the UI
      queryClient.invalidateQueries('groups');
      handleCancel();
    },
  });

  const { mutate: deleteGroupQuery, isPending: deletePending, error: deleteGroupError, isSuccess: deleteGroupSuccess } = useMutation({
    mutationKey: ["groups", currentGroup._id],
    mutationFn: () => deleteGroup({ id: currentGroup._id }),
    onSuccess: () => {
      // Invalidate and refetch groups query to update the UI
      queryClient.invalidateQueries('groups');
      handleCancel();
    },
  });

  const { mutate, isPending, error: createError, isSuccess } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
      openNotificationWithIcon("success");
      setTimeout(() => {
        handleCancel();
      })
      // handleCancel();
    },
  });
  const { mutate: mutateAddContacts, isPending: addPending, error: addError, isSuccess: addSuccess } = useMutation({
    mutationFn: ({ payload }) => addContactsToGroup({ id: currentGroup._id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries("groups");
      openNotificationWithIcon("success");
      setTimeout(() => {
        handleCancel();
      })
      // handleCancel();
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

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutate({
      name: formData.get("name"),
      description: formData.get("description"),
    });
  };

  const handleAddContacts = async () => {
    mutateAddContacts({ payload: formValues });
  };
  const handleDeleteGroup = async () => {
    deleteGroupQuery();
  };
  const handleRemoveContact = async (contactId) => {
    const payload = {
      contactIds: [contactId],
    }
    removeGroupContactQuery({ payload });
  };

  if (error)
    return (
      <DashboardFetchingError alertDescription="Unable to retrieve groups" />
    );

  if (isLoading) return <DashboardFetchingLoader categoryName="groups" />;

  return (
    <>
      {contextHolder}
      <FloatButton
        icon={<TeamOutlined style={{ fontSize: 21 }} />}
        type="primary"
        onClick={() => {
          setModalyType("create");
          showModal();
        }}
        style={{ right: 45, width: 50, height: 50 }}
      />
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
            placeholder="Search group by name,number..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setFilteredData(
                data.filter((group) =>
                  group.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
            prefix={<TeamOutlined style={{ fontSize: 17, color: "gray" }} />}
          />
          <Table
            bordered={false}
            dataSource={filteredData ? filteredData : data}
            rowKey={(data) => data._id}
            columns={columns}
            pagination={{ pageSize: 5 }}
            className="cursor-pointer"
            expandable={{
              expandedRowRender: (record) => (
                <Flex gap={8} className="bg-white p-4 cursor-pointer">

                  <Button
                    size="large"
                    onClick={() => {
                      setModalyType("view_group_info");
                      showModal();
                      setCurrentGroup(record)
                    }}
                  >
                    View Group Info
                  </Button>
                  <Button
                    size="large"
                    onClick={() => {
                      setModalyType("add_contacts");
                      showModal();
                      setCurrentGroup(record)
                    }}
                  >
                    Add Contacts
                  </Button>
                  <Button
                    size="large"
                    onClick={() => {
                      setModalyType("delete_group");
                      showModal();
                      setCurrentGroup(record)
                    }}
                    className="!text-red-500 border !border-red-500"
                  >
                    Delete Group
                  </Button>
                </Flex>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable',
              expandIcon: ({ expanded, onExpand, record }) => expanded ? (
                <CaretUpFilled
                  style={{ color: "#798C9A" }}
                  onClick={(e) => {
                    onExpand(record, e)
                  }}
                />
              ) : (
                <CaretDownFilled
                  style={{ color: "#798C9A" }}
                  onClick={(e) => onExpand(record, e)}
                />
              ),
              expandRowByClick: true
            }}
          />
        </div>
      </Content>

      <Modal
        title={modalType === "view_group_info" ? "View Group Info" : modalType === "add_contacts" ? "Add Contacts To Group" : modalType === "delete_group" ? "Delete Group" : "Create new group"}
        open={isModalOpen}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={"fit-content"}
      >
        <Divider />
        {modalType === "create" && (<form onSubmit={handleCreateGroup}>
          <div className="flex flex-col space-y-4">
            <h2>Enter details of new Group</h2>
            <Input
              size="large"
              name="name"
              placeholder="Group Name"
              prefix={<SearchOutlined color="red" />}
            />
            <TextArea placeholder="Description" name="description" rows={4} />
          </div>
          <div className="flex justify-end mt-4 space-x-3">
            <Button size="large" style={{ width: 100 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: 100 }}
              loading={isPending}
            >
              Create
            </Button>
          </div>
        </form>)}
        {modalType === "view_group_info" && (
          <Flex vertical gap={4} className="space-y-4">
            <Collapse
              className="capitalize"
              expandIconPosition="right"
              defaultActiveKey={1}
              bordered={false}
              expandIcon={({ isActive }) => <CaretDownFilled rotate={isActive ? 0 : 90} style={{ color: "#798C9A" }} />}
              items={[{
                key: 1, label: <Title level={5} className="capitalize font-bold">{currentGroup && currentGroup.name}</Title>, children: <>
                  <Flex vertical gap={4} className="space-y-4">
                    <Flex gap={4}>
                      <Flex className="border border-[#4096ff] p-4 rounded-md">
                        <Statistic title="Total Contacts" value={currentGroup && currentGroup.contacts.length} prefix={<UserOutlined />} />
                      </Flex>
                      <Flex className="border border-[#4096ff] p-4 rounded-md">
                        <Statistic title="Used Contacts" value={currentGroup && currentGroup.contacts.length} prefix={<UserOutlined />} />
                      </Flex>
                      <Flex className="border border-[#4096ff] p-4 rounded-md">
                        <Statistic title="UnUsed Contacts" value={currentGroup && currentGroup.contacts.length} prefix={<UserOutlined />} />
                      </Flex>
                    </Flex>
                    <Text className="capitalize">{currentGroup && currentGroup.description}</Text>
                  </Flex>
                </>
              }]}>
            </Collapse>
            <List
              header={<div>Contacts List</div>}
              footer={null}
              rowKey={(item) => item._id}
              pagination={{
                pageSize: 5
              }}
              bordered
              dataSource={currentGroup && currentGroup.contacts}
              renderItem={(item) => (
                <List.Item className="px-2">
                  {removePending ? <Skeleton active paragraph={{ rows: 1 }} /> :
                    (<>
                      <Text className="capitalize">{item.name}</Text>
                      <Text className="capitalize">{item.phone_number}</Text>
                      <Tooltip title={`Remove ${item.name} from this group`}>
                        <DeleteOutlined onClick={() => handleRemoveContact(item._id)} className="cursor-pointer !text-red-600" />
                      </Tooltip>
                    </>)
                  }
                </List.Item>
              )} />
          </Flex>
        )}
        {modalType === "add_contacts" && (
          <>
            <Table
              bordered={false}
              dataSource={contactsData}
              columns={contactsColumns}
              pagination={{ pageSize: 10 }}
              rowKey={(item) => item._id}
              rowSelection={{
                type: "checkbox",
                onChange: (selectedRowKeys, selectedRows) => {
                  setFormValues((prevState) => ({ ...prevState, contactIds: selectedRowKeys }))
                }
              }}
            />
            <Button type="primary" className="" onClick={handleAddContacts}>Add</Button>
          </>
        )}
        {modalType === "delete_group" && (
          <Flex vertical gap={4}>
            <Text className="capitalize">Are you sure you want to delete {currentGroup && currentGroup.name}?</Text>
            <Button type="primary" className="!bg-red-600 w-fit" onClick={handleDeleteGroup}>Yes</Button>
          </Flex>
        )}
      </Modal>
    </>
  );
};

export default AllGroupsPage;
