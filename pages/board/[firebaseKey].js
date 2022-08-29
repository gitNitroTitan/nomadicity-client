import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import HikeCard from '../../components/HikeCard';
import { viewBoardDetails } from '../../api/mergedData';

function ViewBoard() {
  const [boardDetails, setBoardDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewBoardDetails(firebaseKey).then(setBoardDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mapContainer">
        <div className="hike-map">
          {boardDetails.hikes?.map((hikes) => (
            <HikeCard key={hikes.firebaseKey} hikeObj={hikes} />
          ))}
        </div>
      </div>
      <div className="return-btn">
        <Link href="/boards" passHref>
          <Button
            className="boards-btn"
            style={{
              display: 'flex', alignSelf: 'flex-end', width: '70px', margin: '10px', marginTop: '25rem', background: '#F8C7CC', borderRadius: '20%/50%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            }}
          >Boards
          </Button>
        </Link>
      </div>
    </>
  );
}

export default ViewBoard;
