import { createContext } from "react";

interface IUsuarioLogadoContextData {
    nomeDoUsuario: string;
}

interface IUsuarioLogadoContextProps {
    children: React.ReactNode;
}

const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

export const UsuarioLogadoProvides: React.FC<IUsuarioLogadoContextProps> = ({ children }) => {
    return (
        <UsuarioLogadoContext.Provider value={{ nomeDoUsuario: "Douglas" }}>
            {children}
        </UsuarioLogadoContext.Provider>
    )
}