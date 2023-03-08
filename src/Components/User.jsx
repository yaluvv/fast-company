import React from "react";
import { useHistory } from "react-router-dom";
import API from "../API/index";
import PropTypes from "prop-types";
import QualitiesList from "./QualitiesList";
import Button from "react-bootstrap/Button";

const User = ({ id }) => {
    const [post, setPost] = React.useState();
    const history = useHistory();

    const handleSave = () => history.replace("/users");

    React.useEffect(() => {
        API.users.getById(id).then((data) => {
            setPost(data);
        });
    }, []);
    return (
        <div>
            {post ? (
                <div>
                    <h3>{post.name}</h3>
                    <ul>
                        <li>{post.rate}</li>
                        <li>{post.profession.name}</li>
                        <li>{post.completedMeetings}</li>
                        <li>{<QualitiesList qualities={post.qualities} />}</li>
                    </ul>
                    <Button onClick={handleSave} variant="secondary">
                        Назад
                    </Button>
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
