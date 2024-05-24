
import React, { createContext, useState } from 'react';

const UserRole = createContext();

const UserRoleProvider = ({ children }) => {
    const [userrole, setuserrole] = useState(null);

    return (
        <UserRole.Provider value={{ userrole, setuserrole }}>
            {children}
        </UserRole.Provider>
    );
};

export { UserRole, UserRoleProvider };

