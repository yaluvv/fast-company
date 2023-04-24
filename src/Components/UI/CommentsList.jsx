import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";

import API from "../../API";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

const CommentsList = ({ id, users }) => {
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        API.comments.fetchCommentsForUser(id).then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: id })
            .then((data) =>
                setComments((prev) => [...prev, { ...data, pageId: id }])
            );
    };

    const handleRemove = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id));
        });
    };

    const sortedComments = _.orderBy(comments, "created_at", ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <h2>New comment</h2>
                    <AddCommentForm
                        id={id}
                        onSubmit={handleSubmit}
                        users={users}
                    />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {sortedComments.map((comment) => (
                        <Comment
                            key={comment._id}
                            id={comment._id}
                            content={comment.content}
                            userId={comment.userId}
                            onRemove={handleRemove}
                            createdAt={comment.created_at}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

CommentsList.propTypes = {
    id: PropTypes.string,
    users: PropTypes.array
};

export default CommentsList;
