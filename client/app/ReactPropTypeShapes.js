import PropTypes from 'prop-types';

export const CurveShape = PropTypes.arrayOf(
    PropTypes.shape(
        {
            x: PropTypes.number,
            y: PropTypes.number
        }
    )
);
