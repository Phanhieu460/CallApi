import React, { Component } from "react";

class ResultItem extends Component {
  constructor(props) {
    super(props);
    this.createDate = "24/07/2021";
  }
  onDeleteFormID = (id) => {
    this.props.onDelete(id);
  };
  onUpdateAccId = (id) => {
    this.props.onUpdate(id);
  };
  render() {
    return (
      <>
        {this.props.listAccounts.map((item, index) => {
          return (
            <tr key={index}>
              <th>{item.ID}</th>
              <th>{item.Email}</th>
              <th>{item.Username}</th>
              <th>{item.Fullname}</th>
              <th>{item.Department}</th>
              <th>{item.Position}</th>
              <th>{item.createDate}</th>
              <th>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => this.onUpdateAccId(item.ID)}
                >
                  Edit
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => this.onDeleteFormID(item.ID)}
                >
                  Delete
                </button>
              </th>
            </tr>
          );
        })}
      </>
    );
  }
}

export default ResultItem;
