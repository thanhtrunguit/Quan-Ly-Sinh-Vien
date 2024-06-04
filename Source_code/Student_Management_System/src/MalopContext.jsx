
import React, { createContext, useState } from 'react';

const MalopContext = createContext();

const MalopProvider = ({ children }) => {
    const [malopgv, setMalopgv] = useState(null);

    return (
        <MalopContext.Provider value={{ malopgv, setMalopgv }}>
            {children}
        </MalopContext.Provider>
    );
};

export { MalopContext, MalopProvider };
