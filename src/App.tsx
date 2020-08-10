import React, { Component } from "react";
import "./App.css";
import { Menu, MenuItemProps } from "semantic-ui-react";
import BasicForm from "./components/BasicForm";
import Formik from "./components/Formik";
import Hooks from "./components/Hooks";

export interface MenuArgs {
  active: boolean;
  name: string;
  onClick: () => {};
}

class App extends Component {
  state = {
    activeItem: "Basic Form",
  };

  handleItemClick = (data: MenuItemProps) => {
    console.log(data);
    this.setState({ activeItem: data.name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu attached="top" tabular>
          <Menu.Item
            name="Basic Form"
            active={activeItem === "Basic Form"}
            onClick={(e, data) => this.handleItemClick(data)}
          />
          <Menu.Item
            name="Formik"
            active={activeItem === "Formik"}
            onClick={(e, data) => this.handleItemClick(data)}
          />

          <Menu.Item
            name="Hooks"
            active={activeItem === "Hooks"}
            onClick={(e, data) => this.handleItemClick(data)}
          />
        </Menu>

        <div className="content-container">
          {activeItem === "Basic Form" && <BasicForm />}
          {activeItem === "Formik" && <Formik />}
          {activeItem === "Hooks" && <Hooks />}
        </div>

      </div>
    );
  }
}

export default App;
