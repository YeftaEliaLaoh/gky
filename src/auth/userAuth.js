
import { useContext, createContext } from "react";
export const authContext = createContext();
export function useAuth() {
    return useContext(authContext);
}