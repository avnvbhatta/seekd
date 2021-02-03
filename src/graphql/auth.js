import config from "./config"
import * as Realm from "realm-web";

export const loginEmailPassword = async (email, password) => {
    // Create an anonymous credential
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
      // Authenticate the user
      const user = await config.app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      return user
    } catch(err) {
      console.error("Failed to log in", err);
    }
  }
