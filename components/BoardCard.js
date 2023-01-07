/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { deleteBoardsHikes } from '../api/mergedData';

function BoardCard({ boardObj, onUpdate }) {
  const deleteThisBoard = () => {
    if (window.confirm(`Delete ${boardObj.boardName}?`)) {
      deleteBoardsHikes(boardObj?.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <div
      className="board-card"
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
          <h5 className="card-title">{boardObj.boardName}</h5><br />
          <div className="card-description">{boardObj.boardDescription}</div>
        </div>
        <div className="cardBtns">
          <Link href={`/board/edit/${boardObj.firebaseKey}`} passHref>
            <Button
              className="edit-btn"
              style={{
                display: 'flex', justifyContent: 'center', alignSelf: 'flex-end', width: '70px', marginTop: '150px', marginLeft: '-8px', background: '#EBFBDA', color: 'black', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              }}
            >Edit
            </Button>
          </Link>
          <Link href={`/board/${boardObj.firebaseKey}`} passHref>
            <Button
              className="hikes-btn"
              style={{
                display: 'flex', justifyContent: 'center', alignSelf: 'flex-end', width: '70px', marginTop: '150px', marginLeft: '10px', background: '#EBFBDA', color: 'black', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              }}
            >Hikes
            </Button>
          </Link>
          <Button
            style={{
              display: 'flex', justifyContent: 'center', alignSelf: 'flex-end', width: '70px', marginTop: '150px', marginLeft: '10px', marginRight: '10px', background: '#EBFBDA', color: 'black', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            }}
            type="button"
            className="btn btn-"
            onClick={deleteThisBoard}
          >Delete
          </Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BoardCard;
