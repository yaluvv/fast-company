import React from "react";
import API from "../../API";
import PropTypes from "prop-types";
import TextField from "../Common/Form/TextField";
import { validator } from "../../utils/validator";
import SelectField from "../Common/Form/SelectField";
import RadioField from "../Common/Form/RadioField";
import MultiSelectField from "../Common/Form/MultiSelectField";
import { useHistory } from "react-router-dom";

const EditUserForm = ({ id }) => {
    const [userData, setUserData] = React.useState({});
    const [error, setError] = React.useState({});
    const [professions, setProfessions] = React.useState([]);
    const [qualities, setQualities] = React.useState([]);
    const history = useHistory();

    const handleExit = () => history.push(`/users/${id}`);

    React.useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const data = await API.professions.fetchAll();
                const newData =
                    !Array.isArray(data) && typeof data === "object"
                        ? Object.keys(data).map((prof) => data[prof])
                        : data;
                setProfessions(newData);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchQualities = async () => {
            try {
                const data = await API.qualities.fetchAll();
                setQualities(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchUser = async () => {
            try {
                const data = await API.users.getById(id);

                setUserData({
                    ...data,
                    profession: data.profession._id
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfessions();
        fetchQualities();
        fetchUser();
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
        name: {
            isRequired: {
                message: "Ваше имя для нас очень важно!"
            }
        }
    };

    const handleChange = (target) => {
        setUserData((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const getProfessionById = (id) => {
        return professions.find((item) => item._id === id);
    };

    const updateData = async () => {
        try {
            await API.users.update(id, {
                ...userData,
                profession: getProfessionById(userData.profession)
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(error).length === 0) {
            updateData();
            history.push(`/users/`);
        }
    };

    const validate = () => {
        const errors = validator(userData, validateConfig);
        setError(errors);
    };

    React.useEffect(() => {
        validate();
    }, [userData]);

    if (Object.keys(userData).length < 1) {
        return <h3>Loading...</h3>;
    }
    return (
        <>
            <p className="h3 text-uppercase font-weight-bold mb-5">
                EditUser Form
            </p>
            <form action="" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    error={error.email}
                />
                <TextField
                    label="Имя"
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    error={error.name}
                />

                <SelectField
                    label="Выбери свою профессию"
                    helperText="Выбрать профессию"
                    options={professions}
                    onChange={handleChange}
                    name="profession"
                    error={error.profession}
                    value={userData.profession}
                />
                <RadioField
                    name="sex"
                    onChange={handleChange}
                    active={userData.sex}
                    data={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                        { label: "Other", value: "other" }
                    ]}
                />
                <MultiSelectField
                    label="Выберите свои качества"
                    name="qualities"
                    value={userData.qualities}
                    defaultValue={userData.qualities}
                    onChange={handleChange}
                    options={qualities}
                />
                <div className="d-flex justify-content-between align-items-end">
                    <button
                        className="mt-4"
                        disabled={Object.keys(error).length !== 0}
                    >
                        Обновить данные
                    </button>
                    <button type="button" onClick={handleExit}>
                        Вернуться назад
                    </button>
                </div>
            </form>
        </>
    );
};
EditUserForm.propTypes = {
    id: PropTypes.string.isRequired
};

export default EditUserForm;
