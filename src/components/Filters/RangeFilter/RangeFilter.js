import React from "react";
import PropTypes from "prop-types";
import "../filters.css";

RangeFilter.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  range: PropTypes.array.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default function RangeFilter(props) {
  return (
    <div className="filterContainer">
      <h3 className="filterTitle">{`${props.labelText}`}</h3>
      <div className="dropdown__container">
        <label className="dropdown__label" htmlFor="min">
          Min:
        </label>
        <select
          className="dropdown__select"
          value={props.min}
          onChange={e => props.handleChange(`${props.name}Min`, parseInt(e.target.value, 10))}
        >
          {props.range.filter(value => (value <= props.max ? true : false)).map(validOption => (
            <option key={`${props.name}-min-${validOption}`} value={validOption}>
              {validOption}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown__container">
        <label className="dropdown__label" htmlFor="max">
          Max:
        </label>
        <select
          className="dropdown__select"
          value={props.max}
          onChange={e => props.handleChange(`${props.name}Max`, parseInt(e.target.value, 10))}
        >
          {props.range.filter(value => (value >= props.min ? true : false)).map(validOption => (
            <option key={`${props.name}-max-${validOption}`} value={validOption}>
              {validOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
