/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
import React from 'react';
// import Card from 'react-bootstrap/Card';
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
    <div className="boardContainer">
      <div
        style={{
          width: '690px', height: '400px', borderRadius: '2%', background: '#FFFFFF', display: 'flex', alignContent: 'center',
        }}
      >
        <div className="columnOne">
          <img src={boardObj.boardImage} className="card-img-top" alt={boardObj.link} />
        </div>
        <div className="columnTwo">
          <div
            className="card-body"
            style={{
              height: '110px',
            }}
          >
            <h5 className="card-title">{boardObj.boardName}</h5>
            <div className="card-description">{boardObj.boardDescription}</div>
          </div>
          <div className="cardBtns">
            <Link href={`/board/edit/${boardObj.firebaseKey}`} passHref>
              <Button
                className="edit-btn"
                style={{
                  display: 'flex', justifyContent: 'center', alignSelf: 'flex-end', width: '70px', margin: '10px', background: '#81A684', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}
              >Edit
              </Button>
            </Link>
            <Link href={`/board/${boardObj.firebaseKey}`} passHref>
              <Button
                className="hikes-btn"
                style={{
                  display: 'flex', justifyContent: 'center', alignSelf: 'flex-end', width: '70px', margin: '10px', background: '#81A684', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}
              >Hikes
              </Button>
            </Link>
            <Button
              style={{
                display: 'flex', justifyContent: 'center', alignSelf: 'flex-end', width: '70px', margin: '10px', background: '#81A684', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              }}
              type="button"
              className="btn btn-"
              onClick={deleteThisBoard}
            >Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
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
