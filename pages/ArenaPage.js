import {Button, Col, Row} from "react-bootstrap";
import ArenaPlayerCard from "../components/ArenaPlayerCard.js";
import {useBattleStore} from "../store/battleStore.js";
import {useUserStore} from "../store/userStore.js";
import {socket} from "../App.js";

type ArenaPageType = {
    roomId: string
}

const ArenaPage = ({roomId}:ArenaPageType) => {

    const battleData = useBattleStore(state => state.battleData)
    const currentUsername = useUserStore(state => state.user?.username)

    const handleAttack = () => {
        socket.emit("usedAttack", currentUsername, roomId, battleData)
    }

    return (
        <div className="container rounded">
            <Row>
                <Col>
                    {battleData &&
                        <ArenaPlayerCard player={battleData?.player1}/>
                    }
                </Col>
                <Col>
                    <div className="text-center d-flex flex-column gap-3 align-items-center justify-content-center h-100">
                        {battleData?.turn === currentUsername &&
                            <>
                                <Button onClick={handleAttack}>
                                    ATTACK
                                </Button>
                                <Button variant="success">
                                    USE POTION
                                </Button>
                            </>
                        }

                    </div>
                </Col>
                <Col>
                    {battleData &&
                        <ArenaPlayerCard player={battleData?.player2}/>
                    }
                </Col>
            </Row>

        </div>
    );
};

export default ArenaPage;