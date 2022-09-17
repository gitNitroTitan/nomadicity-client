/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Card from 'react-bootstrap/Card';
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
          <img src={hikeObj.url} className="card-img-top" alt={hikeObj.link} />
        </div>
        <div className="columnTwo">
          <div
            className="card-body"
            style={{
              height: '110px',
            }}
          >
            <Card.Body>
              <Card.Title>{hikeObj.name}</Card.Title>
              <Card.Text className="card-description">{hikeObj.description}
              </Card.Text>
            </Card.Body>
            <Card.Body className="date-created">
              Hike created on: {hikeObj.time}
            </Card.Body>
          </div>
        </div>
      </div>
    </div>
  );
}

HikeCardLite.propTypes = {
  hikeObj: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
    time: PropTypes.string,
  }),
};
HikeCardLite.defaultProps = {
  hikeObj: {
    name: '',
    url: '',
    description: '',
    link: '',
    firebaseKey: '',
    time: '',
  },
};
export default HikeCardLite;
