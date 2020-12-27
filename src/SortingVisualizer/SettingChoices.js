import React, { useState } from "react";
import "./SettingChoices.css";

const SettingChoices = ({ setSpeed, setBars, setBarWidth }) => {
  const [speedOne, setSpeedOne] = useState("");
  const [speedTwo, setSpeedTwo] = useState("lightgrey");
  const [speedThree, setSpeedThree] = useState("");
  const [barOne, setBarOne] = useState("");
  const [barTwo, setBarTwo] = useState("lightgrey");
  const [barThree, setBarThree] = useState("");

  const minBars = () => {
    setBars(50);
    setBarWidth(1.6);
    setBarOne("lightgrey");
    setBarTwo("");
    setBarThree("");
  };
  const defaultBars = () => {
    setBars(100);
    setBarWidth(0.8);
    setBarOne("");
    setBarTwo("lightgrey");
    setBarThree("");
  };
  const maxBars = () => {
    setBars(200);
    setBarWidth(0.4);
    setBarOne("");
    setBarTwo("");
    setBarThree("lightgrey");
  };
  const changeSpeed = (num) => {
    setSpeed(num);
    if (num === 8) {
      setSpeedOne("");
      setSpeedTwo("");
      setSpeedThree("lightgrey");
    } else if (num === 10) {
      setSpeedOne("");
      setSpeedTwo("lightgrey");
      setSpeedThree("");
    } else if (num === 14) {
      setSpeedOne("lightgrey");
      setSpeedTwo("");
      setSpeedThree("");
    }
  };
  return (
    <>
      <div className="navbar_bars_container">
        <p>Bars:</p>
        <div className="navbar_bars">
          <div
            className="bar_choice"
            onClick={minBars}
            style={{ backgroundColor: barOne }}
          >
            <p>50</p>
          </div>
          <div
            className="bar_choice"
            onClick={defaultBars}
            style={{ backgroundColor: barTwo }}
          >
            <p>100</p>
          </div>
          <div
            className="bar_choice"
            onClick={maxBars}
            style={{ backgroundColor: barThree }}
          >
            <p>200</p>
          </div>
        </div>
      </div>
      <div className="navbar_speed_container">
        <p>Speed:</p>
        <div className="navbar_speed">
          <div
            className="speed_choice"
            onClick={() => changeSpeed(14)}
            style={{ backgroundColor: speedOne }}
          >
            <p>Low</p>
          </div>
          <div
            className="speed_choice"
            onClick={() => changeSpeed(10)}
            style={{ backgroundColor: speedTwo }}
          >
            <p>Med</p>
          </div>
          <div
            className="speed_choice"
            onClick={() => changeSpeed(8)}
            style={{ backgroundColor: speedThree }}
          >
            <p>High</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingChoices;
