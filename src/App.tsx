import { Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Amplify, Auth } from "aws-amplify";
import { Spinner } from "react-bootstrap";
import { RootState } from "./redux/store";
import routes from "./routes";
import awsConfig from "./features/services/AwsConfigs";
import { removeAuthTokens } from "./Login";
import { setLoggedIn } from "./redux/slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { AWS_CREDS } from "./features/services/AmazonService";
export let INTERNAL_API_CREDS = AWS_CREDS.INTERNAL_API_CREDS!;

function App() {
  const [initialized, setInit] = useState(false);
  const AppDispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.admin.loggedin);

  useEffect(() => {
    if (!initialized) {
      setInit(true);
    }
    Amplify.configure(awsConfig);
    Amplify.Logger.LOG_LEVEL = "INFO";
    Auth.configure(awsConfig);
    if (!isLoggedIn) {
      AppDispatch(setLoggedIn(false));
      removeAuthTokens();
    } else {
      //set the user group
      AppDispatch(setLoggedIn(true));
    }
  }, [initialized, isLoggedIn, AppDispatch]);

  return (
    <>
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <RouterProvider router={routes(isLoggedIn)} />
      </Suspense>
    </>
  );
}

export default App;
