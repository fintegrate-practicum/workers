
import React, { useState } from 'react';
import { List, ListItem, ListItemText, Paper, Typography, CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import Message from '../classes/message'; 

const MessageList = ({ messages }: { messages: Message[] }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleClick = (message: Message) => {
    setSelectedMessage(message);
    message.read_status = true; 
  };

  return (
    <Box display="flex" height="100vh">
      <CssBaseline />
      <Box width="30%" bgcolor="#f5f5f5" overflow="auto">
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.message_id}
              button
              onClick={() => handleClick(message)}
              sx={{
                bgcolor: message.read_status ? 'white' : 'lightyellow',
              }}
            >
              <ListItemText
                primary={message.message_content}
                secondary={`Received from: ${message.sender_id} at ${message.date_time.toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex={1} padding={2} overflow="auto">
        {selectedMessage ? (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5">{selectedMessage.message_content}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Received from: {selectedMessage.sender_id} at {selectedMessage.date_time.toLocaleString()}
            </Typography>
          </Paper>
        ) : (
          <Typography variant="h6" color="textSecondary">
            Select a message to read
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// Define PropTypes (optional)
MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.instanceOf(Message)).isRequired,
};

export default MessageList;


