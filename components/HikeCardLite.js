/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
// import { useAuth } from '../utils/context/authContext';

function HikeCardLite({ hikeObj }) {
  // const { user } = useAuth();

  return (
    <div className="hikeContainer">
      <div
        style={{
          width: '570px', height: '400px', borderRadius: '2%', background: '#FFFFFF', display: 'flex', alignContent: 'center',
        }}
      >
        <div className="columnOne">
          <img src={hikeObj.image} className="card-img-top" alt={hikeObj.link} />
        </div>
        <div className="columnTwo">
          <div
            className="card-body"
            style={{
              height: '110px',
            }}
          >
            <h5 className="card-title">{hikeObj.name}</h5>
            <div className="card-description">{hikeObj.description}</div>
            <div className="date-created">
              Hike created on: {hikeObj.time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HikeCardLite.propTypes = {
  hikeObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
    time: PropTypes.string,
  }),
};
HikeCardLite.defaultProps = {
  hikeObj: {
    name: '',
    image: '',
    description: '',
    link: '',
    firebaseKey: '',
    time: '',
  },
};
export default HikeCardLite;
