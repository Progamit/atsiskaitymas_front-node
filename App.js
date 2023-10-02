import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import GamePage from "./pages/GamePage.js";
import { io } from "socket.io-client"
import {useUserStore} from "./store/userStore.js";
import ArenaPage from "./pages/ArenaPage.js";
import MessageModal from "./components/MessageModal.js";
import {useEffect, useState} from "react";
import {useBattleStore} from "./store/battleStore.js";
export const socket = io("http://localhost:8000", {
    autoConnect: false
})

function App() {

    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("")
    const [modalType, setModalType] = useState("")
    const [roomId, setRoomId] = useState("")

    const nav = useNavigate()

    const setOnlineUsers = useUserStore(state => state.setOnlineUsers)
    const setUserSocketId = useUserStore(state => state.setUserSocketId)
    const setUserGeneratedItems = useUserStore(state => state.setUserGeneratedItems)
    const setUser = useUserStore(state => state.setUser)

    const setBattleData = useBattleStore(state => state.setBattleData)

    useEffect(() => {
        socket.on("connect", () => setUserSocketId(socket.id))

        socket.on("onlineUsers", users => setOnlineUsers(users))

        socket.on("weapons", (weapons, user) => {
            setUserGeneratedItems(weapons)
            setUser(user[0])
        })

        socket.on("inventoryUpdate", updatedUser => setUser(updatedUser[0]))

        socket.on("receiveBattleRequest", (message, roomId) => {
            setRoomId(roomId)
            setModalType("request")
            setModalText(message)
            setShowModal(true)
        })

        socket.on("noWeapon", message => {
            setModalType("error")
            setModalText(message)
            setShowModal(true)
        })

        socket.on("battleStart", data => {
            setRoomId(data.id)
            setBattleData(data)
            nav("/arena")
        })

        socket.on("getResult", data => {
            setBattleData(data)
        })
    }, []);

    return (
        <>
            <MessageModal showModal={showModal} setShowModal={setShowModal} text={modalText} modalType={modalType} roomId={roomId} />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/game" element={<GamePage/>}/>
                <Route path="/arena" element={<ArenaPage roomId={roomId}/>}/>
            </Routes>
        </>
    )
}

export default App