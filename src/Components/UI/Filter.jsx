import React from "react";
import PropTypes from "prop-types";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const Filter = ({
    items,
    activeProfession,
    onClickProfession,
    onClearFilter
}) => {
    const profsArr = React.useMemo(() => {
        return !Array.isArray(items) && typeof items === "object"
            ? Object.keys(items).map((prof) => items[prof])
            : items;
    }, [items]);

    if (profsArr.length < 1) {
        return <h3>Loading...</h3>;
    }

    return (
        <>
            <ListGroup>
                {profsArr.map((item) => {
                    return (
                        <ListGroup.Item
                            onClick={() => onClickProfession(item.name)}
                            role="button"
                            key={item._id}
                            active={activeProfession === item.name}
                        >
                            {item.name}
                        </ListGroup.Item>
                    );
                })}
                <Button onClick={onClearFilter} variant="danger">
                    Clear
                </Button>
            </ListGroup>
        </>
    );
};

Filter.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    activeProfession: PropTypes.string.isRequired,
    onClickProfession: PropTypes.func.isRequired,
    onClearFilter: PropTypes.func.isRequired
};

export default Filter;
