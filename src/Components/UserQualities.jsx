import React from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";

const UserQualities = ({ _id, color, name }) => {
    return (
        <Badge className="me-1" key={_id} bg={color}>
            {name}
        </Badge>
    );
};
UserQualities.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default UserQualities;
