import React, { useState, useEffect } from "react";
import { Header, Button, Message } from "semantic-ui-react";
import "./Hooks.scss";
import { TITLES, GENDERS } from "../../core/data/static-data";
import { v4 as uuidv4 } from "uuid";
import { Person } from "../../core/entities/Person";
import { Title, Gender } from "../../core/types";
import { getPersonList, savePerson, deletePerson } from "../../core/data/api";
import List from "../List";

export const Hooks = () => {
  const [id, setId] = useState<string | null>(null);
  const [title, setTitle] = useState<Title | string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<Gender>("Other");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [personList, setPersonList] = useState<Person[]>([]);

  useEffect(() => {
    updatePersonList();
  }, []);

  function updatePersonList() {
    const personList = getPersonList();
    setPersonList(personList);
  }

  function onTitleChange(e) {
    setTitle(e.currentTarget.value);
  }

  function onNameChange(e) {
    setName(e.currentTarget.value);
  }

  function onGenderChange(e) {
    setGender(e.currentTarget.value);
  }

  function onPublicChange(e) {
    setIsPublic(e.currentTarget.checked);
  }

  function onNew() {
    setId(null);
    setTitle("");
    setName("");
    setGender("Other");
    setIsPublic(false);
  }

  function onEdit(p: Person) {
    setId(p.id);
    setTitle(p.title);
    setName(p.name);
    setGender(p.gender);
    setIsPublic(p.isPublic);
  }

  function onDelete() {
    if (id) {
      deletePerson(id!);
      updatePersonList();
      onNew();
    }
  }

  function onSubmit() {
    const formValue: Person = {
      name,
      title,
      gender,
      isPublic,
      id,
    };

    if (formValue.id === null) {
      formValue.id = uuidv4();
    }
    console.log(formValue);

    savePerson(formValue);
    updatePersonList();
    onNew();
  }

  return (
    <div className="component-container">
      <List onEdit={onEdit} onNew={onNew} personList={personList} />

      <Message info>
        <Message.Header>Basic Hooks</Message.Header>
        <p>
          This is an alternative version of the basic form, using a functional component and the React Hooks API.
        </p>
        <a
          href="https://github.com/ARWL2016/react-forms-demo/blob/master/src/components/Hooks/Hooks.tsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Source
        </a>
      </Message>
      <form>
        <Header as="h3">{id ? "Edit Person" : "Add Person"}</Header>

        <div className="form-control">
          <label>Title</label>
          <select name="cars" value={title} onChange={onTitleChange}>
            <option key="default" value={undefined}></option>
            {TITLES.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label>Name</label>
          <input className="ui input" value={name} onChange={onNameChange} />
        </div>

        <div className="form-control">
          <label>Gender</label>
          <div>
            {GENDERS.map((genderLabel) => (
              <label key={genderLabel} className="radio-label">
                <input
                  type="radio"
                  value={genderLabel}
                  checked={gender === genderLabel}
                  onChange={onGenderChange}
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
            onChange={onPublicChange}
            checked={isPublic}
          />
        </div>
      </form>

      <div className="button-container">
        <Button color="red" onClick={onDelete}>
          Delete
        </Button>
        <Button color="grey" onClick={onNew}>
          Cancel
        </Button>
        <Button color="blue" onClick={onSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};
