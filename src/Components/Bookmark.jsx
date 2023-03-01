import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ bookmark, changeFavorite }) => {
    return (
        <span
            onClick={changeFavorite}
            className={
                bookmark ? "bi bi-bookmark-check-fill fs-28" : "bi bi-bookmark"
            }
        />
    );
};

Bookmark.propTypes = {
    bookmark: PropTypes.bool.isRequired,
    changeFavorite: PropTypes.func.isRequired
};

export default Bookmark;
