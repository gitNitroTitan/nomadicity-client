import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { deleteHike } from '../api/hikesData';
import { renderAbsoluteTime, renderRelativeTime } from '../utils/time';
// import { useAuth } from '../utils/context/authContext';

function HikeCard({ hikeObj }) {
  // const { user } = useAuth();
  const router = useRouter();
  const deleteThisHike = () => {
    if (window.confirm(`Delete ${hikeObj.name}?`)) {
      deleteHike(hikeObj.firebaseKey).then(() => router.push('/'));
    }
  };
  return (
    <Card
      className="hikeContainer"
      style={{
        width: '700px', margin: '10px', borderRadius: '2%', display: 'flex', alignContent: 'center',
      }}
    >
      <Card.Img variant="top" src={hikeObj.image} />
      <Card.Body>
        <Card.Title>{hikeObj.name}</Card.Title>
        <Card.Text>
          {hikeObj.description}
        </Card.Text>
      </Card.Body>
      <Card.Body className="time-created">
        <sup
          className="pin-date"
        >... on {renderAbsoluteTime(hikeObj.time)}, {renderRelativeTime(hikeObj.time)}
        </sup>
      </Card.Body>
      <Card.Body className="hike-link">{hikeObj.link}</Card.Body>
      <Card.Body>
        <Link href={`/hike/edit/${hikeObj.firebaseKey}`} passHref>
          <Button className="edit-btn" variant="info">EDIT</Button>
        </Link>
        <Button
          style={{
            display: 'flex', alignSelf: 'flex-end', width: '70px', margin: '10px', background: 'lightgrey', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          }}
          type="button"
          className="btn btn-"
          onClick={deleteThisHike}
        >Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

HikeCard.propTypes = {
  hikeObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
    time: PropTypes.number,
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
  },
};
export default HikeCard;
