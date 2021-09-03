import deleteDataImg from './deleteAssets';

const Deletemodal = () => {
  const displayModal = () => {
    document.querySelector('.faded-md').style.display = 'flex';
  };
  const exitModal = () => {
    document.querySelector('.faded-md').style.display = 'none';
  };
  const imgData = [
    { image: 'deleteImg', className: 'd-img1' },
    { image: 'deleteimg2', className: 'd-img2' },
    { image: 'deleteimg3', className: 'd-img3' },
    { image: 'deleteimg3', className: 'd-img3-2' },
    { image: 'deleteimg4', className: 'd-img4' },
    { image: 'deleteimg5', className: 'd-img5' },
    { image: 'deleteimg6', className: 'd-img6' },
    { image: 'starimg', className: 'star-img' },
  ];
  return (
    <>
      <button className="main-del-btn" onClick={displayModal}>
        Delete Goal
      </button>
      <div className="faded-md">
        <div className="delete-modal">
          <button className="cancel-modal" onClick={exitModal}>
            X
          </button>
          <div className="image">
            {imgData.map((img) => (
              <img src={deleteDataImg[img.image]} className={img.className} alt="view" />
            ))}
          </div>
          <div className="delete-content">
            <h2 className="delete-head"> Delete Goal ? </h2>
            <p className="delete-info">
              Clicking the proceed button means that people will no longer have access to view this goal.
            </p>
            <button type="submit" className="delete-btn">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deletemodal;
