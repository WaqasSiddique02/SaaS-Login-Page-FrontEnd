import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-auto min-h-screen">
        <div className="order-1 lg:order-2 flex justify-center items-center h-full w-full p-6">
          <Outlet/>
        </div>

        <div className="order-2 lg:order-1 bg-blue-100 flex justify-center items-center h-full w-full p-6">
          <img
            src="/images/unsuccessful-state-feedback.png"
            alt="login image"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
      <div className="border-b border-gray-300 w-full" />
      <footer className="text-center py-4 text-gray-600">
        <p>
          © 2025 GrowthX. All Rights Reserved. Designed, Built & Maintained by
          Sid
        </p>
      </footer>
    </>
  )
}

export default AuthLayout;