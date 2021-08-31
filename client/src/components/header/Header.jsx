import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
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
                            <Button startIcon={<AddIcon />} style={{fontWeight:'bold'}}>Edit Mission</Button>
                        </Box>
                        <TextField placeholder="Tech Hub Builder" variant="outlined" style={{width:500 , border:"none", backgroundColor:'white', outline:'none'}}/>
                    </Box>
                    
                </Box>
            </Container>
        </>
    )
}

export default Header
