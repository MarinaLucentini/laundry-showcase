import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { List, Datagrid, TextField, EmailField, ArrayField, SingleFieldList, useDataProvider, useRecordContext } from "react-admin";
const CompleteServiceButton = ({ onDelete }) => {
  const record = useRecordContext(); // Access record from context

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent row click when button is clicked
    if (record && record.id && record.phone) {
      onDelete(record.id, record.phone);
    } else {
      console.error("No record found");
    }
  };

  return (
    <Button onClick={handleClick} variant="contained" color="primary">
      Servizio completato
    </Button>
  );
};

// Add PropTypes validation for the custom button
CompleteServiceButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export const CustomerList = (props) => {
  const dataProvider = useDataProvider(); // Access the dataProvider

  // Handle WhatsApp click and send a message
  const handleWhatsAppClick = (phoneNumber) => {
    const message = "Il capo è pronto, vieni a ritirarlo.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Handle deletion of the customer using the dataProvider
  const handleDeleteClick = (id, phoneNumber) => {
    dataProvider
      .delete("customers", { id }) // Replace 'customers' with your resource name
      .then(() => {
        // After successful deletion, send the WhatsApp message
        handleWhatsAppClick(phoneNumber);
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  return (
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
        <TextField source="name" />
        <EmailField
          source="email"
          sx={{
            display: { xs: "none", sm: "none", md: "table-cell" },
          }}
        />
        <TextField source="phone" sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }} />
        <ArrayField source="laundryServiceResponseListDTOList" sx={{ display: { xs: "none", sm: "none", md: "table-cell" } }}>
          <SingleFieldList>
            <TextField source="name" />
          </SingleFieldList>
        </ArrayField>
        {/* Render the custom button inside the Datagrid */}
        <CompleteServiceButton onDelete={handleDeleteClick} />
      </Datagrid>
    </List>
  );
};
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
