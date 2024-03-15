import React from "react";
import { Layout, theme, Alert } from "antd";

const { Content } = Layout;

const DashboardFetchingError = ({ alertDescription }) => {
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
    >
      <Alert
        message="Error!"
        description={alertDescription || "Unable to retrieve data"}
        type="error"
      />
    </Content>
  );
};

export default DashboardFetchingError;
