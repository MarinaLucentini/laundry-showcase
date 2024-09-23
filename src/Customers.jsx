import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  EmailField, 
  Edit, 
  SimpleForm, 
  TextInput, 
  Create 
} from 'react-admin';

export const CustomerList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
    </Datagrid>
  </List>
);

export const CustomerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Edit>
);

export const CustomerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);