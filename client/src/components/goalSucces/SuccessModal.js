import React from 'react'
import thumbsUp from './Imgasset/thumbsUp.png'
import {
   SuccessButton,
   SuccessHead,
   SuccessContent,
   SuccessInfo,
   Image,
   Modal, 
   ModalBg,
   Imgdiv,
   XBtn
} 
from './Succesmodal.styled'


const SuccessModal = () => {
   return (
      <ModalBg>
         <Modal>
         <XBtn>X</XBtn>
         <Imgdiv>
            <Image src={thumbsUp} alt="thumbs-up"></Image>
         </Imgdiv>
            <SuccessContent>
               <SuccessHead className="delete-head">Delete Goal ? </SuccessHead>
                  <SuccessInfo>
                   Click the return button to go back to main dashboard.
                  </SuccessInfo>
               <SuccessButton type="submit">ok</SuccessButton>
            </SuccessContent>
         </Modal>
      </ModalBg>
   )
}

export default SuccessModal

