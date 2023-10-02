import {Offcanvas} from "react-bootstrap";
import {BriefcaseIcon} from "@heroicons/react/24/outline";
import {useUserStore} from "../store/userStore.js";
import SingleInventoryItem from "./SingleInventory.js";

type PropsType = {
    handleClose: () => void
        show: boolean
}

const Inventory = ({handleClose, show}:PropsType) => {

    const user = useUserStore(state => state.user)

    const userEquippedWeapon = useUserStore(state => state.userEquippedWeapon)
    const userEquippedArmor = useUserStore(state => state.userEquippedArmor)
    const userEquippedPotion = useUserStore(state => state.userEquippedPotion)

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><BriefcaseIcon style={{width: "25px"}}/> Inventory</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="text-center">
                    <p className="fw-bolder text-warning">Equipped</p>
                    <div className="mt-1 d-flex justify-content-between m-5">
                        {userEquippedWeapon
                            ? <SingleInventoryItem item={userEquippedWeapon}/>
                            : <p className="text-danger d-flex justify-content-center align-items-center border p-2 rounded">No weapon</p>
                        }
                        {userEquippedArmor
                            ? <SingleInventoryItem item={userEquippedArmor}/>
                            : <p className="text-danger d-flex justify-content-center align-items-center border p-1 rounded">No armor</p>
                        }
                        {userEquippedPotion
                            ? <SingleInventoryItem item={userEquippedPotion}/>
                            : <p className="text-danger d-flex justify-content-center align-items-center border p-2 rounded">No potion</p>
                        }
                    </div>
                </div>

                <div className="d-flex flex-wrap gap-1 align-content-start border-top mt-3">
                    {user?.inventory.map((item, idx) =>
                        <SingleInventoryItem key={idx} item={item}/>)}
                </div>

            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Inventory;