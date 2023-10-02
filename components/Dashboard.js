import {Button, Card, Col, ProgressBar, Row} from "react-bootstrap";
import {ArrowRightOnRectangleIcon, BriefcaseIcon, CircleStackIcon} from "@heroicons/react/24/outline";
import {useUserStore} from "../store/userStore.js";
import {useNavigate} from "react-router-dom";
import {socket} from "../App.js";

type PropsType = {
    handleShow: () => void
}

const Dashboard = ({handleShow}:PropsType) => {

    const user = useUserStore(state => state.user)
    const userSocketId = useUserStore(state => state.userSocketId)
    const setUser = useUserStore(state => state.setUser)

    const nav = useNavigate()
    const handleLogout = () => {
        setUser(null)
        socket.emit("userDisconnected", userSocketId)
        socket.disconnect()
        nav("/")
    }

    return (
        <Row>
            <Col>
                <div className="d-flex align-items-center">
                    <div>
                        <Card style={{padding: "0px", width: "50px"}}>
                            <Card.Img src={user?.character.image}/>
                        </Card>
                    </div>
                    <div>
                        <p className="mx-2 mb-0 mt-3 text-primary">{user?.username}</p>
                        <p className="mx-2 mt-0 d-flex align-items-center gap-1">
                            <CircleStackIcon className="text-warning" style={{width: "20px"}}/> {user?.tokens}
                        </p>
                    </div>
                </div>
                <div>
                    <ProgressBar variant="success" className="mt-2" now={user?.experience} label={`XP: ${user?.experience}`}/>
                </div>
            </Col>

            <Col className="d-flex justify-content-between align-items-center">
                <Button variant="warning" onClick={handleShow} className="me-2">
                    <BriefcaseIcon style={{width: "20px"}}/> Inventory
                </Button>

                <Button variant="secondary" onClick={handleLogout}>
                    <ArrowRightOnRectangleIcon style={{width: "23px"}}/>Logout
                </Button>
            </Col>
        </Row>
    );
};

export default Dashboard;