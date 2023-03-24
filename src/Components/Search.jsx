import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const Search = ({ value, onChange }) => {
    return <Form.Control value={value} onChange={onChange} size="lg" type="text" placeholder="Search..." />;
};

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Search;
