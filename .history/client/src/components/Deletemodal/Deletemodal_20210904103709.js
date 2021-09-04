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
      document.querySelector('.faded').style.display = 'flex'
   }
   const exitModal = () => {
      document.querySelector('.faded').style.display = 'none'
   }
   return (
      <>
      <MainDelBtn className="main-del-btn" onClick={displayModal}>Delete Goal</MainDelBtn>
      <FadedBg className="faded">
         <DeleteModal>
            <XBtn onClick={exitModal}>X</XBtn>
            <Images>
               <img src={deleteDataImg.trash} alt="trash" />
            </Images>
            <DeleteContent>
               <DeleteHead className="delete-head">Delete Goal ? </DeleteHead>
                  <DeleteInfo>
                  Clicking the proceed button means that people will no longer have access to view this goal.
                  </DeleteInfo>
                  <DelButton type="submit">Proceed</DelButton>
            </DeleteContent>
         </DeleteModal>
      </FadedBg>
   </>
   )
}

export default Deletemodal
