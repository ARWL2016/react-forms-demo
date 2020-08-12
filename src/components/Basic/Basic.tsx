import React, { Component, SyntheticEvent } from "react";
import "./Basic.scss";
import List from "../List";
import { Person } from "../../core/entities/Person";
import { Header, Message, Button } from "semantic-ui-react";
import { TITLES, GENDERS } from "../../core/data/static-data";
import { getPersonList, savePerson, deletePerson } from "../../core/data/api";
import { pick } from "../../core/utils";
import { v4 as uuidv4 } from "uuid";

class Basic extends Component {
  titles = TITLES;
  genders = GENDERS;

  state = {
    title: "",
    name: "",
    gender: "",
    isPublic: false,
    id: null,
    personList: [],
  };

  componentDidMount() {
    this.updatePersonList();
  }

  updatePersonList = () => {
    const personList = getPersonList();
    this.setState({ personList });
  };

  onNew = () => {
    this.setState({
      title: "",
      name: "",
      gender: "",
      public: false,
      id: null,
    });
  };

  onEdit = (person: Person) => {
    this.setState({
      ...person,
    });
  };

  onDelete = () => {
    if (this.state.id) {
      deletePerson(this.state.id!);
      this.updatePersonList();
      this.onNew();
    }
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
    this.setState({ isPublic: e.currentTarget.checked });
  };

  onSubmit = () => {
    const formValue = pick(this.state, [
      "title",
      "name",
      "gender",
      "isPublic",
      "id",
    ]) as Person;

    if (formValue.id === null) {
      formValue.id = uuidv4();
    }
    savePerson(formValue);
    this.updatePersonList();
    this.onNew();
  };

  render() {
    return (
      <div className="component-container">
        <List
          onEdit={this.onEdit}
          onNew={this.onNew}
          personList={this.state.personList}
        />

        <Message info>
          <Message.Header>Basic Form</Message.Header>
          <p>
            This form is written in a React class based component, using pure
            HTML inputs. The table and buttons use Semantic-UI. Since there is
            no validation, empty records can be created. Records are persisted
            to local storage only.
          </p>
          <p>Click Create New or click on the table to edit a record.</p>
          <a href="https://github.com/ARWL2016/react-forms-demo/blob/master/src/components/Basic/Basic.tsx" target="_blank" rel="noopener noreferrer">View Source</a>
        </Message>

        <form>
          <Header as="h3">
            {this.state.id ? "Edit Person" : "Add Person"}
          </Header>

          <div className="form-control">
            <label>Title</label>
            <select
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
              checked={this.state.isPublic}
            />
          </div>
        </form>

        <div className="button-container">
          <Button color="red" onClick={this.onDelete}>
            Delete
          </Button>
          <Button color="grey" onClick={this.onNew}>
            Cancel
          </Button>
          <Button color="blue" onClick={this.onSubmit}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default Basic;
