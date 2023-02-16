import React from "react";
import PropTypes from "prop-types";
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
    onDelete
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
                            bookmark
                                ? "bi bi-bookmark-check-fill fs-28"
                                : "bi bi-bookmark"
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

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onFavorite: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
