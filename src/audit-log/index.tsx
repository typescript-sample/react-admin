import { Route, Routes } from 'react-router';
import { AuditLogsForm } from "./audit-logs-form";

export default function AuditLogsRoute() {
  return (
    <Routes >
      <Route path='' element={<AuditLogsForm />} />
    </Routes>
  );
}
