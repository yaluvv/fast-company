import React from "react";
import UserQualities from "./UserQualities";
import { Button } from "react-bootstrap";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onFavorite,
  onDelete,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((item) => {
          return <UserQualities key={item._id} {...item} />;
        })}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        {
          <span
            onClick={() => onFavorite(_id)}
            className={
              bookmark ? "bi bi-bookmark-check-fill fs-28" : "bi bi-bookmark"
            }
          />
        }
      </td>
      <td>
        <Button onClick={() => onDelete(_id)} variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default User;
