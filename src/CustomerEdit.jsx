import { Box, Button } from "@mui/material";
import {
  Edit,
  email,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  useNotify,
  useRefresh,
  useDataProvider,
  Toolbar,
  SaveButton,
  useEditContext,
} from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
const CustomToolbar = () => {
  const { record } = useEditContext(); // Access the current record
  const { setValue } = useFormContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();

  const serviceId = useWatch({ name: "serviceId" }); // Watch the serviceId field

  const handleAssociate = async () => {
    if (!serviceId) {
      notify("Please select a laundry service to associate.", "warning");
      return;
    }

    if (!record || !record.id) {
      notify("Customer ID is undefined. Cannot associate.", "warning");
      return;
    }

    console.log(`Associating Customer ${record.id} with Laundry Service ${serviceId}`);

    try {
      await dataProvider.associateCustomerWithService(record.id, serviceId);
      notify("Laundry service associated successfully!", "info");
      // Optionally, clear the serviceId field
      setValue("serviceId", "");
      refresh();
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      notify(`Error: ${errorMessage}`, "warning");
    }
  };

  return (
    <Toolbar>
      <SaveButton />
      <Box ml={2}>
        <Button variant="contained" color="secondary" onClick={handleAssociate} disabled={!serviceId}>
          Associate Laundry Service
        </Button>
      </Box>
    </Toolbar>
  );
};

const CustomerEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<CustomToolbar />}>
        {/* Disabled id field; record.id is accessed via useEditContext */}
        <TextInput source="id" disabled />
        <TextInput source="name" />
        <TextInput source="email" validate={[email()]} />
        <TextInput source="phone" />
        <ReferenceInput label="Laundry Service" source="serviceId" reference="services">
          <SelectInput optionText="name" allowEmpty />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

export default CustomerEdit;
