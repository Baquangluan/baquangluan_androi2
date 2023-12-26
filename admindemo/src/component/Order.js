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

export const listOrder = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" /> {/* Thay "title" bằng "email" */}
      <TextField source="fullname" /> {/* Thay "description" bằng "fullname" */}
      <TextField source="order_date" /> {/* Thêm trường ngày đặt hàng */}
      <TextField source="total_money" /> {/* Thêm trường tổng tiền */}
      <EditButton />
      <DeleteButton/>
    </Datagrid>
  </List>
);

export const editOrder = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="email" /> {/* Thay "title" bằng "email" */}
      <TextInput source="fullname" /> {/* Thay "description" bằng "fullname" */}
      <TextInput source="order_date" defaultValue={new Date()} /> {/* Thêm trường ngày đặt hàng */}
      <TextInput source="total_money" /> {/* Thêm trường tổng tiền */}
    </SimpleForm>
  </Edit>
);

export const createOrder = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="email" /> {/* Thay "title" bằng "email" */}
      <TextInput source="fullname" /> {/* Thay "description" bằng "fullname" */}
      <TextInput source="order_date" defaultValue={new Date()}/> {/* Thêm trường ngày đặt hàng */}
      <TextInput source="total_money" /> {/* Thêm trường tổng tiền */}
    </SimpleForm>
  </Create>
);
