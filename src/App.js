import React, { Component } from "react";
import "./App.css";
import FormInput from "./Component/FormInput";
import Result from "./Component/Result";
import SearchForm from "./Component/SearchForm";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAccounts: [],
      isShowFormInput: false,
      accountUpdate: null,
      search_key: null,
    };
  }
  getListAccount = () => {
    const baseURL = `http://localhost:8080`;
    axios
      .get(`${baseURL}/api/v1/accounts`)
      .then((res) => {
        console.log(res);
        let listAccount_Api = res.data;
        let listAccounts = [];
        for (let i = 0; i < listAccount_Api.length; i++) {
          let account = {
            ID: listAccount_Api[i].id,
            Email: listAccount_Api[i].email,
            Username: listAccount_Api[i].username,
            Fullname: listAccount_Api[i].fullname,
            Department: listAccount_Api[i].department,
            Position: listAccount_Api[i].position,
            createDate: listAccount_Api[i].createDate,
          };
          listAccounts.push(account);
        }
        this.setState({
          listAccounts: listAccounts,
        });
      })
      .catch((error) => console.log(error));
  };
  componentDidMount() {
    // if (localStorage && localStorage.getItem("listAccounts")) {
    //   let listAccounts = JSON.parse(localStorage.getItem("listAccounts"));
    //   this.setState({
    //     listAccounts: listAccounts,
    //   });
    // }
    this.getListAccount();
  }

  showFormInput = () => {
    this.setState({
      isShowFormInput: !this.state.isShowFormInput,
    });
  };
  onShowForm = () => {
    this.setState({
      isShowFormInput: !this.state.isShowFormInput,
    });
  };
  onSaveForm = (data) => {
    //console.log(data); // Kiểm tra lại dữ liệu nhận được từ InputForm
    const baseURL = `http://localhost:8080`;
    const body = {
      email: data.Email,
      username: data.Username,
      fullname: data.Fullname,
      departmentId: data.Department,
      positionId: data.Position,
    };
    axios
      .post(`${baseURL}/api/v1/accounts`, body)
      .then((res) => {
        console.log(res);
        this.getListAccount();
      })
      .catch((err) => console.log(err));
  };
  onDelete = (id) => {
    // let indexAccDel = this.state.listAccounts.findIndex((acc) => acc.ID === id);
    // if (indexAccDel !== -1) {
    //   this.state.listAccounts.splice(indexAccDel, 1);
    //   this.setState({
    //     listAccounts: this.state.listAccounts,
    //   });
    //   localStorage.setItem(
    //     "listAccounts",
    //     JSON.stringify(this.state.listAccounts)
    //   );
    // }
    const baseURL = `http://localhost:8080`;
    axios
      .delete(`${baseURL}/api/v1/accounts/${id}`)
      .then((res) => {
        //console.log(res);
        this.getListAccount();
      })
      .catch((err) => console.log(err));
  };
  onUpdate = (id) => {
    let indexAccUpdate = this.state.listAccounts.findIndex(
      (acc) => acc.ID === id
    );
    if (indexAccUpdate !== -1) {
      let accountUpdate = this.state.listAccounts[indexAccUpdate];
      //console.log("Thong tin acc can update:", accountUpdate);
      this.setState({
        isShowFormInput: true,
        accountUpdate: accountUpdate,
      });
    }
  };
  updateAccButton = (account) => {
    let indexAccUpdate = this.state.listAccounts.findIndex(
      (acc) => acc.ID === account.ID
    );
    if (indexAccUpdate !== -1) {
      let listUpdate = this.state.listAccounts;
      listUpdate[indexAccUpdate] = account;
      this.setState({
        listAccounts: listUpdate,
      });
      localStorage.setItem("listAccounts", JSON.stringify(listUpdate));
    }
  };
  onSearchForm = (search_key) => {
    console.log("App Search:" + search_key);
    this.setState({
      search_key: search_key,
    });
  };
  render() {
    let search_key = this.state.search_key;
    let listAccounts = this.state.listAccounts;
    if (search_key) {
      // Sử dụng hàm fillter để lọc các giá trị phần tử của mảng
      // listAccounts = listAccounts.filter((account) =>{
      // return account.Username.toLowerCase().indexOf(search_key.toLowerCase()) !==-1;
      // });
      let listAccounts_filter = []; // khai báo list dùng để chưa các giá trị sau khi filter.
      for (let index = 0; index < listAccounts.length; index++) {
        // Sử dụng hàm includes để so sánh chuỗi, if chuỗi cha bao gồm chuỗi con sẽ trả về true, https://www.w3schools.com/jsref/jsref_includes.asp
        if (
          listAccounts[index].ID.toLowerCase().includes(
            search_key.toLowerCase()
          ) ||
          listAccounts[index].Email.toLowerCase().includes(
            search_key.toLowerCase()
          ) ||
          listAccounts[index].Username.toLowerCase().includes(
            search_key.toLowerCase()
          ) ||
          listAccounts[index].Fullname.toLowerCase().includes(
            search_key.toLowerCase()
          ) ||
          listAccounts[index].Department.toLowerCase().includes(
            search_key.toLowerCase()
          ) ||
          listAccounts[index].Position.toLowerCase().includes(
            search_key.toLowerCase()
          ) ||
          listAccounts[index].Cretate_Date.toLowerCase().includes(
            search_key.toLowerCase()
          )
        ) {
          listAccounts_filter.push(listAccounts[index]); // Lấy các phần tử thỏa mãn đk search_key lưu vào listAccounts_filter trung gian
        }
      }
      listAccounts = listAccounts_filter; // gán lại giá trị sau khi đã filter cho listAccounts.
    }

    return (
      <div className="App">
        <SearchForm onSearchForm={this.onSearchForm} />
        <input
          type="button"
          className="btn btn-primary"
          value="Create Account"
          onClick={this.showFormInput}
        />

        {this.state.isShowFormInput ? (
          <FormInput
            onShowForm={this.onShowForm}
            onSaveForm={this.onSaveForm}
            accountUpdate={this.state.accountUpdate}
            updateAccButton={this.updateAccButton}
          />
        ) : (
          ""
        )}
        <Result
          listAccounts={this.state.listAccounts}
          onDelete={this.onDelete}
          onUpdate={this.onUpdate}
        />
      </div>
    );
  }
}

export default App;
