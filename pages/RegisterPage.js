import {Button, Form} from "react-bootstrap";
import Character from "../components/Character.js";
import {useEffect, useRef, useState} from "react";
import {useCharactersStore} from "../store/charactersStore.js";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    const setCharacters = useCharactersStore(state => state.setCharacters)

    useEffect(() => {
        fetch("http://localhost:8000/users/characters")
            .then(res => res.json())
            .then(data => setCharacters(data.data))
    }, []);

    const characters = useCharactersStore(state => state.characters)

    const [error, setError] = useState("")
    const [selectedCharacter, setSelectedCharacter] = useState<null | string>(null)

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordOneRef = useRef<HTMLInputElement | null>(null)
    const passwordTwoRef = useRef<HTMLInputElement | null>(null)

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        setError("")

        if (!usernameRef.current?.value) return setError("You must enter a username!")

        if (!passwordOneRef.current?.value) return setError("You must enter a password!")

        if (passwordOneRef.current?.value !== passwordTwoRef.current?.value) return setError("Passwords don't match")

        if (!selectedCharacter) return setError("You must select a character!")

        const user = {
            username: usernameRef.current?.value,
            password: passwordOneRef.current?.value,
            character: characters.find(character => character.id === selectedCharacter)
        }

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(user)
        }

        const res = await fetch("http://localhost:8000/users/register", options)
        const data = await res.json()

        if (data.error) return setError(data.message)
    }

    return (
        <div className="container">

            <div className="d-flex flex-column justify-content-center align-items-center">
                <Form onSubmit={(e) => handleRegister(e)}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username"  ref={usernameRef}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPasswordOne">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordOneRef}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPasswordTwo">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordTwoRef}/>
                    </Form.Group>

                    <p>Select Your Character</p>

                    <div className="d-flex gap-2 justify-content-center mt-2 align-items-center">
                        {
                            characters.map(character =>
                                <Character
                                    key={character.id}
                                    image={character.image}
                                    id={character.id}
                                    selectedCharacter={selectedCharacter}
                                    setSelectedCharacter={setSelectedCharacter}
                                />)
                        }
                    </div>

                    {error &&
                        <p className="mt-5 text-danger text-center">{error}</p>
                    }

                    <Button variant="primary" type="submit" className="mt-4">Register</Button>
                </Form>
            </div>
            <p className="mt-5 text-center">Already have user? <Link to="/login">Login</Link></p>
        </div>

    );
};

export default RegisterPage;