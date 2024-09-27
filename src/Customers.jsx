import React from "react";
import { List, Datagrid, TextField, EmailField, ArrayField, SingleFieldList } from "react-admin";

export const CustomerList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <ArrayField source="laundryServiceResponseListDTOList">
        <SingleFieldList>
          <TextField source="name" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);
// export const CustomerEdit = (props) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" />
//       <TextInput source="name" />
//       <TextInput source="email" />
//       <TextInput source="phone" />
//     </SimpleForm>
//   </Edit>
// );

// export const CustomerCreate = (props) => (
//   <Create {...props}>
//     <SimpleForm>
//       <TextInput source="name" />
//       <TextInput source="email" />
//       <TextInput source="phone" />
//     </SimpleForm>
//   </Create>
// );
