import {Button, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {useUserStore} from "../store/userStore.js";
import {socket} from "../App.js";

const LoginPage = () => {

    const [error, setError] = useState("")

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    const setUser = useUserStore(state => state.setUser)

    const nav = useNavigate()

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        if (!usernameRef.current?.value) return setError("You must enter a username!")

        if (!passwordRef.current?.value) return setError("You must enter a password!")

        const user = {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
        }

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(user)
        }

        const res = await fetch("http://localhost:8000/users/login", options)
        const data = await res.json()

        if (data.error) return setError(data.message)

        setUser(data.data[0])
        socket.connect()
        socket.emit("userConnected", user.username)
        nav("/game")
    }

    return (
        <div className="container">

            <div className="d-flex flex-column justify-content-center align-items-center">
                <Form onSubmit={(e) => handleLogin(e)}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username"  ref={usernameRef}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
                    </Form.Group>

                    {error &&
                        <p className="mt-5 text-danger">{error}</p>
                    }

                    <Button variant="primary" type="submit" className="mt-4">Login</Button>
                </Form>
            </div>
            <p className="mt-5 text-center">Don't have user? <Link to="/register">Register</Link></p>
        </div>
    );
};

export default LoginPage;