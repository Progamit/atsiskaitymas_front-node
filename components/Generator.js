import {Button, Col} from "react-bootstrap";
import {CircleStackIcon} from "@heroicons/react/24/outline";
import {socket} from "../App.js";
import GeneratedItem from "./GeneratedItem.js";
import {useUserStore} from "../store/userStore.js";

const Generator = () => {

    const username = useUserStore(state => state.user?.username)
    const userGeneratedItems = useUserStore(state => state.userGeneratedItems)

    const generateWeapons = () => socket.emit("generate", username)

    return (
        <Col>
            <h4>Item Generator</h4>
            <div className="d-flex justify-content-between gap-1">
                {userGeneratedItems.map((item, idx) =>
                    <GeneratedItem key={idx} item={item}/>
                )}
            </div>

            <Button className="w-90 p-3 mt-2 fw-bolder" onClick={generateWeapons}>
                GENERATE <CircleStackIcon className="text-warning" style={{width: "20px"}}/>
            </Button>
        </Col>
    );
};

export default Generator;