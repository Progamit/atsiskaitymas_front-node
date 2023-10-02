import {Card, OverlayTrigger, Tooltip} from "react-bootstrap";
import {checkGrade} from "../utils/gradeChecker.js";
import {effectName} from "../utils/effectName.js";
import {SingleItemType, useUserStore} from "../store/userStore.js";

export type InventoryItemsProps = {
    item: SingleItemType
}

const SingleInventoryItem = ({item}:InventoryItemsProps) => {

    const setUserGeneratedWeapon = useUserStore(state => state.setUserEquippedWeapon)
    const setUserGeneratedArmor = useUserStore(state => state.setUserEquippedArmor)
    const setUserGeneratedPotion = useUserStore(state => state.setUserEquippedPotion)

    const handleSelect = () => {
        if (item.category === "WEAPON") return setUserGeneratedWeapon(item)
        if (item.category === "ARMOR") return setUserGeneratedArmor(item)
        setUserGeneratedPotion(item)
    }

    return (
        <div className="mt-1" onClick={handleSelect}>
            <OverlayTrigger
                placement="right"
                overlay={
                    <Tooltip id={`tooltip`}>
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
                            <p key={idx}>{effectName(effect.effectName)} <span className="fw-bolder">{effect.chance}%</span></p>
                        )}
                    </Tooltip>
                }
            >
                <Card style={{padding: "0px", cursor: "pointer", width: "70px", height: "70px"}}>
                    <Card.Img
                        src={item.image}/>
                </Card>
            </OverlayTrigger>
        </div>
    );
};

export default SingleInventoryItem;