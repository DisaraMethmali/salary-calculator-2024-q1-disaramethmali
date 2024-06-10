import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const LeaveHistoryModal = ({ isOpen, onClose, leaveHistory }) => {
    return (
        <Modal open={isOpen} onClose={onClose}>
            <div style={{ backgroundColor: 'white', padding: '20px', width: '300px', margin: 'auto', marginTop: '100px' }}>
                <Typography variant="h5" gutterBottom>
                    Leave History
                </Typography>
                <ul>
                    {leaveHistory.map((historyItem, index) => (
                        <li key={index}>
                            <Typography variant="body1">
                                Leave Date: {historyItem.leaveDate}, Type: {historyItem.leaveType}, Status: {historyItem.leaveStatus}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default LeaveHistoryModal;
