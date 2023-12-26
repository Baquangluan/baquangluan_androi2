import React from "react";
import { Admin, Resource } from "react-admin";
import AdminPanel from "./component/AdminPanel";
import {
  listCategory,
  editCategory,
  createCategory,
} from "./component/Category";

import { listProduct, editProduct, CreateProduct } from "./component/Products";

import dataProvider from "./component/customDataProvider";
import { createUser, editUser, listUser } from "./component/User";
import { createOrder, editOrder, listOrder } from "./component/Order";

const App = () => (
  <Admin dashboard={AdminPanel} dataProvider={dataProvider}>
    <Resource
      name="categories"
      list={listCategory}
      edit={editCategory}
      create={createCategory}
    />
    <Resource
      name="products"
      list={listProduct}
      edit={editProduct}
      create={CreateProduct}
    />
    <Resource
      name="users"
      list={listUser}
      edit={editUser}
      create={createUser}
    />
    <Resource
      name="orders"
      list={listOrder}
      edit={editOrder}
      create={createOrder}
    />
  </Admin>
);

export default App;
