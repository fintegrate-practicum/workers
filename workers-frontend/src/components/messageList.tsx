// import React, { useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from '../redux/store';
// import { fetchMessages, selectMessages } from '../redux/messageSlice';
// import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
// import message from '../classes/message';

// const MessageList: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const messages = useAppSelector(selectMessages);
//   const [selectedMessage, setSelectedMessage] = React.useState<message | null>(null);

//   useEffect(() => {
//     // Fetch messages for a specific employee (example employeeId used)
//     dispatch(fetchMessages('664c4ced63112b0c0f736930'));
//   }, [dispatch]);

//   const handleMessageClick = (message: message) => {
//     setSelectedMessage(message);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <div style={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
//         <List>
//           {messages.length > 0 ? (
//             messages.map((message: message) => (
//               <ListItem button key={message.message_id} onClick={() => handleMessageClick(message)}>
//                 <ListItemText
//                   primary={`A message was received from ${message.sender_id}`}
//                   secondary={new Date(message.date_time).toLocaleString()}
//                 />
//                 <Typography variant="body2" color="textSecondary">
//                   {message.status}
//                 </Typography>
//               </ListItem>
//             ))
//           ) : (
//             <Typography variant="body2" color="textSecondary">
//               No messages available
//             </Typography>
//           )}
//         </List>
//       </div>
//       <div style={{ width: '70%', padding: '16px' }}>
//         {selectedMessage ? (
//           <Card>
//             <CardContent>
//               <Typography variant="h5" component="h2">
//                 Message Details
//               </Typography>
//               <Typography color="textSecondary">
//                 From: {selectedMessage.sender_id}
//               </Typography>
//               <Typography color="textSecondary">
//                 To: {selectedMessage.receiver_id}
//               </Typography>
//               <Typography color="textSecondary">
//                 Sent at: {new Date(selectedMessage.date_time).toLocaleString()}
//               </Typography>
//               <Typography color="textSecondary">
//                 Status: {selectedMessage.status}
//               </Typography>
//               <Typography variant="body2" component="p" style={{ marginTop: '16px' }}>
//                 {selectedMessage.message_content}
//               </Typography>
//             </CardContent>
//           </Card>
//         ) : (
//           <Typography variant="h6" component="p">
//             Select a message to view details
//           </Typography>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MessageList;
// MessageList.tsx
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchMessages, selectMessages } from "../redux/messageSlice";
import { selectEmployees } from "../redux/employeeSlice";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import message from "../classes/message";

const MessageList: React.FC = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const employees = useAppSelector(selectEmployees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<message | null>(null);

  useEffect(() => {
    if (selectedEmployeeId) {
      dispatch(fetchMessages(selectedEmployeeId));
    }
  }, [dispatch, selectedEmployeeId]);

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setSelectedMessage(null); // Reset selected message when employee changes
  };

  const handleMessageClick = (message: message) => {
    setSelectedMessage(message);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "16px" }}>
        <Typography variant="h6">Select an Employee</Typography>
        {employees.map((employee) => (
          <Button
            key={employee.userId}
            onClick={() => handleEmployeeSelect(employee.userId)}
            variant={selectedEmployeeId === employee.userId ? "contained" : "outlined"}
          >
            {employee.name}
          </Button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "30%", borderRight: "1px solid #ccc", overflowY: "auto" }}>
          <List>
            {messages.length > 0 ? (
              messages.map((message) => (
                <ListItem button key={message.message_id} onClick={() => handleMessageClick(message)}>
                  <ListItemText
                    primary={`A message was received from ${message.sender_id}`}
                    secondary={new Date(message.date_time).toLocaleString()}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {message.status}
                  </Typography>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No messages available
              </Typography>
            )}
          </List>
        </div>
        <div style={{ width: "70%", padding: "16px" }}>
          {selectedMessage ? (
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Message Details
                </Typography>
                <Typography color="textSecondary">
                  From: {selectedMessage.sender_id}
                </Typography>
                <Typography color="textSecondary">
                  To: {selectedMessage.receiver_id}
                </Typography>
                <Typography color="textSecondary">
                  Sent at: {new Date(selectedMessage.date_time).toLocaleString()}
                </Typography>
                <Typography color="textSecondary">
                  Status: {selectedMessage.status}
                </Typography>
                <Typography variant="body2" component="p" style={{ marginTop: "16px" }}>
                  {selectedMessage.message_content}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="h6" component="p">
              Select a message to view details
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageList;
