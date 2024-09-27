import React from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Edit,
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  useRefresh,
  useNotify,
  required,
  minLength,
} from "react-admin";

export const LaundryServiceList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Service Name" />
      <TextField source="customer.name" label="Associated Customer" />
    </Datagrid>
  </List>
);

export const LaundryServiceCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();

  const onSuccess = () => {
    notify('Service created successfully!');
    refresh();
  };

  const onFailure = (error) => {
    notify(`Error: ${error.message}`, 'warning');
  };

  return (
    <Create {...props} onSuccess={onSuccess} onFailure={onFailure}>
      <SimpleForm>
        <TextInput source="name" label="Service Name" validate={[required(), minLength(3)]} />
      </SimpleForm>
    </Create>
  );
};

export const LaundryServiceEdit = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();

  const onSuccess = () => {
    notify('Service updated successfully!');
    refresh();
  };

  const onFailure = (error) => {
    notify(`Error: ${error.message}`, 'warning');
  };

  return (
    <Edit {...props} onSuccess={onSuccess} onFailure={onFailure}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" label="Service Name" validate={[required(), minLength(3)]} />
        <ReferenceInput label="Associated Customer" source="customerId" reference="customers">
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};