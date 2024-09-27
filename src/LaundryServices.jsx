import React from "react";
import { List, Datagrid, TextField, TextInput, Edit, Create, SimpleForm } from "react-admin";

export const LaundryServiceList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="serviceName" label="Service Name" />
    </Datagrid>
  </List>
);

export const LaundryServiceCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="serviceName" label="Service Name" />
    </SimpleForm>
  </Create>
);

export const LaundryServiceEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="serviceName" label="Service Name" />
    </SimpleForm>
  </Edit>
);
