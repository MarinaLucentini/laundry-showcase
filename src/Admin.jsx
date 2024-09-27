import React, { useState } from "react";
import { Admin, Resource } from "react-admin";
import { fetchUtils } from "react-admin";
import { CustomerList, CustomerEdit, CustomerCreate } from "./Customers";
import { AdminTheme } from "./AdminTheme";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://safe-wallis-hackaton-12ea70e1.koyeb.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const authToken = await response.json();
        console.log("Token received:", authToken);
        localStorage.setItem("authToken", authToken);
        navigate("/admin/customers");
      } else {
        const { error } = await response.json();
        setError(error || "Invalid login credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const httpClient = (url, options = {}) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token not found");
      throw new Error("Not authenticated");
    }

    options.headers = new Headers({
      ...options.headers,
      Authorization: `Bearer ${token}`,
    });

    return fetchUtils.fetchJson(url, options);
  };

  const dataProvider = {
    getList: (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
      };
      const url = `${import.meta.env.VITE_API_URL || "https://safe-wallis-hackaton-12ea70e1.koyeb.app"}/${resource}?${new URLSearchParams(query).toString()}`;

      return httpClient(url)
        .then(({ headers, json }) => ({
          data: json,
          total: parseInt(headers.get("content-range").split("/").pop(), 10),
        }))
        .catch((error) => Promise.reject(error)); // Proper error handling
    },

    getOne: (resource, params) =>
      httpClient(`${import.meta.env.VITE_API_URL || "https://safe-wallis-hackaton-12ea70e1.koyeb.app"}/${resource}/${params.id}`)
        .then(({ json }) => ({ data: json }))
        .catch((error) => Promise.reject(error)),

    // other methods (create, update, delete)
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {!localStorage.getItem("authToken") ? (
        <div className="card p-4" style={{ width: '400px' }}>
          <h3 className="text-center mb-4">Accesso Amministratore</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      ) : (
        <Admin basename="/admin" dataProvider={dataProvider} theme={AdminTheme}>
          <Resource name="customers" list={CustomerList} edit={CustomerEdit} create={CustomerCreate} />
        </Admin>
      )}
    </div>
  );
};

export default AdminPanel;
