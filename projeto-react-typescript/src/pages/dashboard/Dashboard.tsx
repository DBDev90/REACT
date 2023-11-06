import { useRef } from "react"
import { Link } from "react-router-dom"
// import { UsuarioLogadoContext } from "../../shared/contexts";
import { useUsuarioLogado } from "../../shared/hooks";

export const Dashboard = () => {
    const counterRef = useRef({ counter: 0 });

    // const usuarioLogadoContext = useContext(UsuarioLogadoContext);
    const { nomeDoUsuario, logout } = useUsuarioLogado();

    return (
        <>
            <p>Dashboard</p>

            <p>{nomeDoUsuario}</p>

            <p>Contador: {counterRef.current.counter}</p>

            <button onClick={() => counterRef.current.counter++}>Somar</button>
            <button onClick={logout}>Logout</button>

            <div>
                <Link to="/login">Login</Link>
            </div>
        </>
    )
}