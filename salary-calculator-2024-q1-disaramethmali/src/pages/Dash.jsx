// Dash.jsx
import React from 'react';
import Esidebar from '../components/esidebar'; // Assuming correct import path
import Container from '@mui/material/Container';
import "../styles/createEm.css"
function Dash() {
    return (
        <Container
            className="main-container"
            sx={{
                display: 'flex',
                minWidth: '1036px'
            }}
        >
            <Esidebar />
        </Container>
    );
}

export default Dash;
