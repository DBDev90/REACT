import { createContext } from "react";

interface IUsuarioLogadoContextData {
    nomeDoUsuario: string;
}

interface IUsuarioLogadoContextProps {
    children: React.ReactNode;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoContextProps> = ({ children }) => {
    return (
        <UsuarioLogadoContext.Provider value={{ nomeDoUsuario: "Teste" }}>
            {children}
        </UsuarioLogadoContext.Provider>
    )
}