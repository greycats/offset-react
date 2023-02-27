import React from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { useToken } from "./services/auth";
import NavBar from "./components/NavBar/NavBar";

export const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <NavBar removeToken={() => setToken(null)} />
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
        <Redirect to="/dashboard" />
      </BrowserRouter>
    </Box>
  );
};
