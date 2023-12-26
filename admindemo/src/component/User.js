import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
  DeleteButton,
} from "react-admin";

// ... Các components khác

export const listUser = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="fullname" />
      <TextField source="password" />
      <TextField source="email" />
      <EditButton />
      <DeleteButton/>
    </Datagrid>
  </List>
);

export const editUser = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="fullname" />
      <TextInput source="password" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export const createUser = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="fullname" />
      <TextInput source="password" />
      <TextInput source="email" />
    </SimpleForm>
  </Create>
);
