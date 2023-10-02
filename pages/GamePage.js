import {Row} from "react-bootstrap";
import Dashboard from "../components/Dashboard";
import Generator from "../components/Generator";
import OnlineUsers from "../components/OnlineUsers.js";
import Inventory from "../components/Inventory.js";
import {useState} from "react";
import {useUserStore} from "../store/userStore.js";
import {Link} from "react-router-dom";

const GamePage = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = useUserStore(state => state.user)

    return (
        <div className="container">
            {user ?
                <>
                    <Dashboard handleShow={handleShow}/>
                    <Row className="mt-5">
                        <Generator/>
                        <OnlineUsers/>
                        <Inventory handleClose={handleClose} show={show}/>
                    </Row>
                </>
                :
                <div className="text-center mt-5">
                    You must <Link to={"/login"}>login</Link>
                </div>
            }
        </div>
    );
};

export default GamePage;