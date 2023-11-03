import { useNavigate } from "react-router-dom"


export const Login = () => {
    const history = useNavigate();

    const handleClick = () => {
        history('/pagina-inicial')
    }

    return (
        <>
            Login

            <button onClick={handleClick}>Início</button>
        </>
    )
}