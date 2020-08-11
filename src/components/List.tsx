import React from "react";
import { Table } from "semantic-ui-react";
import { Person } from "../core/entities/Person";

interface Props {
  onEdit: (p: Person) => void;
  onNew: () => void;
  personList: Person[]
}

const List: React.FC<any> = (props: Props) => {
  console.log(props.personList);

    return (
      <div style={{'maxWidth': '800px'}}>
        <button className="ui primary button" onClick={props.onNew}>Create New</button>
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
            {props.personList.map((person: Person) => (
              <Table.Row
                key={person.id}
                onClick={() => props.onEdit(person)}
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

export default List;
