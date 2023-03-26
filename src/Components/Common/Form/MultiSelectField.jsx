import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ defaultValue, options, onChange, name, value }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((item) => ({
                  label: options[item].name,
                  value: options[item]._id
              }))
            : options;

    const newValue = value
        ? value.map((item) => ({
              label: item.name,
              value: item._id
          }))
        : [];

    const handleChange = (value) => {
        const newValue = value
            ? value.map((item) => ({
                  name: item.label,
                  _id: item.value
              }))
            : [];
        onChange({ name, value: newValue });
    };
    return (
        <div>
            <label htmlFor={name}>Выберите ваши качества</label>
            <Select
                id={name}
                isMulti
                isRequired
                value={newValue}
                closeMenuOnSelect={false}
                defaultValue={optionsArray[2]}
                options={optionsArray}
                className="basic-multi-select form-control"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string.isRequired
};

export default MultiSelectField;
