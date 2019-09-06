import React, { Component } from "react";
import arrow from "../img/triangle-light.svg";
import PropTypes from "prop-types";

//variables to render

const show = (
  <p className="showFilter" style={{ fontSize: "10px" }}>
    Show filters
    <img src={arrow} style={{ paddingLeft: "5px" }} alt="arrow" />
  </p>
);
const hide = (
  <p className="hideFilter" style={{ fontSize: "10px" }}>
    Hide filters
    <img
      src={arrow}
      alt="arrow"
      style={{ paddingLeft: "5px" }}
      id="arrowDown"
    />
  </p>
);

class Filter extends Component {
  state = {
    filter: true,
    fav: false
  };

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    searchUpdate: PropTypes.func.isRequired,
    filterBySet: PropTypes.array.isRequired
  };

  toggle = () => {
    this.setState({
      filter: !this.state.filter
    });
  };
  fav = () => {
    this.setState({
      fav: !this.state.fav
    });
  };
  searchUpdate() {
    const val = this.myValue.value;
    this.props.searchUpdate(val);
  }

  handleChange = uniq => {
    this.props.onChange(uniq);
  };

  render() {
    const activeFilter = (
      <p className="activeFilter">
        Active filter:
        <br /> {this.props.activeCategory.join(" , ")}
      </p>
    );
    const inActiveFilter = <p className="inActiveFilter">Filter by:</p>;

    const filterCategorys = this.props.filterBySet.map((uniq, idx) => {
      return (
        <div className="grid-item" key={idx}>
          <input type="checkbox" onClick={() => this.handleChange(uniq)} />
          <p style={{ fontSize: "12px" }}>{uniq}</p>
        </div>
      );
    });

    return (
      <div className="bg">
        <input
          type="text"
          className="inputFilter"
          placeholder="Search"
          onChange={this.searchUpdate.bind(this)}
          ref={value => (this.myValue = value)}
        />
        <div className="filterMenu">
          <span className="hideNshow" onClick={this.toggle}>
            {this.state.filter ? inActiveFilter : activeFilter}
          </span>
          <span className="hideNshow" onClick={this.toggle}>
            {this.state.filter ? hide : show}
          </span>
        </div>
        {this.state.filter && (
          <div className="filter">
            <div className="pinkFilterBox">{filterCategorys}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Filter;
