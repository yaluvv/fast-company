import React from "react";
import API from "../../API";
import PropTypes from "prop-types";
import TextField from "../Common/Form/TextField";
import { validator } from "../../utils/validator";
import SelectField from "../Common/Form/SelectField";
import RadioField from "../Common/Form/RadioField";
import MultiSelectField from "../Common/Form/MultiSelectField";
import CheckboxField from "../Common/Form/CheckboxField";

const RegisterForm = ({ onToggleForm }) => {
    const [data, setData] = React.useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [error, setError] = React.useState({});
    const [professions, setProfessions] = React.useState([]);
    const [qualities, setQualities] = React.useState([]);

    React.useEffect(() => {
        const fetchProfessions = async () => {
            const data = await API.professions.fetchAll();
            setProfessions(data);
        };

        const fetchQualities = async () => {
            const data = await API.qualities.fetchAll();
            setQualities(data);
        };

        fetchProfessions();
        fetchQualities();
    }, []);
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
        },
        profession: {
            isRequired: {
                message: "Профессия должна быть обязательно выбрана!"
            }
        },
        license: {
            isRequired: {
                message:
                    "Для того чтобы зарегистрироваться нужно принять лицензионное соглашение!"
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
                Register form
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

                {Object.keys(professions).length > 0 ? (
                    <SelectField
                        label="Выбери свою профессию"
                        defaultValue="Выбрать профессию"
                        options={professions}
                        onChange={handleChange}
                        name="profession"
                        error={error.profession}
                        value={data.profession}
                    />
                ) : (
                    <h3>Loading...</h3>
                )}
                <RadioField
                    name="sex"
                    onChange={handleChange}
                    active={data.sex}
                    data={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Other", value: "other" }
                    ]}
                />
                <MultiSelectField
                    label="Выберите свои качества"
                    name="qualities"
                    defaultValue={qualities}
                    onChange={handleChange}
                    options={qualities}
                    value={data.qualities}
                />
                <CheckboxField
                    value={data.license}
                    name="license"
                    onChange={handleChange}
                    error={error.license}
                >
                    <span>
                        Принять <a href="#">лицензионное соглашение</a>
                    </span>
                </CheckboxField>

                <button
                    className="btn btn-primary m-2 pe-auto"
                    disabled={Object.keys(error).length !== 0}
                >
                    Send data
                </button>

                <p>
                    Если есть аккаунт, то
                    <button
                        className="btn btn-primary m-2"
                        onClick={onToggleForm}
                    >
                        Login
                    </button>
                </p>
            </form>
        </>
    );
};
RegisterForm.propTypes = {
    onToggleForm: PropTypes.func.isRequired
};

export default RegisterForm;
