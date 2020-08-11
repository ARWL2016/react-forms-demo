import React, { Component, SyntheticEvent } from "react";
import "./Validation.scss";
import List from "../List";
import { Person } from "../../core/entities/Person";
import { Header, Message, Button } from "semantic-ui-react";
import { TITLES, GENDERS } from "../../core/data/static-data";
import { getPersonList, savePerson, deletePerson } from "../../core/data/api";
import { v4 as uuidv4 } from "uuid";
import { FormControl, updateFormControl, checkFormValidity } from "./Form";

interface State {
  title: FormControl<string>;
  name: FormControl<string>;
  gender: FormControl<string>;
  isPublic: FormControl<boolean>;
  id: string | null;
  personList: Person[];
  valid: boolean;
  dirty: boolean;
}

class Validation extends Component<{}, State> {
  titles = TITLES;
  genders = GENDERS;

  state: State = {
    title: new FormControl(["", true]),
    name: new FormControl(["", true]),
    gender: new FormControl(["Other", true]),
    isPublic: new FormControl([false, true]),
    id: null,
    personList: [],
    valid: false,
    dirty: false
  };

  componentDidMount() {
    const personList = getPersonList();
    this.setState({ personList: personList });
  }

  updatePersonList = () => {
    const personList = getPersonList();
    this.setState({ personList });
  };

  onNew = () => {
    this.setState({
      title: new FormControl(["", true]),
      name: new FormControl(["", true]),
      gender: new FormControl(["Other", true]),
      isPublic: new FormControl([false, true]),
      id: null,
      valid: false
    });
  };

  onEdit = (person: Person) => {
    

    this.setState({
      title: new FormControl([person.title, true]),
      name: new FormControl([person.name, true]),
      gender: new FormControl([person.gender, true]),
      isPublic: new FormControl([person.isPublic, true]),
      id: person.id,
      valid: false, 
      dirty: false
    }, () => {
      this.isFormValid();
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
    const newTitle = updateFormControl(this.state.title, e.currentTarget.value);
    this.setState({ title: newTitle }, () => this.isFormValid());
  };

  onNameChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const newName = updateFormControl(this.state.title, e.currentTarget.value);
    this.setState({ name: newName }, () => this.isFormValid());
  };

  onGenderChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const newGender = updateFormControl(
      this.state.gender,
      e.currentTarget.value
    );
    this.setState({ gender: newGender });
  };

  onPublicChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const newIsPublic = updateFormControl(
      this.state.gender,
      e.currentTarget.checked
    );
    this.setState({ isPublic: newIsPublic });
  };

  isFormValid = () => {
    const valid = checkFormValidity(this.state, [
      "title",
      "name",
      "gender",
      "isPublic",
    ]);
    this.setState({ valid }, () => console.log(this.state));
  };

  onFormChange = () => {
    this.setState({ dirty: true }, () => console.log(this.state));
  }

  onSubmit = () => {
    const formValue = {
      title: this.state.title.value,
      name: this.state.name.value,
      gender: this.state.gender.value,
      isPublic: this.state.isPublic.value,
      id: this.state.id,
    } as Person;

    if (formValue.id === null) {
      formValue.id = uuidv4();
    }

    savePerson(formValue as Person);
    this.updatePersonList();
    this.onNew();
  };

  render() {
    const { title, name, id, gender, isPublic, valid, dirty } = this.state;

    return (
      <div className="component-container">
        <List
          onEdit={this.onEdit}
          onNew={this.onNew}
          personList={this.state.personList}
        />

        <Message info>
          <Message.Header>Form with Validation</Message.Header>
          <p>This form tracks the value, validity, and clean / dirty state of each control so that validation warnings can be shown and the buttons can be disabled.</p>
          <a href="https://github.com/ARWL2016/react-forms-demo/blob/master/src/components/Validation/Validation.tsx" target="_blank" rel="noopener noreferrer">View Source</a>
        </Message>

        <form onChange={this.onFormChange}>
          <Header as="h3">
            {this.state.id ? "Edit Person" : "Add Person"}
          </Header>

          <div className="form-control">
            <label>Title</label>
            <div>
              <select
                name="cars"
                value={title.value}
                onChange={this.onTitleChange}
              >
                <option key="default" value={undefined}></option>
                {this.titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
              {!title.valid && title.touched && (
                <p className="invalid-message">Title is required</p>
              )}
            </div>
          </div>

          <div className="form-control">
            <label>Name</label>
            <div>
              <input
                className="ui input"
                value={name.value}
                onChange={this.onNameChange}
              />
              {!name.valid && name.touched && (
                <p className="invalid-message">Name is required</p>
              )}
            </div>
          </div>

          <div className="form-control">
            <label>Gender</label>
            <div>
              {this.genders.map((genderLabel) => (
                <label key={genderLabel} className="radio-label">
                  <input
                    type="radio"
                    value={genderLabel}
                    checked={gender.value === genderLabel}
                    onChange={this.onGenderChange}
                  />
                  {genderLabel}
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
              checked={isPublic.value}
            />
          </div>
        </form>

        <div className="button-container">
          {id && (
            <Button color="red" onClick={this.onDelete}>
              Delete
            </Button>
          )}

          <Button color="grey" onClick={this.onNew}>
            Cancel
          </Button>
          <Button color="blue" onClick={this.onSubmit} disabled={!valid || !dirty}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default Validation;
