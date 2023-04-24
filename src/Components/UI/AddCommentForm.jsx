import React from "react";
import PropTypes from "prop-types";

import { validator } from "../../utils/validator";

import SelectField from "../Common/Form/SelectField";
import TextAreaField from "../Common/Form/TextAreaField";

const AddCommentForm = ({ users, onSubmit }) => {
    const initialState = { userId: "", content: "", pageId: "" };
    const [data, setData] = React.useState(initialState);
    const [error, setError] = React.useState({});

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(data);
        setData(initialState);
    };

    const handleChange = (target) => {
        setData((prev) => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const validateConfig = {
        userId: {
            isRequired: {
                message: "Выбрать юзера нужно обязательно!"
            }
        },
        content: {
            isRequired: {
                message: "Текст сообщения обязателен!"
            }
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
        <form onSubmit={handleSubmit} className="d-flex flex-column" action="#">
            <SelectField
                name="userId"
                options={users}
                helperText="Выбрать юзера"
                value={data.userId}
                onChange={handleChange}
                error={error.userId}
            />
            <label className="d-flex flex-column mb-5">
                Сообщение
                <TextAreaField
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    error={error.content}
                />
            </label>

            <button
                className="align-self-end"
                type="submit"
                disabled={Object.keys(error).length !== 0}
            >
                Опубликовать
            </button>
        </form>
    );
};

AddCommentForm.propTypes = {
    id: PropTypes.string,
    users: PropTypes.array,
    onSubmit: PropTypes.func
};

export default AddCommentForm;
