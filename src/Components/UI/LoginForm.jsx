import React from "react";
import TextField from "../Common/Form/TextField";
import PropTypes from "prop-types";

import { validator } from "../../utils/validator";
import CheckboxField from "../Common/Form/CheckboxField";

const LoginForm = ({ onToggleForm }) => {
    const [data, setData] = React.useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [error, setError] = React.useState({});

    const validateConfig = {
        email: {
            isRequired: {
                message: "Почта обязательна к заполнению!"
            },
            isEmail: {
                message: "Почта некорректна!"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен к заполнению!"
            },
            isCapitalSymbol: {
                message: "Добавьте одну заглавную букву!"
            },
            isContainDigit: {
                message: "В пароле нет нифр!"
            },
            min: {
                message: "Пароль должен содержать минимум 8 значений!",
                value: 8
            }
        }
    };

    const handleChange = (target) => {
        setData((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(error).length === 0) {
            console.log(data);
        }
    };

    const validate = () => {
        const errors = validator(data, validateConfig);
        setError(errors);
    };

    React.useEffect(() => {
        validate();
    }, [data]);

    return (
        <>
            <p className="h3 text-uppercase font-weight-bold mb-5">
                Login form
            </p>
            <form action="" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={error.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={error.password}
                />

                <CheckboxField
                    onChange={handleChange}
                    value={data.stayOn}
                    name="stayOn"
                >
                    Остаться в системе?
                </CheckboxField>
                <button
                    className="btn btn-primary m-3"
                    disabled={Object.keys(error).length !== 0}
                >
                    Send data
                </button>
                <p>
                    Если нет аккаунта, то
                    <button
                        className="btn btn-primary m-2"
                        onClick={onToggleForm}
                    >
                        Signup
                    </button>
                </p>
            </form>
        </>
    );
};

LoginForm.propTypes = {
    onToggleForm: PropTypes.func.isRequired
};

export default LoginForm;
