import {Card, OverlayTrigger, ProgressBar, Tooltip} from "react-bootstrap";
import {PlayerStatsType} from "../store/battleStore.js";
import {effectName} from "../utils/effectName.js";

type ArenaPlayerCardProps = {
    player: PlayerStatsType
}


const ArenaPlayerCard = ({player}:ArenaPlayerCardProps) => {
    return (
        <div className="d-flex gap-3 flex-column align-items-center justify-content-center border p-2 rounded">

            <p className="text-primary">{player.username}</p>

            <div className="text-center">
                <Card style={{padding: "0px", width: "110px"}}>
                    <Card.Img style={{height: "200px"}} src={player.character.bigImage}/>
                </Card>
            </div>

            <div className="mt-2 w-100">
                <ProgressBar now={player.health} variant="success" label={`${player.health}HP`} />
            </div>

            <div className="d-flex gap-1">
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip id={`tooltip`}>
                            <p className="fw-bolder">{player.inventory.weapon?.name}</p>
                            <p>Grade <span className={`fw-bolder`}>{player.inventory.weapon?.grade}</span></p>
                            <p>Damage <span className="fw-bolder">{player.inventory.weapon?.minDamage}-{player.inventory.weapon?.maxDamage}</span></p>
                            {player.inventory.weapon?.effects.map((effect, idx) =>
                                <p key={idx}>{effectName(effect.effectName)} <span className="fw-bolder">{effect.chance}%</span></p>
                            )}
                        </Tooltip>
                    }
                >
                    <Card style={{padding: "0px", cursor: "pointer", width: "70px", height: "70px"}}>
                        <Card.Img
                            src={player.inventory.weapon?.image}/>
                    </Card>
                </OverlayTrigger>
                {player.inventory.armor &&
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip`}>
                                <p className="fw-bolder">{player.inventory.armor?.name}</p>
                                <p>Grade <span className={`fw-bolder`}>{player.inventory.armor?.grade}</span></p>
                                <p>Armor <span className="fw-bolder">{player.inventory.armor?.minArmor}-{player.inventory.armor?.maxArmor}</span></p>
                                {player.inventory.armor.effects.map((effect, idx) =>
                                    <p key={idx}>{effectName(effect.effectName)} <span className="fw-bolder">{effect.chance}%</span></p>
                                )}
                            </Tooltip>
                        }
                    >
                        <Card style={{padding: "0px", cursor: "pointer", width: "70px", height: "70px"}}>
                            <Card.Img
                                src={player.inventory.armor.image}/>
                        </Card>
                    </OverlayTrigger>
                }

                {player.inventory.potion &&
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip`}>
                                <p className="fw-bolder">{player.inventory.potion.name}</p>
                                <p>Heals for <span className="fw-bolder">{player.inventory.potion.healing}</span></p>

                            </Tooltip>
                        }
                    >
                        <Card style={{padding: "0px", cursor: "pointer", width: "70px", height: "70px"}}>
                            <Card.Img
                                src={player.inventory.potion.image}/>
                        </Card>
                    </OverlayTrigger>
                }
            </div>
        </div>
    );
};

export default ArenaPlayerCard;