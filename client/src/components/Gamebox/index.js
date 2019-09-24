import React from "react";
import Slider from "react-slick";
import "./styles.scss";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};
export const Gamebox = ({ games, activeGame, handleGameBoxClick, addGame }) => {
  console.log(games, "games");
  return (
    <div className="list-games-wrapper">
      <div className="list-games-container">
        <Slider {...settings}>
          {games.length > 0 ? (
            games.map(({ caption, id }, index) => (
              <div className={`gamebox-wrapper ${activeGame === id ? "active" : ""}`}>
              <div
                className={`gamebox ${activeGame === id ? "active" : ""}`}
                onClick={() => handleGameBoxClick(index)}
              >
                <div className="game-title">{caption}</div>
              </div>
              </div>
            ))
          ) :null}
        </Slider>
      </div>
    </div>
  );
};
