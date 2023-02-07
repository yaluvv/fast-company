import React from "react";
import { Badge } from "react-bootstrap";

const UserQualities = ({ _id, color, name }) => {
  return (
    <Badge className="me-1" key={_id} bg={color}>
      {name}
    </Badge>
  );
};

export default UserQualities;
