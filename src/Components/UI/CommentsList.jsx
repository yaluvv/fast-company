import React from "react";
import Comment from "./Comment";

const CommentsList = () => {
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">form</div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <Comment />
                </div>
            </div>
        </>
    );
};

export default CommentsList;
