import React from "react";
import { Layout, theme, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Content } = Layout;

const DashboardFetchingLoader = ({ categoryName }) => {
  const { colorBgContainer, borderRadiusLG } = theme.useToken();

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
      className="flex justify-center items-center space-x-5"
    >
      <div className="flex justify-center items-center space-x-5">
        <span className="text-xl font-bold text-primary">Retrieving {categoryName}</span>
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 32,
              }}
              spin
            />
          }
        />
      </div>
    </Content>
  );
};

export default DashboardFetchingLoader;
