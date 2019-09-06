import React, { Component } from "react";
import Filter from "./filter";
import Robot from "./robot";
import arrow from "../img/triangle-dark.svg";

//Conditional Rendering

const topScore = <img src={arrow} alt="arrow" className="arrowStyle" />;
const lowScore = <img src={arrow} alt="arrow" className="arrowDown" />;

class Robots extends Component {
  state = {
    robots: [],
    searchText: "",
    scoreItem: false,
    nameItem: false,
    activeCategory: [],
    categories: [],
    showAllBots: true
  };

  async componentDidMount() {
    const API =
      "https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/bots.json";
    await fetch(API)
      .then(res => res.json())
      .then(data => {
        this.setState({ robots: data });
      })
      .catch(console.log);
    const temp = [];
    this.state.robots.map(bot => {
      return bot.categories.map(cat => {
        return temp.push(cat);
      });
    });
    temp.sort();
    console.log(temp);
    temp.unshift("Favourites");
    const filterBySet = [...new Set(temp)];
    this.setState({
      categories: filterBySet,
      activeCategory: filterBySet
    });
  }

  handleChange = uniq => {
    if (this.state.activeCategory === this.state.categories) {
      this.setState({ showAllBots: false });
      console.log("vid val 1");
      this.setState({
        activeCategory: this.state.activeCategory.filter(c => c === uniq)
      });
      return;
    }

    if (this.state.activeCategory.includes(uniq)) {
      if (this.state.activeCategory.length === 1) {
        this.setState({ showAllBots: true });
        console.log(
          "vid urkryssning av sista kategori, sätt alla botar tillbaka, för att sökfiltreringen ska fungera rätt"
        );
      } else console.log("vid urkryssning av kategori");
      this.setState({
        activeCategory: this.state.activeCategory.filter(item => item !== uniq)
      });
    } else {
      console.log("vid ikryssning av kategori");
      this.setState(prevState => ({
        activeCategory: [...prevState.activeCategory, uniq],
        showAllBots: false
      }));
    }
  };

  score = () => {
    this.setState({
      scoreItem: !this.state.scoreItem
    });
  };

  name = () => {
    this.setState({
      nameItem: !this.state.nameItem
    });
  };

  searchUpdate(value) {
    this.setState({
      searchText: value
    });
  }

  sortByName = (a, b) => {
    const compA = a.name.toLowerCase();
    const compB = b.name.toLowerCase();

    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    if (!this.state.nameItem) {
      return comparison;
    } else return comparison * -1;
  };

  sortByScore = (a, b) => {
    const compA = a.score;
    const compB = b.score;

    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    if (!this.state.scoreItem) {
      return comparison;
    } else return comparison * -1;
  };

  render() {
    // style in obj

    const spanStyle = {
      color: "grey",
      fontSize: "12px"
    };
    const spanStyleName = {
      color: "grey",
      fontSize: "12px",
      padding: " 0 0 0 35px"
    };

    return (
      <div className="robots">
        <Filter
          filterBySet={this.state.categories}
          activeCategory={this.state.activeCategory}
          onChange={this.handleChange}
          searchText={this.state.searchText}
          searchUpdate={this.searchUpdate.bind(this)}
        />
        <span className="spanStyleFlex">
          <p style={spanStyleName} onClick={this.name}>
            Name
          </p>
          <p style={spanStyle}>
            Score
            <span onClick={this.score}>
              {this.state.scoreItem ? topScore : lowScore}
            </span>
          </p>
        </span>
        {this.state.robots
          .sort(this.state.scoreItem ? this.sortByScore : this.sortByName)
          .filter(bot => {
            return (
              // sökfunktion, gör allt till Lowercase och jämför det men skriver i input-fältet med robotarnas namn.
              bot.name
                .toLowerCase()
                .indexOf(this.state.searchText.toLowerCase()) >= 0
            );
          })
          // sorterar ut på vald kategori, först kollar "some()"med samarbete av "include()" om bot.cat finns i activcat, sen mapas de som kolarar filtreringen ut
          .filter(bot => {
            return this.state.showAllBots
              ? this.state.categories
              : bot.categories.some(value => {
                  return this.state.activeCategory.includes(value);
                });
          })
          .map((bot, idx) => {
            return <Robot idx={idx} bot={bot} key={idx} />;
          })}
      </div>
    );
  }
}

export default Robots;
