import StoreModule from "../module";
import axios from "axios";

class AutorizationState extends StoreModule {
  initState() {
    return {
      waiting: false,
      error: null,
      user: {},
      username: "",
      session: false,
    };
  }

  async logIn(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await axios.post(
        "/api/v1/users/sign",
        JSON.stringify({ login, password }),
        { headers: { "Content-Type": "application/json" } }
      );
      this.setState({
        ...this.getState(),
        waiting: false,
        error: null,
        username: response.data.result.user.profile.name,
        session: true,
      });
      localStorage.setItem("token", response.data.result.token);
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.response.data.error.data.issues[0].message,
      });
    }
  }

  async checkAuth() {
    const token = localStorage.getItem("token");

    this.setState({
      ...this.getState(),
      waiting: true,
      user: {},
    });

    try {
      const response = await axios.get("/api/v1/users/self?fields=*", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });

      const userData = response.data.result;

      const userInfo = {
        name: userData.profile.name,
        phone: userData.profile.phone,
        email: userData.email,
      };

      this.setState({
        ...this.getState(),
        waiting: false,
        user: userInfo,
        username: userData.profile.name,
        session: true,
      });

      return userInfo;
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        user: {},
        username: "",
        session: false,
      });

      return null;
    }
  }

  async logOut() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const token = localStorage.getItem("token");

    try {
      await axios.delete("/api/v1/users/sign", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });

      localStorage.removeItem("token");

      this.setState({
        ...this.getState(),
        waiting: false,
        user: {},
        username: "",
        session: false,
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null,
    });
  }
}

export default AutorizationState;