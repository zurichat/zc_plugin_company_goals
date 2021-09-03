import React from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Create() {

    return (
        <div>
            <Container>
                <Typography
                    component="div"
                    style={{ backgroundColor: 'silver', color: '#888', height: '573px', width: '702px', position: 'relative', marginTop: '30px', borderRadius: '10px', textAlign: 'center' }}> You have no goals yet</Typography>
                {/* #00B87C is the main button colour */}
            <Button
            style={{ backgroundColor: '#00B87C', position: 'absolute', color: '#fff', marginTop: '-250px', marginLeft: '280px', padding: '10px 20px', borderRadius: '7px', textTransform: 'capitalize' }}>Create goal</Button>
            </Container>
        </div >
    )
}