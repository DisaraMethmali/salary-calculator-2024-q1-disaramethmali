import React, { useState } from 'react';

import BgCards from "../components/bgcards";

import EmployeeReport from './Report';

function EmployeeR() {
    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Poppins, sans-serif' }}>
            
            <div style={{ 
                flex: 1,
                padding: '10px', 
                margin: '50px ', 
                marginBottom: '20px', 
                paddingLeft: '130px', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
             
                <h4>Welcome Back,</h4>
                <h1>Disara Methmali</h1>
                <div style={{ marginTop:"70px", textAlign: 'center' }}>
                    
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                               
                            </div>
                            <div style={{ marginLeft: '20px' }}>
                                <EmployeeReport/>
                            </div>
                        </div>
                   
                </div>
            </div>
        </div>
    );
}

export default EmployeeR;
