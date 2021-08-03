import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_key: "", // Khai báo State này để lưu giá trị cần tìm kiếm
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSearch = () => {
    this.props.onSearchForm(this.state.search_key);
  };
  render() {
    return (
      <div className="container">
        <div className="input-group">
          <input
            type="search"
            className="form-control rounded"
            id="input-search-department"
            placeholder="Search by Email, FullName, Department"
            aria-label="Search"
            aria-describedby="search-addon"
            name="search_key"
            value={this.state.search_key}
            onChange={this.handleChange}
          ></input>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.handleSearch}
          >
            search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchForm;
