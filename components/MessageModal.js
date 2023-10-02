import {Button, Modal} from "react-bootstrap";
import {useUserStore} from "../store/userStore";
import {socket} from "../App.js";

type BattleModalType = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
        text: string
modalType: string
roomId: string
}

const MessageModal = ({showModal, setShowModal, text, modalType, roomId}: BattleModalType) => {

    const user = useUserStore(state => state.user)

    const weapon = useUserStore(state => state.userEquippedWeapon)
    const armor = useUserStore(state => state.userEquippedArmor)
    const potion = useUserStore(state => state.userEquippedPotion)

    const equipment = {
        weapon,
        armor,
        potion
    }

    const handleAccept = () => {
        socket.emit("acceptRequest", roomId, user?.username, user?.character, equipment )
        setShowModal(false)
    }

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Battle request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {text}
                </Modal.Body>
                <Modal.Footer>
                    {modalType === "request"
                        ? <>
                            <Button variant="danger" onClick={handleClose}>Deny</Button>
                            <Button variant="success" onClick={handleAccept}>Accept</Button>
                        </>
                        : <Button variant="danger" onClick={handleClose}>Close</Button>
                    }

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MessageModal;