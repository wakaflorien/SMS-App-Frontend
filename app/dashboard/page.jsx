"use client";
import React from "react";
import { Layout, theme, Card, Typography } from "antd";
import Link from "next/link";
import Chart from "@/components/dashboard/Chart";
import {
  DeliveredProcedureOutlined,
  SendOutlined,
  CheckOutlined,
  CloseOutlined,
  WarningOutlined,
  WalletOutlined,
} from "@ant-design/icons";
const { Content } = Layout;

const DashboardPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { Title, Text } = Typography;

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
                <span className="text-2xl font-bold">350</span>
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
                <span className="text-2xl font-bold">150</span>
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
                <span className="text-2xl font-bold">200</span>
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
                <span className="text-2xl font-bold">$ 2000</span>
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
