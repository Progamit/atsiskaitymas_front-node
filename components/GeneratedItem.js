import {Button, Card} from "react-bootstrap";
import {HandRaisedIcon} from "@heroicons/react/24/outline";
import {InventoryItemsProps} from "./SingleInventory.js";
import {checkGrade} from "../utils/gradeChecker.js";
import {effectName} from "../utils/effectName.js";
import {socket} from "../App.js";
import {useUserStore} from "../store/userStore.js";



const GeneratedItem = ({item}:InventoryItemsProps) => {

    const user = useUserStore(state => state.user)
    const userGeneratedItems = useUserStore(state => state.userGeneratedItems)
    const setUserGeneratedItems = useUserStore(state => state.setUserGeneratedItems)

    const handleTake = () => {
        socket.emit("takeItem", item, user?.username)
        const filteredItems = userGeneratedItems.filter(generatedItem => generatedItem !== item)
        setUserGeneratedItems(filteredItems)
    }

    return (
        <Card style={{width: '150px'}} className="p-0 text-center">
            <Card.Img style={{width: "100%"}} variant="top"
                      src={item.image}/>
            <Card.Body className="d-flex flex-column justify-content-between">
                <p className="fw-bolder">{item.name}</p>
                {item.category !== "POTIONS" &&
                    <p>Grade <span className={`${checkGrade(item.grade)} fw-bolder`}>{item.grade}</span></p>
                }
                {item.category === "WEAPON" &&
                    <p>Damage <span className="fw-bolder">{item.minDamage}-{item.maxDamage}</span></p>
                }
                {item.category === "ARMOR" &&
                    <p>Armor <span className="fw-bolder">{item.minArmor}-{item.maxArmor}</span></p>
                }
                {item.category === "POTIONS" &&
                    <p>Healing for <span className="fw-bolder">{item.healing}</span></p>
                }
                {item.effects.map((effect, idx) =>
                    <p key={idx}>{effectName(effect.effectName)} <span className="fw-bolder">{effect.chance}%</span></p>)}
                <Button variant="warning" onClick={handleTake}><HandRaisedIcon style={{width: "20px"}}/> Take</Button>
            </Card.Body>
        </Card>
    );
};

export default GeneratedItem;