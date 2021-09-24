import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { showEditMissionModal, editMissionText } from '../../redux/editMission.slice';
import { Header, TextBox, SaveBtn, Paper , ModalBody } from '../Modal/styledEditMission';
import {useStickyState} from '../../hooks/useSticky';
import  MissionContext  from '../../context/mission'


const EditMission = () => {
  const dispatch = useDispatch();
  const { showMission, missionText } = useSelector((state) => state.editMission);
  const [text, setText] = useStickyState('Click on pen icon to set mission', 'mission');
  


  // useEffect(() => {
  //   setText('Training A Million Youths Yearly');
  //   //  setText(missionText);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showMission]);

  useEffect(() => {

    axios
    .get('https://goals.zuri.chat/api/v1/mission/6145d099285e4a184020742e')
    .then(response => setText(response.data.data.mission))
    .catch(error => console.log(error));

    
  } , [setText])

  const saveMission = () => {
    const mission = {
      'mission' : `${text}`
    }

    const header = {
      'Content-Type' : 'application/json'
    }
    
    dispatch(showEditMissionModal());
    axios
    .put('https://goals.zuri.chat/api/v1/mission/update/6145d099285e4a184020742e' , mission , { header })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    // eslint-disable-next-line no-unused-expressions
    text ? text : dispatch(editMissionText('No Mission'))
    //text ? dispatch(editMissionText(text)) : dispatch(editMissionText('No Mission'));
  }

  return (
    // <MissionContext.Provider value={{text}}>

      <ModalBody>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          // className={classes.modal}
          open={showMission}
          onClose={() => dispatch(showEditMissionModal())}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          style={{display:'flex', alignItems:'center', justifyContent:'center' }}
        >
          <Fade in={showMission}>
            {/* className={classes.paper} */}
            <Paper>
              <form  onSubmit={e => e.preventDefault()}>
                <Header id="transition-modal-title">Edit Mission</Header>
                <TextBox required value={text} onChange={e => setText(e.target.value)} placeholder="Click to edit..." />
                <SaveBtn onClick={saveMission}>Save</SaveBtn>
                {/* <SaveBtn onClick={() => dispatch(showEditMissionModal())}>Cancel</SaveBtn> */}
              </form>
            </Paper>
          </Fade>
        </Modal>
      </ModalBody>
    // </MissionContext.Provider>

  );
};

export default EditMission;
