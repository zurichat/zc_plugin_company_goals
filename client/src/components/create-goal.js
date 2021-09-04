import React from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '././images/avatar.png';

export default function Create() {

    return (
        <div>
            {/* typography is the box that contains the image and button
            button is the green button
            img tag houses the picture or avatar, whichever one it is */}
            <Container>
                <Typography
                    component="div"
                    style={{ border: '1px solid #c1c1c1', backgroundColor: '#fff', color: '#888', height: '480px', width: '730px', position: 'relative', marginTop: '70px', borderRadius: '7px', textAlign: 'center' }}>
                    <img src={Avatar}
                        style={{ height: '37vh', position: 'absolute', top: '50px', right: '260px' }} />

                    
                    <span style={{ display: 'inline-block', marginTop: '310px' }}>This space is empty. Create a goal to get started.</span>
                </Typography>

                <Button
                    style={{ backgroundColor: '#00B87C', position: 'absolute', color: '#fff', marginTop: '-125px', marginLeft: '277px', padding: '12px 45px', borderRadius: '7px', textTransform: 'capitalize' }}>Create goal</Button>
            </Container>
        </div >
    )
}