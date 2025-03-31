/* eslint-disable import/no-anonymous-default-export */
import { Auth } from "aws-amplify";

export type UserTypes = "IndividualUser" | "BusinessUser";

export class AuthService {
  static CHANNEL = "auth_channel";

  static AUTH_EVENTS = {
    LOGIN: "login",
    SIGN_OUT: "sign_out",
  };

  static signOut = async () => {
    try {
      const data = await Auth.signOut();
      console.log(data);
    } catch (error) {
      console.log("Failed to sign out");
    }
  };

  async login(username: string, password: string) {
    const user = await Auth.signIn(username, password);
    return user;
  }

  static loginWithToken = async (token: string) => {
    try {
      const user = await Auth.signIn(token);
      return user;
    } catch (error: any) {
      console.log("error signing in with token", error);
    }
  };

  async getCurrentAccessToken() {
    const session = await Auth.currentSession();
    return session.getAccessToken().getJwtToken();
  }
}

export default new AuthService();
