import {Card} from "react-bootstrap";

type CharacterProps = {
    image: string
    id: string
    selectedCharacter: null | string
    setSelectedCharacter:  React.Dispatch<React.SetStateAction<string | null>>
}

const Character = ({image, id, setSelectedCharacter, selectedCharacter}:CharacterProps) => {

    return (
        <Card
            className={selectedCharacter === id ? "bg-primary" : ""}
            style={{padding: "0px", cursor: "pointer"}}
            onClick={() => setSelectedCharacter(id)}>
            <Card.Img src={image}/>
        </Card>
    );
};

export default Character;