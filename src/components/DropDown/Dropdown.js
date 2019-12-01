import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ items }) => {
    return (
        <>
            {items.map(el => (
                <button
                    type="button"
                    className={el.className}
                    key={el.name}
                    onClick={el.onClick}
                >
                    {el.name}
                </button>
            ))}
        </>
    );
};

Dropdown.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Dropdown;
