import { Route, Routes } from 'react-router';
import { UsersForm } from './users-form';
import { UserForm } from './user-form'
import { RoleAssignmentForm } from './role-assignment-form';

export default function UsersRoute() {
  return (
    <Routes>
      <Route path='' element={<UsersForm />} />
      <Route path='/add' element={<UserForm />} />
      <Route path='/edit/:id' element={<UserForm />} />
      <Route path='/assign/:id' element={<RoleAssignmentForm />} />
    </Routes>
  );
}
