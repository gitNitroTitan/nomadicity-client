import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { deleteBoardsHikes } from '../api/mergedData';

function BoardCard({ boardObj }) {
  const router = useRouter();
  const deleteThisBoard = () => {
    if (window.confirm(`Delete ${boardObj.boardName}?`)) {
      deleteBoardsHikes(boardObj.firebaseKey).then(() => router.push('/boards'));
    }
  };
  return (
    <Card
      className="boardContainer"
      style={{
        width: '700px', margin: '10px', borderRadius: '2%', display: 'flex', alignContent: 'center',
      }}
    >
      <Card.Img variant="top" src={boardObj.boardImage} />
      <Card.Body>
        <Card.Title>{boardObj.boardName}</Card.Title>
        <Card.Text>
          {boardObj.boardDescription}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Link href={`/board/edit/${boardObj.firebaseKey}`} passHref>
          <Button className="edit-btn" variant="info">EDIT</Button>
        </Link>
      </Card.Body>
      <Card.Body>
        <Link href={`/board/${boardObj.firebaseKey}`} passHref>
          <Button className="hikes-btn" variant="info">View Hikes</Button>
        </Link>
        <Button
          style={{
            display: 'flex', alignSelf: 'flex-end', width: '70px', margin: '10px', background: 'lightgrey', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          }}
          type="button"
          className="btn btn-"
          onClick={deleteThisBoard}
        >Delete
        </Button>
      </Card.Body>
    </Card>
  );
}
BoardCard.propTypes = {
  boardObj: PropTypes.shape({
    boardName: PropTypes.string,
    boardImage: PropTypes.string,
    boardDescription: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
BoardCard.defaultProps = {
  boardObj: {
    name: '',
    image: '',
    description: '',
    firebaseKey: '',
  },
};
export default BoardCard;
