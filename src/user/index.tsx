import { Route, Routes } from 'react-router';
import { UsersForm } from './users-form';
import { UserForm } from './user-form'
import { RoleAssignmentForm } from './role-assignment-form';

export default function UsersRoute() {
  return (
    <Routes>
      <Route path='' element={<UsersForm />} />
      <Route path='/new' element={<UserForm />} />
      <Route path='/:id' element={<UserForm />} />
      <Route path='/:id/assign' element={<RoleAssignmentForm />} />
    </Routes>
  );
}
