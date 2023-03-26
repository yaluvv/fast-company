import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const CheckboxField = ({ value, name, error, children, onChange }) => {
    const handleChange = () => {
        onChange({ name, value: !value });
    };
    return (
        <div>
            <Form.Check
                className="mt-3"
                value={value}
                name={name}
                onChange={handleChange}
                type="checkbox"
                id={name}
                isInvalid={!!error}
                label={children}
                checked={value}
            />
        </div>
    );
};

CheckboxField.propTypes = {
    value: PropTypes.bool,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CheckboxField;
