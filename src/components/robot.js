import React, { useState } from "react";
import starInActive from "../img/star-inactive.svg";
import starActive from "../img/star-active.svg";

// check localstorage in any favorites is active.

function useLocalStorage(localItem) {
  const [loc, setState] = useState(JSON.parse(localStorage.getItem(localItem)));
  function setLoc(newItem) {
    JSON.stringify(localStorage.setItem(localItem, newItem));
    setState(newItem);
  }
  return [loc, setLoc];
}

// variables to render 
const pic =
"https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/img/";
const favOn = <img src={starActive} alt="star" className="star" />;
const favOff = <img src={starInActive} alt="star" className="star" />;


export default props => {
  // hooks and const for hooks

  const botIdentity = props.bot.id; //bot id in localStorages
  const [catFav, setCatFav] = useLocalStorage(botIdentity);
  const [botCategories, setBotCategories] = useState(props.bot.categories);

  // put fava in to catergory if true and not alredy has it
  if (catFav === true && !botCategories.includes("Favourites")) {
    setBotCategories([...botCategories,"Favourites" ])
  }
  
  function addFavourites() {
    if (catFav === false) {
      //  false, put it it there.
      setBotCategories([...botCategories,"Favourites" ])
    } else if (catFav === true && botCategories.includes("Favourites")) {
      //  if true and includes, then remove.
      botCategories.pop();
      setBotCategories([...botCategories])
    }
  }
console.log(botCategories)
  // variables

  let i = 1; // index for number

  return (
    <div className="card" key={props.idx}>
      <div
        className="botPic"
        style={{
          backgroundImage: `url("${pic + props.bot.image}")`,
          backgroundSize: "contain"
        }}
      ></div>
      <span className="botNameStyle">
        <p>{props.bot.name}</p>
        <span className="numberOfTheBeast">{props.idx + 1}.</span>
        <span style={{ fontSize: "10px", textAlign: "left" }}>
          {props.bot.categories.map(cat => {
            return (
              <p key={i++} className="categoriesStyle">
                {cat}
              </p>
            );
          })}
        </span>
      </span>
      <p className="scoreStyle">{props.bot.score}</p>
      <span
        onClick={() => {
          setCatFav(!catFav);
          addFavourites();
        }}
      >
        {catFav ? favOn : favOff}
      </span>
    </div>
  );
};
