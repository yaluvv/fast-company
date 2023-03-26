import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EditUserForm from "../Components/UI/EditUserForm";
import { useParams } from "react-router-dom";

const EditUser = () => {
    const { id } = useParams();

    return (
        <Container>
            <Row>
                <Col>
                    <EditUserForm id={id} />
                </Col>
            </Row>
        </Container>
    );
};

export default EditUser;
