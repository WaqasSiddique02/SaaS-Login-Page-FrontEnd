import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/auth_layout";
import LoginForm from "./pages/login";
import RegisterForm from "./pages/register";
import SendOtpForm from "./pages/sendOtp";
import ForgotPasswordForm from "./pages/forgotPassword";
import Home from "./layouts/home";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="sendOtp" element={<SendOtpForm />} />
        <Route path="forgotPassword" element={<ForgotPasswordForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
