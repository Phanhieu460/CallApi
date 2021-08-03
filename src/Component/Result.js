import React, { Component } from "react";
import ResultItem from "./ResultItem";

class Result extends Component {
  render() {
    return (
      <div className="container">
        <h3>Thong tin tren he thong</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Email</th>
              <th scope="col">UserName</th>
              <th scope="col">FullName</th>
              <th scope="col">Department</th>
              <th scope="col">Position</th>
              <th scope="col">Create Date</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody id="result">
            <ResultItem
              listAccounts={this.props.listAccounts}
              onDelete={this.props.onDelete}
              onUpdate={this.props.onUpdate}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default Result;
