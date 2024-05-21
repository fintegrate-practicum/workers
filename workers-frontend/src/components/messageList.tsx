// src/components/MessageList.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from '@mui/material';

const MessageList: React.FC = () => {
  const messages = useSelector((state: RootState) => state.messages.messages);
  const [selectedMessage, setSelectedMessage] = useState<{ id: number; title: string; content: string } | null>(null);

  const handleOpenMessage = (message: { id: number; title: string; content: string }) => {
    setSelectedMessage(message);
  };

  const handleCloseMessage = () => {
    setSelectedMessage(null);
  };

  return (
    <>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText 
              primary={
                <Typography 
                  variant="body1" 
                  style={{ fontWeight: message.read_status ? 'normal' : 'bold' }}
                >
                  {message.title}
                </Typography>
              }
              secondary={message.content}
            />
            <Button variant="outlined" onClick={() => handleOpenMessage(message)}>View Message</Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={!!selectedMessage} onClose={handleCloseMessage}>
        <DialogTitle>{selectedMessage?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedMessage?.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessage}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageList;
