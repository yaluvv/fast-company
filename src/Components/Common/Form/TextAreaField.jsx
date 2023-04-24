import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ onChange, name, value, error }) => {
    const handleChange = ({ target }) => {
        onChange({
            name: target.name,
            value: target.value
        });
    };
    return (
        <>
            <textarea
                onChange={handleChange}
                name={name}
                value={value}
                className={`form-select" form-control ${
                    error ? "is-invalid" : ""
                }`}
                rows="3"
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

TextAreaField.propTypes = {
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string
};

export default TextAreaField;
