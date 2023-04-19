import React from "react";
import { useHistory } from "react-router-dom";
import API from "../../../../API/index";
import PropTypes from "prop-types";
import UserCard from "../../../UI/UserCard";
import QualitiesCard from "../../../UI/QualitiesCard";
import MeetingsCard from "../../../UI/MeetingsCard";
import CommentsList from "../../../UI/CommentsList";

const User = ({ id }) => {
    const [post, setPost] = React.useState();

    const history = useHistory();

    const handleEdit = () => history.push(`/users/${id}/edit`);

    React.useEffect(() => {
        API.users.getById(id).then((data) => {
            setPost(data);
        });
    }, []);

    return (
        <div className="container">
            {post ? (
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard
                            username={post.name}
                            profession={post.profession.name}
                            rate={post.rate}
                            onEdit={handleEdit}
                        />
                        <QualitiesCard qualities={post.qualities} />
                        <MeetingsCard meetingsCount={post.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentsList />
                    </div>
                </div>
            ) : (
                "Loading"
            )}
        </div>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired
};

export default User;
