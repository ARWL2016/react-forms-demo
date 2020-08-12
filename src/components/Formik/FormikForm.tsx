import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { TITLES, GENDERS } from "../../core/data/static-data";
import { Button, Message } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import { savePerson, getPersonList, deletePerson } from "../../core/data/api";
import { Person } from "../../core/entities/Person";
import List from "../List";
import './FormikForm.scss';

const FormikForm = () => {
  const [personList, setPersonList] = useState<Person[]>([]);
  const [showForm, setShowForm] = useState(false);

  const initialValues: Person = {
    title: "",
    name: "",
    gender: "Other",
    isPublic: false,
    id: null,
  };

  const [editValues, setEditValues] = useState<Person>(initialValues);

  useEffect(() => {
    updatePersonList();
  }, []);

  useEffect(() => {
    setShowForm(true);
  }, [editValues]);

  function updatePersonList() {
    const personList = getPersonList();
    setPersonList(personList);
  }

  function onSubmit(values) {
    if (values.id === null) {
      values.id = uuidv4();
    }

    savePerson(values);
    console.log("submitting", values);
    setShowForm(false);
    setEditValues(initialValues);
    updatePersonList();
  }

  function onEdit(p: Person) {
    console.log("on edit");
    setShowForm(false);
    setEditValues(p);
  }

  function onNew() {
    setShowForm(false);
    setEditValues(initialValues);
  }

  function onDelete(e, id) {
      e.preventDefault();
      console.log(id);

      if (id) {
        deletePerson(id!);
        updatePersonList();
        onNew();
      }
  }

  function onCancel(e) {
      e.preventDefault();
      onNew();
  }

  function renderForm() {
    if (!editValues || !showForm) {
      return null;
    }
    return (
      <Formik
        initialValues={editValues}
        onSubmit={onSubmit}
        onDelete={onDelete}
        onCancel={onCancel}
      >
        {({ values, handleChange, handleReset }) => (
          <form>
            <div className="form-control">
              <label>Title</label>
              <select name="title" value={values.title} onChange={handleChange}>
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
              <input
                name="name"
                className="ui input"
                value={values.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label>Gender</label>
              <div>
                {GENDERS.map((genderLabel) => (
                  <label key={genderLabel} className="radio-label">
                    <input
                      name="gender"
                      type="radio"
                      value={genderLabel}
                      checked={values.gender === genderLabel}
                      onChange={handleChange}
                    />
                    {genderLabel}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control">
              <label>Make Profile Public</label>
              <input
                name="isPublic"
                type="checkbox"
                value="true"
                onChange={handleChange}
                checked={values.isPublic}
              />
            </div>

            <div className="button-container">
              <Button color="red" onClick={(e) => onDelete(e, values.id)}>
                Delete
              </Button>
              <Button color="grey" onClick={(e) => onCancel(e)}>
                Cancel
              </Button>
              <Button
                color="blue"
                type="submit"
                onClick={() => onSubmit(values)} >
                Save
              </Button>
            </div>
          </form>
        )}
      </Formik>
    );
  }

  return (
    <div className="component-container">
      <List onEdit={onEdit} onNew={onNew} personList={personList} />

      <Message info>
        <Message.Header>Formik</Message.Header>
        <p>
          Version of basic form using Formik and React Hooks API.
        </p>
        <a
          href="https://github.com/ARWL2016/react-forms-demo/blob/master/src/components/FormikForm/FormikForm.tsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Source
        </a>
      </Message>

      {renderForm()}
    </div>
  );
};

export default FormikForm;
