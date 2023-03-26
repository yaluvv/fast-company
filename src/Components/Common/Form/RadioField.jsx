import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const RadioField = ({ data, onChange, name, active }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mt-4 d-flex">
            {data.map((radio) => (
                <div key={`${radio.label}_${radio.value}`} className="mb-3">
                    <Form.Check
                        inline
                        label={radio.label}
                        name={name}
                        value={radio.value}
                        checked={radio.value === active}
                        onChange={handleChange}
                        type="radio"
                        id={`${radio.label}_${radio.value}`}
                    />
                </div>
            ))}
        </div>
    );
};

RadioField.propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    active: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default RadioField;
