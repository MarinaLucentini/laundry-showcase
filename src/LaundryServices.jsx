import React from "react";
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Edit,
  Create,
  SimpleForm,
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
        <TextInput
          source="name"
          label="Service Name"
          validate={[required(), minLength(3)]}
        />
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
        <TextInput
          source="name"
          label="Service Name"
          validate={[required(), minLength(3)]}
        />
      </SimpleForm>
    </Edit>
  );
};

// Adding styles for responsive design
const styles = `
  .laundry-service-list {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  @media (min-width: 768px) {
    .laundry-service-list {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .laundry-service-list .MuiCard-root {
      flex: 1 1 45%;
      margin: 10px;
    }
  }

  .MuiCard-root {
    margin-bottom: 16px;
  }
`;

const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
