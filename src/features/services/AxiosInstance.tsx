import axios from "axios";
import { Auth } from "aws-amplify";
const axiosClient = axios.create();


try {
  axiosClient.interceptors.request.use(async (config: any) => {
    return new Promise((resolve, reject) => {
      Auth.currentSession()
        .then(async (session) => {
          var idTokenExpire = session.getIdToken().getExpiration();
          var refreshToken = session.getRefreshToken();
          config!.headers!.Authorization = session.getIdToken().getJwtToken();
          // config!.headers!.Authorization = INTERNAL_API_CREDS;

          var currentTimeSeconds = Math.round(+new Date() / 1000);
          if (idTokenExpire < currentTimeSeconds) {
            Auth.currentAuthenticatedUser().then((res) => {
              res.refreshSession(refreshToken, (err: any, data: any) => {
                if (err) {
                  Auth.signOut();
                } else {
                  config.headers.Authorization = data
                    .getIdToken()
                    .getJwtToken();
                  // config!.headers!.Authorization = INTERNAL_API_CREDS;
                  resolve(config);
                }
              });
            });
          } else {
            config!.headers!.Authorization = session.getIdToken().getJwtToken();
            // config!.headers!.Authorization = INTERNAL_API_CREDS;
            resolve(config);
          }
        })
        .catch(async () => {
          // No logged-in user: don't set auth header
          console.log("user is not logged in");
          resolve(config);
        });
    });
  });
} catch (err) {
  console.log(err);
}
export default axiosClient;
