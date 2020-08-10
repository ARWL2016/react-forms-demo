import React, { Component, SyntheticEvent } from "react";
import "./BasicForm.scss";
import List from "./List";
import { Person } from "../core/entities/Person";
import { Header } from "semantic-ui-react";
import { TITLES, GENDERS } from "../core/data";

class BasicForm extends Component {
  titles = TITLES;
  genders = GENDERS;

  state = {
    title: "",
    name: "",
    gender: "",
    public: false,
    isEdit: false,
  };

  onNew = () => {
    this.setState({
      title: "",
      name: "",
      gender: "",
      public: false,
      isEdit: false,
    });
  };

  onEdit = (person: Person) => {
    this.setState({
      ...person,
      isEdit: true,
    });
  };

  onTitleChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({ title: e.currentTarget.value });
  };

  onNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ name: e.currentTarget.value });
  };

  onGenderChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ gender: e.currentTarget.value });
  };

  onPublicChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({ public: e.currentTarget.checked });
  };

  onSubmit = (e) => {
    console.log(e);
    alert(JSON.stringify(this.state));
  };

  render() {
    return (
      <React.Fragment>
        <List onEdit={this.onEdit} onNew={this.onNew} />

        <form>
          <Header as="h3">
            {this.state.isEdit ? "Edit Person" : "Add Person"}
          </Header>
          <div className="form-control">
            <label>Title</label>
            <select
              name="cars"
              value={this.state.title}
              onChange={this.onTitleChange}
            >
              <option key="default" value={undefined}></option>
              {this.titles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label>Name</label>
            <input
              className="ui input"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </div>

          <div className="form-control">
            <label>Gender</label>
            <div>
              {this.genders.map((gender) => (
                <label key={gender} className="radio-label">
                  <input
                    type="radio"
                    value={gender}
                    checked={this.state.gender === gender}
                    onChange={this.onGenderChange}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          <div className="form-control">
            <label>Make Profile Public</label>
            <input
              type="checkbox"
              value="true"
              onChange={this.onPublicChange}
              checked={this.state.public}
            />
          </div>
        </form>
        <div className="button-container">
          <button className="ui button" onClick={this.onNew}>
            Cancel
          </button>
          <button className="ui primary button" onClick={this.onSubmit}>
            Submit
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default BasicForm;
