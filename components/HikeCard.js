/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { deleteHike } from '../api/hikesData';
// import { useAuth } from '../utils/context/authContext';

function HikeCard({ hikeObj }) {
  // const { user } = useAuth();
  const router = useRouter();
  const deleteThisHike = () => {
    if (window.confirm(`Delete ${hikeObj.name}?`)) {
      deleteHike(hikeObj.firebaseKey).then(() => router.push('/hikes'));
    }
  };

  return (
    <div className="hikeContainer">
      <div
        style={{
          width: '605px', height: '400px', borderRadius: '2%', background: '#FFFFFF', display: 'flex', alignContent: 'center',
        }}
      >
        <div className="columnOne">
          <img src={hikeObj.image} className="card-img-top" alt={hikeObj.link} />
        </div>
        <div className="columnTwo">
          <div
            className="card-title"
            style={{
              height: '40px',
            }}
          >
            <h5>{hikeObj.name}</h5><br />
          </div>
          <div
            className="card-body"
            style={{
              height: '50px',
            }}
          >
            <h6>{hikeObj.description}</h6><br />
          </div>
          <div className="cardBtns">
            <Link href={`/hike/edit/${hikeObj.firebaseKey}`} passHref>
              <Button
                className="edit-btn"
                style={{
                  display: 'flex', justifyContent: 'center', alignSelf: 'flex-end', width: '70px', marginTop: '130px', margin: '5px', background: '#EBFBDA', color: 'black', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}
              >Edit
              </Button>
            </Link>
            <Button
              style={{
                display: 'flex', justifyContent: 'center', alignSelf: 'flex-end', width: '70px', marginTop: '130px', margin: '5px', background: '#EBFBDA', color: 'black', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              }}
              type="button"
              className="btn btn-delete"
              onClick={deleteThisHike}
            >Delete
            </Button>
          </div>
          <div className="date-created">
            Hike created on: {hikeObj.time}
          </div>
          <div className="location-created">
            Hike location: {hikeObj.latitude}/{hikeObj.longitude}
          </div>
        </div>
      </div>
    </div>
  );
}

HikeCard.propTypes = {
  hikeObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
    time: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
  }),
};
HikeCard.defaultProps = {
  hikeObj: {
    name: '',
    image: '',
    description: '',
    link: '',
    firebaseKey: '',
    time: '',
    latitude: '',
    longitude: '',
  },
};
export default HikeCard;
