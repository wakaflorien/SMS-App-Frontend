"use client";
import Chart from "@/components/dashboard/Chart";
import DashboardFetchingError from "@/components/dashboard/DashboardFetchingError";
import DashboardFetchingLoader from "@/components/dashboard/DashboardFetchingLoader";
import { getMessages } from "@/utils/https/messages";
import { getLoggedInUser } from "@/utils/https/users";
import {
  CloseOutlined,
  DeliveredProcedureOutlined,
  SendOutlined,
  WalletOutlined
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Layout, theme, Typography } from "antd";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
const { Content } = Layout;

const DashboardPage = () => {
  const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken();

  const tokenValue = Cookies.get("token");
  const decoded = tokenValue && jwtDecode(tokenValue);
  const { id: userId } = decoded;

  const { data, isLoading, error } = useQuery({
    queryKey: "messages",
    queryFn: getMessages,
  });

  const { data: usersData, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getLoggedInUser(userId),
  });

  if (error)
    return (
      <DashboardFetchingError alertDescription="Unable to retrieve message data" />
    );

  if (isLoading || usersLoading) return <DashboardFetchingLoader categoryName="Dashboard" />;

  return (
    <Content
      style={{
        margin: "24px 16px",
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
      className="my-4 md:my-6  mx-2 md:mx-4 p-2 md:p-6"
    >
      <>ndimuto</>
      <div className="block md:flex space-x-8 mt-3 space-y-2 mb-12">
        <Card
          style={{
            width: 300,
            height: 130,
          }}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col space-y-1">
                <span className="text-gray-600 font-semibold">
                  Sent Messages
                </span>
                <span className="text-2xl font-bold">{data.length}</span>
              </div>
              <div className="bg-blue-500 text-white px-2 py-1 rounded-lg">
                <SendOutlined />
              </div>
            </div>
            <div className="flex justify-between text-xs text-blue-500">
              <span>{new Date().toDateString()}</span>
              <Link href="/dashboard/messages">View More ...</Link>
            </div>
          </div>
        </Card>

        <Card
          style={{
            width: 300,
            height: 130,
          }}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col space-y-1">
                <span className="text-gray-600 font-semibold">
                  Failed Messages
                </span>
                <span className="text-2xl font-bold">{data.filter((item) => item.status === "failed").length}</span>
              </div>
              <div className="bg-red-500 text-white px-2 py-1 rounded-lg">
                <CloseOutlined />
              </div>
            </div>
            <div className="flex justify-between text-xs text-red-500">
              <span>{new Date().toDateString()}</span>
              <Link href="/dashboard/messages">View More ...</Link>
            </div>
          </div>
        </Card>

        <Card
          style={{
            width: 300,
            height: 130,
          }}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col space-y-1">
                <span className="text-gray-600 font-semibold">
                  Delivered Messages
                </span>
                <span className="text-2xl font-bold">{data.filter((item) => item.status === "sent").length}</span>
              </div>
              <div className="bg-green-500 text-white px-2 py-1 rounded-lg">
                <DeliveredProcedureOutlined />
              </div>
            </div>
            <div className="flex justify-between text-xs text-green-500">
              <span>{new Date().toDateString()}</span>
              <Link href="/dashboard/messages">View More ...</Link>
            </div>
          </div>
        </Card>

        <Card
          style={{
            width: 300,
            height: 130,
          }}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col space-y-1">
                <span className="text-gray-600 font-semibold">
                  Total Amount
                </span>
                <span className="text-2xl font-bold">{usersData.balance}</span>
              </div>
              <div className="bg-yellow-400 text-white px-2 py-1 rounded-lg">
                <WalletOutlined />
              </div>
            </div>
            <div className="flex justify-between text-xs text-yellow-400">
              <span>{new Date().toDateString()}</span>
              <Link href="/dashboard/messages">View More ...</Link>
            </div>
          </div>
        </Card>
      </div>
      <Chart />
    </Content>
  );
};

export default DashboardPage;
