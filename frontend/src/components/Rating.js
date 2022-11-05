import React from 'react';
import PropTypes from 'prop-types';
//! imp icons
import StarRegularIcon from '../components/icons/StarRegularIcon';
import StarSolidIcon from '../components/icons/StarSolidIcon';
import StarHalfStrokeSolidIcon from '../components/icons/StarHalfStrokeSolidIcon';

const Rating = ({ value, text, color }) => {
  const count = 5;
  let renderRating = [];
  for (let i = 0; i < count; i++) {
    renderRating.push(
      <span key={i}>
        {value >= i + 1 ? (
          <StarSolidIcon size={'1rem'} color={color} />
        ) : value >= i + 0.5 ? (
          <StarHalfStrokeSolidIcon size={'1rem'} color={color} />
        ) : (
          <StarRegularIcon size={'1rem'} color={color} />
        )}
      </span>
    );
  }
  return (
    <div className="rating">
      {renderRating}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Rating;
