import React from "react";
import PropTypes from "prop-types";

function SelectField({
    label,
    options,
    value,
    onChange,
    name,
    defaultValue,
    error
}) {
    const profsArr =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((prof) => options[prof])
            : options;

    const handleChange = ({ target }) => {
        onChange({
            name: target.name,
            value: target.value
        });
    };
    return (
        <div>
            <label className="form-label" htmlFor={name}>
                {label}
            </label>

            <select
                value={value._id}
                id={name}
                name={name}
                onChange={handleChange}
                className={`form-select" form-control ${
                    error ? "is-invalid" : ""
                }`}
            >
                <option value="" disabled>
                    Выбрать профессию
                </option>

                {profsArr.map((option) => (
                    <option value={option._id} key={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}
SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    defaultValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default SelectField;
