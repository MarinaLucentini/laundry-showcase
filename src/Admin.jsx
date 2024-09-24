import React, { useState } from 'react';
import { Admin, Resource } from 'react-admin';
import { fetchUtils } from 'react-admin';
import { CustomerList, CustomerEdit, CustomerCreate } from './Customers';
import { AdminTheme } from './AdminTheme';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/auth/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/admin/dashboard'); 
      } else {
        const { error } = await response.json();
        setError(error || 'Invalid login credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const httpClient = (url, options = {}) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Not authenticated');
    }
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
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
      const url = `${process.env.VITE_API_URL || 'http://localhost:3000'}/${resource}?${new URLSearchParams(query).toString()}`;

      return httpClient(url).then(({ headers, json }) => ({
        data: json,
        total: parseInt(headers.get('content-range').split('/').pop(), 10),
      }));
    },

    getOne: (resource, params) =>
      httpClient(`${process.env.VITE_API_URL || 'http://localhost:3000'}/${resource}/${params.id}`).then(({ json }) => ({
        data: json,
      })),

    // other methods (create, update, delete, etc.)
  };

  return (
    <div>
      {!localStorage.getItem('token') ? (
        <div>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <Admin
          basename="/admin"
          dataProvider={dataProvider}
          theme={AdminTheme}
        >
          <Resource
            name="customers"
            list={CustomerList}
            edit={CustomerEdit}
            create={CustomerCreate}
          />
        </Admin>
      )}
    </div>
  );
};

export default AdminPanel;
