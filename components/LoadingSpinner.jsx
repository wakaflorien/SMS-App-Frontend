import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner = ({fontSize,color}) => {
  return (
    <Spin
    indicator={
      <LoadingOutlined
        style={{
          fontSize: fontSize || 25,
          color: color || "blue",
        }}
        spin
      />
    }
  />
  )
}

export default LoadingSpinner