import React from "react";
import LoginForm from "../Components/UI/LoginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../Components/UI/RegisterForm";
import { Container, Row, Col } from "react-bootstrap";

const Auth = () => {
    const { authType } = useParams();
    const [formType, setFormType] = React.useState(
        authType === "register" ? authType : "login"
    );

    const toggleForm = () => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className="shadow p-5 d-flex flex-column">
                        {formType === "login" ? (
                            <LoginForm onToggleForm={toggleForm} />
                        ) : (
                            <>
                                <RegisterForm onToggleForm={toggleForm} />
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Auth;
