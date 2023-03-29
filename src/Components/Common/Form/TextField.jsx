import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div>
            <label htmlFor="email">{label}</label>
            <div className="input-group">
                <input
                    type={showPassword ? "text" : type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                />
                {type === "password" && (
                    <button
                        onClick={toggleShowPassword}
                        className="btn btn-outline-secondary"
                        type="button"
                    >
                        <i
                            className={`bi bi-eye${
                                showPassword ? "-slash" : ""
                            }`}
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
