
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Role = 'Super Admin' | 'Admin' | 'Employee' | 'Customer Support';

interface AdminRoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const AdminRoleContext = createContext<AdminRoleContextType | undefined>(undefined);

export const AdminRoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>('Super Admin');

  return (
    <AdminRoleContext.Provider value={{ role, setRole }}>
      {children}
    </AdminRoleContext.Provider>
  );
};

export const useAdminRole = () => {
  const context = useContext(AdminRoleContext);
  if (context === undefined) {
    throw new Error('useAdminRole must be used within an AdminRoleProvider');
  }
  return context;
};
