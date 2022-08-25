/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteHikeFromBoards } from '../api/mergedData';

function HikeGridCard({ hikeObject, remHike, onUpdate }) {
  return (
    <>
      <div className="card gridCard">
        <img src={hikeObject.image} className="card-img-top" alt="hike-pic" />
        <div className="hoverContainer">
          { remHike
            ? (
              <button
                type="button"
                className="btn btn-light"
                style={{
                  backgroundColor: 'black', color: 'hotpink', width: '40px', height: '40px', display: 'flex',
                }}
                onClick={() => deleteHikeFromBoards(hikeObject.firebaseKey).then(onUpdate)}
              >X
              </button>
            )
            : ''}
          <Link passHref href={`../hike/${hikeObject.firebaseKey}`}>
            <p className="hoverTitle">{hikeObject.name}</p>
          </Link>
          <p className="hoverDescription">{hikeObject.description}</p>
        </div>
      </div>
    </>
  );
}
HikeGridCard.propTypes = {
  hikeObject: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    user: PropTypes.string,
    time: PropTypes.number,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  remHike: PropTypes.bool,
  onUpdate: PropTypes.func,
  // boardKey: PropTypes.string,
};

HikeGridCard.defaultProps = {
  hikeObject: PropTypes.shape({
    name: 'Some crap',
    image: 'https://media1.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=82a1493bp86gd572cklybuzdd0y24rt1ea0p0ih3wpxjfggw&rid=200w.gif&ct=g',
    link: 'Someaddress@blabla.com',
    firebaseKey: '123',
  }),
  remHike: false,
  onUpdate: () => console.warn('default'),
  // boardKey: '',
};

export default HikeGridCard;
