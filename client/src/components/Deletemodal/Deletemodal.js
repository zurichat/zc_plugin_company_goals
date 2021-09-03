import deleteDataImg from './deleteAssets'
import { 
   FadedBg,
   DeleteContent,
   DeleteHead,
   DeleteInfo,
   DeleteModal,
   DelButton,
   XBtn,
   MainDelBtn,
   Images
} from './Delete.styled'

const Deletemodal = () => {
   const displayModal = () => {
      document.querySelector('.faded-md').style.display = 'flex'
   }
   const exitModal = () => {
      document.querySelector('.faded-md').style.display = 'none'
   }
   
   const imgData = [
      {image: 'deleteImg', className: 'd-img1'},{image: 'deleteimg2', className: 'd-img2'},
      {image: 'deleteimg3', className: 'd-img3'},{image: 'deleteimg3', className: 'd-img3-2'},
      {image: 'deleteimg4', className: 'd-img4'},{image: 'deleteimg5', className: 'd-img5'},
      {image: 'deleteimg6', className: 'd-img6'},{image: 'starimg', className: 'star-img'}
   ]
   return (
      <>
      <MainDelBtn className="main-del-btn" onClick={displayModal}>Delete Goal</MainDelBtn>
      <FadedBg>
         <DeleteModal>
            <XBtn onClick={exitModal}>X</XBtn>
            <Images>
            {imgData.map((img) => <img src={deleteDataImg[img.image]} className={img.className} alt="view" />)}
            </Images>
            <DeleteContent>
               <DeleteHead className="delete-head">Delete Goal ? </DeleteHead>
                  <DeleteInfo>
                  Clicking the proceed button means that people will no longer have access to view this goal.
                  </DeleteInfo>
                  <DelButton type="submit" className="delete-btn">Proceed</DelButton>
            </DeleteContent>
         </DeleteModal>
      </FadedBg>
   </>
   )
}

export default Deletemodal

