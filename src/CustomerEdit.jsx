import { Edit, email, SimpleForm, TextInput } from "react-admin";

const CustomerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="email" validate={[email()]} />
      <TextInput source="phone" />
    </SimpleForm>
  </Edit>
);

export default CustomerEdit;
