import React, { useRef } from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  NumberInput,
  Create,
  ReferenceInput,
  SelectInput,
  useNotify,
  useRedirect,
  DeleteButton,
} from "react-admin";

import ImageUploadForm from "./ImageUploadForm";

export const listProduct = (props) => (
  <List {...props}>
    <Datagrid style={{ overflowX: "auto" }}>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="photo" />
      <TextField source="price" />
      <TextField source="category.title" />
      <EditButton />
      <DeleteButton/>
    </Datagrid>
  </List>
);

export const editProduct = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="photo" />
        <NumberInput source="price" />
        <TextInput source="description" multiline fullWidth />
        <ReferenceInput
          label="Category"
          source="category.id"
          reference="categories"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

export const CreateProduct = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const imageUploadFormRef = useRef();

  const onSuccess = (data) => {
    notify(`created successfully`);

    if (imageUploadFormRef.current) {
      imageUploadFormRef.current.handleImageUpload(data.photo);
    }
    redirect("list", "products");
  };
  return (
    <Create {...props} mutationOptions={{ onSuccess }} redirect="products">
      <SimpleForm>
        <TextInput source="title" />
        <NumberInput source="price" />
        <TextInput source="photo" />
        <TextInput source="description" multiline fullWidth />
        <ReferenceInput
          label="Category"
          source="category.id"
          reference="categories"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
        <ImageUploadForm ref={imageUploadFormRef} />
      </SimpleForm>
    </Create>
  );
};
