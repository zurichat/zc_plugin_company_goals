import React from 'react';

import deleteDataImg from './deleteAssets';

const Deletemodal = () => {
  return (
    <div className="faded-md">
      <div className="modal">
        <button className="cancel-modal" type="button">
          X
        </button>
        <div className="image">
          <img src={deleteDataImg.deleteImg} className="d-img1" alt="view" />
          <img src={deleteDataImg.deleteimg2} className="d-img2" alt="view" />
          <img src={deleteDataImg.deleteimg3} className="d-img3" alt="view" />
          <img src={deleteDataImg.deleteimg3} className="d-img3-2" alt="view" />
          <img src={deleteDataImg.deleteimg4} className="d-img4" alt="view" />
          <img src={deleteDataImg.deleteimg5} className="d-img5" alt="view" />
          <img src={deleteDataImg.deleteimg6} className="d-img6" alt="view" />
          <img src={deleteDataImg.starimg} className="star-img" alt="view" />
        </div>
        <div className="delete-content">
          <h2 className="delete-head">Delete Goal ? </h2>
          <p className="delete-info">
            Clicking the proceed button means that people will no longer have access to view this goal.
          </p>
          <button type="submit" className="delete-btn">
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deletemodal;
