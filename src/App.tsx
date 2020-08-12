import React, { Component } from "react";
import "./App.css";
import { Menu, MenuItemProps } from "semantic-ui-react";
import Basic from "./components/Basic/Basic";
import Validation from "./components/Validation/Validation";
import { Hooks } from "./components/Hooks/Hooks";
import FormikForm from "./components/Formik/FormikForm";

export interface MenuArgs {
  active: boolean;
  name: string;
  onClick: () => {};
}

class App extends Component {
  state = {
    activeItem: "Basic Form",
  };

  menus = ['Basic Form', 'With Validation', 'Hooks', 'Formik'];

  handleItemClick = (data: MenuItemProps) => {
    console.log(data);
    this.setState({ activeItem: data.name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu attached="top" tabular>
          {this.menus.map(menu => (
            <Menu.Item
            key={menu}
            name={menu}
            active={activeItem === menu}
            onClick={(e, data) => this.handleItemClick(data)}
          />
          ) )}
         
        </Menu>

        <div className="content-container">
          {activeItem === "Basic Form" && <Basic />}
          {activeItem === "With Validation" && <Validation />}
          {activeItem === "Hooks" && <Hooks />}
          {activeItem === "Formik" && <FormikForm />}
        </div>

      </div>
    );
  }
}

export default App;
