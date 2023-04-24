import React from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../utils/displayDate";
import API from "../../API";

const Comment = ({ id, content, userId, onRemove, createdAt }) => {
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (!Object.keys(user).length) {
        return <h2>Loading</h2>;
    }
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">{user && user.name}</p>
                                    <span className="small">
                                        {displayDate(createdAt)}
                                    </span>
                                    <button
                                        onClick={() => onRemove(id)}
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    content: PropTypes.string,
    userId: PropTypes.string,
    onRemove: PropTypes.func,
    id: PropTypes.string,
    createdAt: PropTypes.number
};

export default Comment;
