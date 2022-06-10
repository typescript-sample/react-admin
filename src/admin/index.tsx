import React from "react";
import { Route, Routes } from "react-router";
import { RoleAssignmentForm } from "./role-assignment-form";
import { RoleForm } from "./role-form";
import { RolesForm } from "./roles-form";
import { UserForm } from "./user-form";
import { UsersForm } from "./users-form";
import { ItemsForm } from "./items-form";
import { ItemForm } from "./item-form";
import { ArticlesForm } from "./articles-form";
import { ArticleForm } from "./article-form";

export default function Admin() {
  return (
    <React.Fragment>
      <Route path="/admin/users" element={<UsersForm />} />
      <Route path="/admin/users/:id" element={<UserForm />} />
      <Route path="/admin/roles" element={<RolesForm />} />
      <Route path="/admin/roles/:id" element={<RoleForm />} />
      <Route path="/admin/roles/assign/:id" element={<RoleAssignmentForm />} />
      <Route path="/admin/items" element={<ItemsForm />} />
      <Route path="/admin/items/:id" element={<ItemForm />} />
      <Route path="/admin/articles" element={<ArticlesForm />} />
      <Route path="/admin/articles/:id" element={<ArticleForm />} />
    </React.Fragment>
  );
}
