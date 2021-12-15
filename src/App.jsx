import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import { EmployeeContextProvider } from "./context/EmployeeContext";
import { FeedbackContextProvider } from "./context/FeedbackContext";
import { LinkRoutes } from "./routers/LinkRoutes";


function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <EmployeeContextProvider>
          <FeedbackContextProvider>
            <LinkRoutes />
          </FeedbackContextProvider>
        </EmployeeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
