import StoreModule from "../module";

class LoginState extends StoreModule {
  initState() {
    return {
      authorized: false,
      userData: null,
      error: null,
      waiting: true,
    };
  }

  async getInfo() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (token) {
        const response = await fetch(`/api/v1/users/self?fields=*`, {
          method: "GET",
          headers: {
            accept: "application/json",
            "X-Token": token,
          },
        });

        const json = await response.json();

        if (json.result) {
          this.setState({
            ...this.getState(),
            authorized: true,
            userData: json.result,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  async login(login, password) {
    const bodyReq = {
      login: login,
      password: password,
    };

    const response = await fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyReq),
    });

    const json = await response.json();

    if (json.error) {
      this.setState({
        ...this.getState(),
        error: json.error,
        waiting: false,
      });
    } else {
      localStorage.setItem("token", JSON.stringify(json.result.token));

      this.setState({
        ...this.getState(),
        authorized: true,
        userData: json.result.user,
        error: null,
        waiting: false,
      });
    }
  }

  async logOut() {
    let token = JSON.parse(localStorage.getItem("token"));

    await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "X-Token": token,
      },
    });

    this.setState({
      ...this.getState(),
      authorized: false,
      userData: null,
      error: null,
      waiting: false,
    });

    localStorage.removeItem("token");
  }

  clearErrors() {
    this.setState({
      ...this.getState(),
      error: null,
    });
  }
}

export default LoginState;
