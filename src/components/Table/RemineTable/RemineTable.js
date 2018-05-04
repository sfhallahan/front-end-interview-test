import React, { Component } from "react";
import PropTypes from "prop-types";
import "./RemineTable.css";

class RemineTable extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Not a a great check. Doesn't account for edge case of two filters return the
    // same number of results. Probably find a better comparision (shallow compare keys?)
    if (nextProps.properties.length === this.props.properties.length) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="tableContainer">
        <p>
          Table length: <strong>{this.props.properties.length}</strong>
        </p>
        <table className="remineTable">
          <thead>
            <tr>
              <th>Address</th>
              <th>Building Type</th>
              <th>Beds</th>
              <th>Baths</th>
            </tr>
          </thead>
          <tbody className="remineTableBody">
            {this.props.properties.map(property => (
              <tr key={property.id}>
                <td>{property.address}</td>
                <td>{property.buildingType.name}</td>
                <td>{property.beds}</td>
                <td>{property.baths}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

RemineTable.defaultProps = {
  properties: []
};

RemineTable.propTypes = {
  properties: PropTypes.array
};

export default RemineTable;
