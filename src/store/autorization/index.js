import StoreModule from "../module";
import axios from "axios";

class AutorizationState extends StoreModule {
  initState() {
    return {
      waiting: false,
      error: null,
      user: null,
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

      const user = response.data.result.user;
      this.setState({
        ...this.getState(),
        waiting: false,
        error: null,
        user: {
          name: user.profile.name,
          phone: user.profile.phone,
          email: user.email,
        }
      });
      localStorage.setItem("token", response.data.result.token);
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message,
      });
    }
  }

  async checkAuth() {
    const token = localStorage.getItem("token");

    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await axios.get("/api/v1/users/self?fields=*", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      const user = response.data.result;
      this.setState({
        ...this.getState(),
        waiting: false,
        user: {
          name: user.profile.name,
          phone: user.profile.phone,
          email: user.email,
        },
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  async logOut() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const token = localStorage.getItem("token");

    await axios.delete("/api/v1/users/sign", {
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    });
    localStorage.removeItem("token");
    this.setState({
      waiting: false,
      error: null,
      user: null,
    });
  }
}

export default AutorizationState;