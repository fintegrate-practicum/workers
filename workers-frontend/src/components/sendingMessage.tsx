import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Typography, Paper, TextField } from '@mui/material';
import { createMessage, getMessage } from '../redux/messageSlice';

const MessagesAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messageSlice);
  const [newMessage, setNewMessage] = useState({
    sender_id: '',
    receiver_id: '',
    message_content: '',
    date_time: new Date().toISOString().slice(0, 16),
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getMessage());
  }, [dispatch]);

  const handleSendMessage = () => {
    dispatch(createMessage(newMessage));
    setShowForm(false);
  };

  return (
    <div>
      <Typography variant="h6">New Message</Typography>
      <Button variant="outlined" onClick={() => setShowForm(true)}>
        Add a new message
      </Button>

      {showForm && (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sender's Name"
                value={newMessage.sender_id}
                onChange={(e) => setNewMessage({ ...newMessage, sender_id: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Receiver's Name"
                value={newMessage.receiver_id}
                onChange={(e) => setNewMessage({ ...newMessage, receiver_id: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message Content"
                value={newMessage.message_content}
                onChange={(e) => setNewMessage({ ...newMessage, message_content: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message Time"
                type="datetime-local"
                value={newMessage.date_time}
                onChange={(e) => setNewMessage({ ...newMessage, date_time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSendMessage}>
                Send
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* <div>
        {messages && לארח את קומפוננטת הצגת הודעות כאן
        ))}
      </div> */}
    </div>
  );
};

export default MessagesAdmin;
