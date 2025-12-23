import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#080b0e] flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
