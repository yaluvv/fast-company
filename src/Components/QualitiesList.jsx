import React from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((item) => {
                return (
                    <Badge className="me-1" key={item._id} bg={item.color}>
                        {item.name}
                    </Badge>
                );
            })}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
