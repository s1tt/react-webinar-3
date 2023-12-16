import StoreModule from "../module";

class LoginState extends StoreModule {
  initState() {
    return {
      authorized: false,
      userData: {},
      error: null,
    };
  }

  async getInfo() {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      return;
    }

    const response = await fetch(`/api/v1/users/self?fields=*`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-Token": token,
      },
    });

    const json = await response.json();

    this.setState({
      ...this.getState(),
      authorized: true,
      userData: json.result,
    });
  }

  async login(login, password) {
    console.log(`
    login: ${login},
      password: ${password},
    `);
    const bodyReq = {
      login: login,
      password: password,
      // "remember": true,
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
      });
    } else {
      localStorage.setItem("token", JSON.stringify(json.result.token));

      this.setState({
        ...this.getState(),
        authorized: true,
        userData: json.result.user,
        error: null,
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
      userData: {},
      error: null,
    });

    localStorage.removeItem("token");
  }
}

export default LoginState;
