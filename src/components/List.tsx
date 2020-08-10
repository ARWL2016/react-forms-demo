import React from "react";
import { Table } from "semantic-ui-react";
import { Person } from "../core/entities/Person";

export const DATA = [
  new Person("Mr", "John Richardson", "Male", true),
  new Person("Ms", "Samanthan Donahue", "Female", false),
];

interface Props {
  onEdit: (p: Person) => void;
  onNew: () => void;
}

interface State {
  data: Person[];
}

class List extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ data: DATA });
  }

  render() {
    return (
      <div style={{'maxWidth': '800px'}}>
        <button className="ui primary button" onClick={this.props.onNew}>Create New</button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Public</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.data.map((person: Person) => (
              <Table.Row
                key={person.name}
                onClick={() => this.props.onEdit(person)}
              >
                <Table.Cell>{person.title}</Table.Cell>
                <Table.Cell>{person.name}</Table.Cell>
                <Table.Cell>{person.gender}</Table.Cell>
                <Table.Cell>
                  {person.isPublic ? "public" : "private "}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default List;
