import { useRef } from "react"
import { Link } from "react-router-dom"

export const Dashboard = () => {
    const counterRef = useRef({ counter: 0 });

    return (
        <>
            <p>Dashboard</p>

            <p>Contador: {counterRef.current.counter}</p>

            <button onClick={() => counterRef.current.counter++}>Somar</button>

            <Link to="/login">Login</Link>
        </>
    )
}