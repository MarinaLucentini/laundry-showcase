import { Edit, email, SimpleForm, TextInput, ReferenceInput, SelectInput } from "react-admin";

const CustomerEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="email" validate={[email()]} />
      <TextInput source="phone" />
      <ReferenceInput label="Laundry Service" source="serviceId" reference="services">
        <SelectInput optionText="serviceName" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default CustomerEdit;
