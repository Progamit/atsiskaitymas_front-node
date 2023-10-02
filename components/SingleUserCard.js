import {Button, Card, Col, Row} from "react-bootstrap";
import {OnlineUsersDataType, useUserStore} from "../store/userStore.js";
import {socket} from "../App.js";

type SingleUserCardProps = {
    user: OnlineUsersDataType
}

const SingleUserCard = ({user}: SingleUserCardProps) => {

    const userSocketId = useUserStore(state => state.userSocketId)
    const senderUsername = useUserStore(state => state.user?.username)
    const senderCharacter = useUserStore(state => state.user?.character)

    const sendToSocketId = user.id
    const weapon = useUserStore(state => state.userEquippedWeapon)
    const armor = useUserStore(state => state.userEquippedArmor)
    const potion = useUserStore(state => state.userEquippedPotion)

    const equipment = {
        weapon,
        armor,
        potion
    }

    const handleRequest = () => {
        socket.emit("battleRequest", sendToSocketId, senderUsername, equipment, senderCharacter)
    }

    return (
        <>
            {user.id !== userSocketId &&
                <div className="border p-2 rounded mb-2">
                    <Row>
                        <Col>
                            <div className="d-flex align-items-center">
                                <Card style={{padding: "0px", width: "50px"}}>
                                    <Card.Img src={user.user.character.image}/>
                                </Card>
                                <p className="mx-2">{user.user.username}</p>
                            </div>
                        </Col>
                        <Col className="text-end">
                            <Button onClick={handleRequest}>Send Battle Request</Button>
                        </Col>
                    </Row>
                </div>
            }
        </>

    );
};

export default SingleUserCard;