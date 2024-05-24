
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
// import React, { createContext, useState, useEffect, useContext } from 'react';
//
// const MalopContext = createContext();
//
// export const MalopProvider = ({ children }) => {
//     const [malop, setMalopgv] = useState(localStorage.getItem('malop') || '');
//
//     useEffect(() => {
//         localStorage.setItem('malop', malop);
//     }, [malop]);
//
//     return (
//         <MalopContext.Provider value={{ malop, setMalopgv }}>
//             {children}
//         </MalopContext.Provider>
//     );
// };
//
// export const useMalop = () => useContext(MalopContext);
