import React, { Component } from "react";
import RemineTable from "./components/Table/RemineTable/RemineTable";
import RangeFilter from "./components/Filters/RangeFilter/RangeFilter";
import SelectFilter from "./components/Filters/SelectFilter/SelectFilter";
import API from "./API";
import "./index.css";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      properties: [],
      filteredProperties: [],
      bedsMin: 0,
      bedsMax: 0,
      bathsMin: 0,
      bathsMax: 0,
      bedOptions: [0],
      bathOptions: [0],
      buildingType: "allTypes",
      buildingTypes: [],
      isFiltering: false
    };
  }

  componentDidMount() {
    API.getLocations()
      .then(response => {
        const returnedProperties = response.data;
        const bedsSet = new Set();
        const bathsSet = new Set();
        const buildingTypesSet = new Set();
        let bedsMax = 0;
        let bathsMax = 0;

        returnedProperties.forEach(property => {
          if (property.beds !== null) {
            bedsSet.add(parseInt(property.beds));
            bedsMax = Math.max(bedsMax, parseInt(property.beds, 10));
          }
          if (property.baths !== null) {
            bathsSet.add(parseInt(property.baths));
            bathsMax = Math.max(bathsMax, parseInt(property.baths, 10));
          }
          if (property.buildingType.name !== null) {
            buildingTypesSet.add(property.buildingType.name);
          }
        });
        this.setState({
          properties: returnedProperties,
          filteredProperties: returnedProperties,
          bedsMax: bedsMax,
          bathsMax: bathsMax,
          bedOptions: [...bedsSet].sort(),
          bathOptions: [...bathsSet].sort(),
          isLoading: false,
          buildingTypes: [...buildingTypesSet].sort()
        });
      })
      .catch(error => {
        console.log("error fetching Properties", error);
        this.setState({ isLoading: false });
      });
  }

  handleChange = (element, value) => {
    this.setState({
      [element]: value
    });
  };

  filterProperties = () => {
    const bedsMax = this.state.bedsMax;
    const bedsMin = this.state.bedsMin;
    const bathsMax = this.state.bathsMax;
    const bathsMin = this.state.bathsMin;
    const currentBuildingType = this.state.buildingType;

    let filteredResults = this.state.properties.filter(property => {
      let beds = parseInt(property.beds, 10);
      let baths = parseInt(property.baths, 10);

      if (baths < bathsMin || baths > bathsMax) return false;
      if (beds < bedsMin || beds > bedsMax) return false;
      if (currentBuildingType !== "allTypes" && property.buildingType.name !== currentBuildingType)
        return false;

      return true;
    });

    this.setState({
      filteredProperties: filteredResults
    });
  };

  clearFilters = () => {
    this.setState((prevState, props) => {
      return {
        bedsMin: prevState.bedOptions[0],
        bedsMax: prevState.bedOptions[prevState.bedOptions.length - 1],
        bathsMin: prevState.bathOptions[0],
        bathsMax: prevState.bathOptions[prevState.bathOptions.length - 1],
        filteredProperties: prevState.properties,
        buildingType: "allTypes"
      };
    });
  };

  render() {
    return this.state.isLoading ? (
      <div className="testContainer">Loading</div>
    ) : (
      <div className="testContainer">
        <div className="filtersContainer">
          <RangeFilter
            name="beds"
            labelText="Beds"
            range={this.state.bedOptions}
            min={this.state.bedsMin}
            max={this.state.bedsMax}
            handleChange={this.handleChange}
          />
          <RangeFilter
            name="baths"
            labelText="Baths"
            range={this.state.bathOptions}
            min={this.state.bathsMin}
            max={this.state.bathsMax}
            handleChange={this.handleChange}
          />
          <SelectFilter
            name="buildingType"
            labelText="Building Type"
            values={this.state.buildingTypes}
            value={this.state.buildingType}
            handleChange={this.handleChange}
          />
        </div>
        <div>
          <button className="button" onClick={this.filterProperties}>
            Apply Filters
          </button>
          <button className="button" onClick={this.clearFilters}>
            Clear Filters
          </button>
        </div>
        <RemineTable properties={this.state.filteredProperties} />
      </div>
    );
  }
}

export default Test;
