import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Search, Label } from "semantic-ui-react";

const resultRenderer = ({ title }) => <Label content={title} />;

resultRenderer.propTypes = {
  title: PropTypes.string,
};

class SearchBar extends React.Component {
  state = { value: "", isLoading: false, results: [] };

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    this.setState({ value: e.target.value });
    this.props.onSubmit(this.state.value);

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.searchresults, isMatch),
      });
    }, 300);
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      this.props.onSubmit(this.state.value);
    }
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              resultRenderer={resultRenderer}
              {...this.props}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
