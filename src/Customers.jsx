import React from "react";
import PropTypes from "prop-types";
import { List, Datagrid, TextField, EmailField, ArrayField, SingleFieldList, useDataProvider, useRefresh, useRecordContext } from "react-admin";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/system";

// Styled components for responsive design
const StyledDatagrid = styled(Datagrid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& .RaDatagrid-headerCell": {
      display: "none",
    },
    "& .RaDatagrid-row": {
      "& > td": {
        display: "block",
        width: "100%",
        textAlign: "right",
        "&:before": {
          content: "attr(data-label)",
          float: "left",
          fontWeight: "bold",
        },
      },
    },
  },
}));

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
    <Button
      onClick={handleClick}
      variant="contained"
      color="primary"
      size="medium"
      sx={{
        padding: "10px 16px",
        fontSize: "16px",
        margin: "4px",
      }}
    >
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
  const refresh = useRefresh(); // Get refresh function

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
        refresh(); // Refresh the list to reflect the deletion
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  return (
    <List {...props}>
      <Box sx={{ overflowX: "0" }}>
        <StyledDatagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="phone" />
          <ArrayField source="laundryServiceResponseListDTOList">
            <SingleFieldList>
              <TextField source="name" />
            </SingleFieldList>
          </ArrayField>
          <CompleteServiceButton onDelete={handleDeleteClick} />
        </StyledDatagrid>
      </Box>
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
