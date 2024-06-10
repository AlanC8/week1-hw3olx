"use client";
import { useEffect, useState } from "react";
import { ApiService } from "../ApiClient/ApiClient";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [login, setLogin] = useState({
    loginInput: "",
    passwordInput: "",
  });
  const checkLogin = async () => {
    const response = await ApiService.loginUser(
      login.loginInput,
      login.passwordInput
    );
    if (response.data.token) {
      localStorage.setItem("access", response.data.token);
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex min-h-full bg-white flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onClick={(e) => e.preventDefault()} className="space-y-6 mb-24">
            <div>
              <label
                htmlFor="Username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setLogin({ ...login, loginInput: e.target.value })
                  }
                  value={login.loginInput}
                  id="Username"
                  name="Username"
                  type="Username"
                  autoComplete="Username"
                  required
                  className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) =>
                    setLogin({ ...login, passwordInput: e.target.value })
                  }
                  value={login.passwordInput}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block px-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={checkLogin}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
