import { Create, email, required, SimpleForm, TextInput, useNotify, useRedirect } from "react-admin";

const CustomerCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (data) => {
    notify("Cliente creato con successo", "info");
    redirect("/customers");
  };

  const onFailure = (error) => {
    notify(`Errore: ${error.message || "Impossibile creare il cliente."}`, "warning");
  };

  return (
    <Create {...props} onSuccess={onSuccess} onFailure={onFailure}>
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <TextInput source="email" validate={[required(), email()]} />
        <TextInput source="phone" validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default CustomerCreate;
