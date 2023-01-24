import "./Dice.css";

function Dice({id, value, isHeld, updateDice}) {
  return (
    <div className={isHeld ? "selected__dice dice" : "dice"} id={id} onClick={(event) => updateDice(event)}>
      <div className={isHeld ? "selected__dice dice__number" : "dice__number"}>
        {value}
      </div>
    </div>
  );
}

export default Dice;
