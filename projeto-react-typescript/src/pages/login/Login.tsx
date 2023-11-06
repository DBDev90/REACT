import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";
// import { UsuarioLogadoContext } from "../../shared/contexts";
import { Link } from "react-router-dom";
import { useUsuarioLogado } from "../../shared/hooks";

export const Login = () => {
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        console.log(email);
        console.log(senha);
    }, [email, senha]);

    const { nomeDoUsuario } = useUsuarioLogado();

    const emailLenght = useMemo(() => {
        console.log('Executou');
        return email.length * 1000;
    }, [email.length]);

    const handleEntrar = useCallback(() => {
        console.log(email);
        console.log(senha);
    }, [email, senha])

    return (
        <>
            <form>
                <p>Quantidade de caracteres no e-mail: {emailLenght}</p>
                <p>{nomeDoUsuario}</p>

                <InputLogin
                    label="E-mail"
                    value={email}
                    onChange={newValue => setEmail(newValue)}
                    onPressEnter={() => inputPasswordRef.current?.focus()}
                />

                <InputLogin
                    type="password"
                    label="Senha"
                    value={senha}
                    ref={inputPasswordRef}
                    onChange={newValue => setSenha(newValue)}
                />

                <ButtonLogin type="button" onClick={handleEntrar}>Entrar</ButtonLogin>
                <ButtonLogin type="button" onClick={handleEntrar}>Cadastrar</ButtonLogin>

                <div>
                    <Link to={"/"}>Início</Link>
                </div>
            </form>
        </>
    )
}