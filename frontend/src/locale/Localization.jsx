import { ConfigProvider } from 'antd';

export default function Localization({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2f07e3',
          colorLink: '#1640D6',
          borderRadius: 0,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
