import React from "react";

export default function Die(props) {
  const styles = {
    background: props.isHeld ? "rgba(182, 13, 13, 0.15)" : "white",
  };
  return (
    <div
      className="die-face"
      style={styles}
      onClick={() => props.holdDice(props.id)}
    >
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
