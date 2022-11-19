import { Route, Routes } from 'react-router';
import { RoleForm } from './role-form';
import { RolesForm } from './roles-form';
import { RoleAssignmentForm } from './role-assignment-form';

export default function RolesRoute() {
  return (
    <Routes >
      <Route path='' element={<RolesForm />} />
      <Route path='/add' element={<RoleForm />} />
      <Route path='/edit/:id' element={<RoleForm />} />
      <Route path='/assign/:id' element={<RoleAssignmentForm />} />
    </Routes>
  );
}
