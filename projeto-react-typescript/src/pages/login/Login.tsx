import { useCallback, useEffect, useMemo, useState } from "react"

export const Login = () => {
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

                <label>
                    <span>E-mail</span>
                    <input value={email} onChange={e => setEmail(e.target.value)} />
                </label>

                <label>
                    <span>Senha</span>
                    <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                </label>

                <button type="button" onClick={handleEntrar}>Entrar</button>
            </form>
        </>
    )
}