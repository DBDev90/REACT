import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";

export const Login = () => {
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        console.log(email);
        console.log(senha);
    }, [email, senha]);

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

                {/* <label>
                    <span>Senha</span>
                    <input type="password" value={senha} ref={inputPasswordRef}
                        onChange={e => setSenha(e.target.value)} />
                </label> */}

                {/* <button type="button" onClick={handleEntrar}>Entrar</button> */}

                <ButtonLogin type="button" onClick={handleEntrar}>Entrar</ButtonLogin>
                <ButtonLogin type="button" onClick={handleEntrar}>Cadastrar</ButtonLogin>
            </form>
        </>
    )
}