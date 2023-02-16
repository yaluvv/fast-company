import React from "react";
import PropTypes from "prop-types";

const TotalUsersTitle = ({ length }) => {
    return (
        <h1 className="p-3 mb-2 bg-dark text-white">{`Количество пользователей ${length}`}</h1>
    );
};

TotalUsersTitle.propTypes = {
    length: PropTypes.number.isRequired
};

export default TotalUsersTitle;
