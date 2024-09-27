import React, { useState } from "react";
import { Admin, Resource } from "react-admin";
import { fetchUtils } from "react-admin";
import { CustomerList } from "./Customers";
import { AdminTheme } from "./AdminTheme";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerCreate from "./CustomerCreate";
import CustomerEdit from "./CustomerEdit";
import { LaundryServiceList, LaundryServiceCreate, LaundryServiceEdit } from "./LaundryServices";

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "https://safe-wallis-hackaton-12ea70e1.koyeb.app";

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
        localStorage.setItem("authToken", authToken.accessToken);
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
        page: page - 1, // Adjust based on backend pagination (0-based indexing)
        size: perPage,
        filter: JSON.stringify(params.filter),
      };

      const url = `${API_URL}/${resource}?${new URLSearchParams(query).toString()}`;
      console.log(`Fetching ${resource} from URL: ${url}`);

      return httpClient(url)
        .then(({ json }) => {
          let data = json.content || json;

          console.log(`${resource} data received:`, data);

          return {
            data: data,
            total: json.totalElements || data.length,
          };
        })
        .catch((error) => Promise.reject(error));
    },

    getOne: (resource, params) =>
      httpClient(`${API_URL}/${resource}/${params.id}`)
        .then(({ json }) => ({
          data: json,
        }))
        .catch((error) => Promise.reject(error)),

    getMany: (resource, params) => {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      const url = `${API_URL}/${resource}?${new URLSearchParams(query).toString()}`;

      return httpClient(url)
        .then(({ json }) => ({
          data: json.content || json, // Adjust based on backend response
        }))
        .catch((error) => Promise.reject(error));
    },

    create: (resource, params) => {
      const url = `${API_URL}/${resource}`;
      console.log(`Creating ${resource} at URL: ${url}`);
      console.log("Data sent:", params.data);

      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(params.data),
      })
        .then((response) => {
          console.log(`Create response status: ${response.status}`);
          if (!response.ok) {
            return response.json().then((error) => {
              console.error("Backend create error:", error);
              return Promise.reject(error);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Create response data:", data);
          if (!data.id) {
            throw new Error("Backend did not return an 'id' field.");
          }
          return { data };
        })
        .catch((error) => Promise.reject(error));
    },

    update: (resource, params) => {
      const url = `${API_URL}/${resource}/${params.id}`;
      console.log(`Updating ${resource} at URL: ${url}`);
      console.log("Data sent:", params.data);

      return fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(params.data),
      })
        .then((response) => {
          console.log(`Update response status: ${response.status}`);
          if (!response.ok) {
            return response.json().then((error) => {
              console.error("Backend update error:", error);
              return Promise.reject(error);
            });
          }
          return response.json();
        })
        .then((data) => ({ data }))
        .catch((error) => Promise.reject(error));
    },

    delete: (resource, params) => {
      const url = `${API_URL}/${resource}/${params.id}`;
      console.log(`Deleting ${resource} at URL: ${url}`);

      return fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => Promise.reject(error));
          }
          return { data: params.id };
        })
        .catch((error) => Promise.reject(error));
    },

    // Custom method for associating Customer and LaundryService
    associateCustomerWithService: (customerId, laundryServiceId) => {
      const url = `${API_URL}/customers/${customerId}/${laundryServiceId}`;
      console.log(`Associating Customer ${customerId} with Laundry Service ${laundryServiceId} at URL: ${url}`);

      return fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
        .then((response) => {
          console.log(`Association response status: ${response.status}`);
          if (!response.ok) {
            return response.json().then((error) => {
              console.error("Backend association error:", error);
              return Promise.reject(error);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Association response data:", data);
          return { data };
        })
        .catch((error) => Promise.reject(error));
    },
    // other methods
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {!localStorage.getItem("authToken") ? (
        <div className="card p-4" style={{ width: "400px" }}>
          <h3 className="text-center mb-4">Accesso Amministratore</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      ) : (
        <Admin basename="/admin" dataProvider={dataProvider} theme={AdminTheme}>
          <Resource name="customers" list={CustomerList} edit={CustomerEdit} create={CustomerCreate} />
          <Resource name="services" list={LaundryServiceList} create={LaundryServiceCreate} edit={LaundryServiceEdit} />
        </Admin>
      )}
    </div>
  );
};

export default AdminPanel;
