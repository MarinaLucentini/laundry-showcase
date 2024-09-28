// authProvider.js
const authProvider = {
  login: async ({ email, password }) => {
    const response = await fetch("https://safe-wallis-hackaton-12ea70e1.koyeb.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const authToken = await response.json();
      const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 giorno
      localStorage.setItem("authToken", authToken.accessToken);
      localStorage.setItem("tokenExpiry", expiryTime);
      return Promise.resolve();
    } else {
      const error = await response.json();
      return Promise.reject(error.message || "Invalid login credentials");
    }
  },
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
    return Promise.resolve();
  },
  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    const token = localStorage.getItem("authToken");
    const expiry = localStorage.getItem("tokenExpiry");

    if (token && expiry) {
      const now = new Date().getTime();
      if (now < parseInt(expiry, 10)) {
        return Promise.resolve();
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiry");
        return Promise.reject();
      }
    }
    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;
