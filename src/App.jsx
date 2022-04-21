import React from "react";
import AppRouter from "./components/AppRouter";
import AuthContextProvider from "./contexts/AuthContext";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
function App(props) {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
