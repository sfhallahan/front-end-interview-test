import React from "react";
import PropTypes from "prop-types";
import "../filters.css";

SelectFilter.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default function SelectFilter(props) {
  return (
    <div className="filterContainer">
      <label htmlFor={props.name}>
        <h3 className="filterTitle">{`${props.labelText}: `}</h3>
      </label>
      <select
        id={props.name}
        value={props.value}
        onChange={e => props.handleChange(props.name, e.target.value)}
      >
        <option value="allTypes">All Types</option>
        {props.values.map(value => (
          <option key={`${props.name}-${value}`} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
