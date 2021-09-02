import React from 'react'
import {Container , Button , Box,  TextField, ButtonGroup, Grid, Paper} from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';

const Header = () => {
    return (
        <>
            <Container>
                <Box container display="flex" justifyContent="space-evenly" style={{marginTop:50}}>
                    <Box>
                        <Box container display="flex" style={{ width:500 , justifyContent:'space-between', alignItems:'center',borderBottom:'3px solid #FFF0F0'}}>
                            <Button style={{fontWeight:'bold'}}>Mission</Button>
                            <Button startIcon={<AddIcon />} style={{fontWeight:'bold'}} >Edit Mission</Button>
                        </Box>
                        <TextField placeholder="Training A Million Youths Yearly" variant="outlined" style={{width:500 , border:"none", backgroundColor:'white', outline:'none'}}/>
                    </Box>
                    
                    <Box>
                        <Box container display="flex" style={{fontWeight:'bold', width:500, justifyContent:'space-between' , alignItems:'center',borderBottom:'3px solid#FFF0F0'}}>
                            <Button style={{fontWeight:'bold'}}>Vision</Button>
                            <div>
                                <Button startIcon={<AddIcon />} style={{fontWeight:'bold'}}>Edit Mission</Button>
                                <span>
                                    <Button style={{backgroundColor:'#00B87C' , color:'white'}}><ExpandLessIcon /></Button>
                                </span>
                            </div>
                            
                        </Box>
                        <TextField placeholder="Tech Hub Builder" variant="outlined" style={{width:500 , border:"none", backgroundColor:'white', outline:'none'}}/>
                    </Box>
                    
                </Box>
            </Container>
        </>
    )
}

export default Header
