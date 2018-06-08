import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Pagation = ({current, total, onPrev, onNext}) => {
  return (
    <div className="pagation">
      <a href="javascript:;" onClick={onPrev}>上一页</a>
      <span>{current}/{total}</span>
      <a href="javascript:;" onClick={onNext}>下一页</a>
    </div>
  );
}
Pagation.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
}

export default Pagation;