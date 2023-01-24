/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

function BoardCardLite({ boardObj }) {
  return (
    <div
      className="board-card"
    >
      <div className="columnOne">
        <img src={boardObj.image_url} className="card-img-top" alt={boardObj.link} />
      </div>
      <div className="columnTwo">
        <div
          className="card-body-lite"
          style={{
            height: '100px',
          }}
        >
          <h5 className="card-title-lite">{boardObj.title}</h5><br />
          <div className="card-description-lite">{boardObj.description}</div>
        </div>

      </div>
    </div>
  );
}
BoardCardLite.propTypes = {
  boardObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default BoardCardLite;
