import React from "react";
import { Admin, Resource } from "react-admin";
import { CustomerList, CustomerEdit, CustomerCreate } from "./Customers";
import { AdminTheme } from "./AdminTheme";
import jsonServerProvider from "ra-data-json-server";

// Replace this URL with the actual API endpoint
const dataProvider = jsonServerProvider("http://localhost:3001");

const AdminPanel = () => (
  <Admin basename="/admin" dataProvider={dataProvider} theme={AdminTheme}>
    <Resource name="customers" list={CustomerList} edit={CustomerEdit} create={CustomerCreate} />
  </Admin>
);

export default AdminPanel;
