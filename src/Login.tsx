import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import AuthService from "./features/services/AuthServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "./redux/slices/AdminSlice";
import { getSeasonalLogo } from "./utils/helper";
import { RootState } from "./redux/store";

export const removeAuthTokens = () => {
  localStorage.clear();
  sessionStorage.clear();
};

const Login = () => {
  const AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { loggedin } = useSelector((state: RootState) => state.admin);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await AuthService.login(email, password);
      if (user) {
        localStorage.setItem('userGroup',user.signInUserSession.idToken.payload["cognito:groups"]);
        localStorage.setItem('storageUser',JSON.stringify(user.attributes));
        toast.success("Login successful");
        AppDispatch(setLoggedIn(true));
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      if (error.toString().includes("NotAuthorizedException")) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError(error.message);
        toast.error(error.message);
      }
      setLoading(false);
    } finally {
      if (loggedin) {
        navigate("/");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email && password) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password]);

  useEffect(() => {
    if (loggedin) {
      navigate("/");
    }
  }
  , [loggedin, navigate]);

  return (
    <>
      <div className="md:flex min-h-full">
        <div className="relative flex-1 bg-[#FBFBFB]">
          <div className="flex justify-center min-h-[100vh] items-center">
            <div className="md:login-card w-full md:w-[32rem] xl:w-[36rem] px-8 py-8 md:px-16 md:py-16">
              <div className="">
                <div className="flex items-center justify-center">
                  <img className="pb-3" src={getSeasonalLogo()} alt="Renegan logo" />
                </div>
                {error !== "" && (
                  <div
                    className="w-full px-5 flex my-[2.81rem] text-[#800205] font-[500]
                 rounded-lg
                 justify-center text-sm items-center h-[3.75rem] bg-[#FFDCE0] "
                  >
                    <span className="text-[#800205] pl-2  font-normal">
                      {error}
                    </span>
                  </div>
                )}

                {/* form section  */}

                <form onSubmit={handleSubmit} className=" mt-10">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black-soft"
                    >
                      Email Address
                    </label>
                    <div className="flex mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(event) => {
                          setError("");
                          setEmail(event.target.value);
                        }}
                        required
                        className="input-control"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-black-soft mb-2 mt-3"
                    >
                      Password
                    </label>

                    <div className="flex mt-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => {
                          setError("");
                          setPassword(event.target.value);
                        }}
                        placeholder="(min of 8 characters)"
                        autoComplete="current-password"
                        required
                        className="password-control"
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="password-button"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-700" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-7">
                    <button
                      type="submit"
                      disabled={loading || !formValid}
                      className={
                        !loading && formValid
                          ? "login-active"
                          : "login-disabled"
                      }
                    >
                      {loading ? "Loading ..." : "Log in"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
