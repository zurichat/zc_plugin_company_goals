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
                    style={{ border: '1px solid #888', backgroundColor: '#fff', color: '#888', height: '573px', width: '702px', position: 'relative', marginTop: '30px', borderRadius: '10px', textAlign: 'center' }}>
                    <img src={Avatar}
                        style={{ height: '32vh', position: 'absolute', top: '130px', right: '270px' }} />

                    This space is empty. Create a goal to get started.
                </Typography>

                <Button
                    style={{ backgroundColor: '#00B87C', position: 'absolute', color: '#fff', marginTop: '-200px', marginLeft: '250px', padding: '10px 50px', borderRadius: '7px', textTransform: 'capitalize' }}>Create goal</Button>
            </Container>
        </div >
    )
}