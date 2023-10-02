import { Col } from "react-bootstrap";
import {useUserStore} from "../store/userStore.js";
import SingleUserCard from "./SingleUserCard.js";

const OnlineUsers = () => {

    const onlineUsers = useUserStore(state => state.onlineUsers)

    return (
        <Col className="border-start">
            <h4>Online Users</h4>
            {onlineUsers.map(user => <SingleUserCard key={user.id} user={user}/>)}
        </Col>
    );
};

export default OnlineUsers;