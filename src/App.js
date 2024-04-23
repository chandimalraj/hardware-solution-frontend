import logo from "./logo.svg";
import "./App.css";
import { Router } from "./routes/router";
import { Routes, BrowserRouter } from "react-router-dom";
import PermissionWrapper from "./components/permissionWrapper";
import { MiniDrawer } from "./components/global/NewNavBar";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <PermissionWrapper component={<MiniDrawer />} />
          <Routes>{Router}</Routes>
          <ToastContainer/>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${(props) => (props.sx ? props.sx : "")}
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #e5e4e2;
`;

export default App;
