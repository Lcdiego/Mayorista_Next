"use client";
import { createContext, useContext } from "react";

const EcommerceContext= createContext();

export const useEcommerce = ()=> useContext(EcommerceContext);

const EcommerceProvider = ({children}) => {

    return(
        <EcommerceContext.Provider value={""}>
            {children}
        </EcommerceContext.Provider>
    )
};

export default EcommerceProvider