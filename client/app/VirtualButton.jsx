import React from 'react';
import PropTypes from 'prop-types';

const VirtualButton = ({name, value, className, clickHandler}) => (
    <button className={className} name={name} onClick={clickHandler}>{value}</button>
);

VirtualButton.propTypes = {
    value: PropTypes.string.isRequired
};

VirtualButton.defaultProps = {
    name: "",
    className: "",
    clickHandler: () => {}
};
export default VirtualButton;