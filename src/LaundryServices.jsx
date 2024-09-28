import React from "react";
import { List, Datagrid, TextField, TextInput, Edit, Create, SimpleForm, useRefresh, useNotify, required, minLength } from "react-admin";

export const LaundryServiceList = (props) => (
  <List {...props}>
    <Datagrid
      rowClick="edit"
      sx={{
        "& .RaDatagrid-headerCell": {
          display: { xs: "none", sm: "none", md: "table-cell" }, // Intestazioni delle colonne
        },
        "& .RaDatagrid-cell": {
          display: { xs: "none", sm: "none", md: "table-cell" }, // Celle del corpo della tabella
        },
      }}
    >
      <TextField source="id" sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }} />
      <TextField source="name" label="Service Name" />
    </Datagrid>
  </List>
);

export const LaundryServiceCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();

  const onSuccess = () => {
    notify("Service created successfully!");
    refresh();
  };

  const onFailure = (error) => {
    notify(`Error: ${error.message}`, "warning");
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
    notify("Service updated successfully!");
    refresh();
  };

  const onFailure = (error) => {
    notify(`Error: ${error.message}`, "warning");
  };

  return (
    <Edit {...props} onSuccess={onSuccess} onFailure={onFailure}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" label="Service Name" validate={[required(), minLength(3)]} />
      </SimpleForm>
    </Edit>
  );
};
