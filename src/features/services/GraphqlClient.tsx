import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {Auth} from "aws-amplify";


export const setupAuthAndRefresh = async() => {
  return new Promise((resolve, reject) => {
    Auth.currentSession()
      .then(async (session) => {
        var idTokenExpire = session.getIdToken().getExpiration();
        var refreshToken = session.getRefreshToken();
        let idTokenToUse = session.getIdToken().getJwtToken();

        var currentTimeSeconds = Math.round(+new Date() / 1000);
        if (idTokenExpire < currentTimeSeconds) {
          Auth.currentAuthenticatedUser().then((res) => {
            res.refreshSession(refreshToken, (err: any, data: any) => {
              if (err) {
                Auth.signOut();
              } else {
                idTokenToUse = data
                  .getIdToken()
                  .getJwtToken();
                // config!.headers!.Authorization = INTERNAL_API_CREDS;
                resolve(idTokenToUse);
              }
            });
          });
        } else {
          idTokenToUse = session.getIdToken().getJwtToken();
          resolve(idTokenToUse);
        }
      })
      .catch(async () => {
        // No logged-in user: don't set auth header
        console.log("user is not logged in");
        resolve("");
      });
  });
}


const httpLink = createHttpLink({
  uri: 'https://mxikk5wlxrbxlnrqzpw7zif4km.appsync-api.eu-west-1.amazonaws.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  return setupAuthAndRefresh()
      .then(token => {
        return {
          headers: {
            ...headers,
            Authorization: token ? token : "",
          }
        }
      })
      .catch(error => {
        console.log("An error occurred when getting creds");
        throw error
      })
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({

  })
});

export const withMethodName = (methodName: string) => ({
    context: {
        headers: {
            methodName: methodName,
        }
    }
});

export default client;
