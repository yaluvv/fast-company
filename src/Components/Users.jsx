import React from "react";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import API from "../API";

const Users = () => {
  const [users, setUsers] = React.useState(API.users.fetchAll());

  const deleteUser = (id) => setUsers(users.filter((user) => user._id !== id));

  if (!users.length) {
    return <h1>Empty users</h1>;
  }

  return (
    <div>
      <h1 className="p-3 mb-2 bg-dark text-white">{`Количество пользователей ${users.length}`}</h1>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился раз</th>
            <th>Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((item) => {
                    return (
                      <Badge className="me-1" key={item._id} bg={item.color}>
                        {item.name}
                      </Badge>
                    );
                  })}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <Button onClick={() => deleteUser(user._id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
