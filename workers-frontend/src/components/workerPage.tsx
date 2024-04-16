import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Grid,

} from '@mui/material';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

import User from '../user';
import employee from '../employee';
import React from 'react';

interface WorkerPageProps {
    user: User;
    employee:employee;
    
  }  


  const WorkerPage: React.FC<WorkerPageProps> = (props) => {
 

    return (

        <>
            <Stack spacing={4} direction="row-reverse" sx={{ color: 'action.active', display: 'flex', justifyContent: 'flex-end', width: '90%', flexDirection: 'row' }}>
                <Badge color="secondary" badgeContent={0} showZero>
                    <MailIcon />
                </Badge>
            </Stack>

            <Grid style={{ display: 'flex', flexWrap: 'wrap', width: '80%', margin: 'auto', flexDirection: 'column' }} id="all">
                <Grid style={{ textAlign: 'left', margin: 'none' }} >
                    <Typography>Name:{props.user.name} </Typography>
                    <Typography>Working Position:{props.employee.position}</Typography>
                </Grid>

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <Grid style={{ display: 'flex', flexWrap: 'wrap', width: '50%', margin: 'auto', flexDirection: 'column' }}>
                            <ListItemText
                                primary="Personal Information:"
                                secondary={
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    > dateOfBirth: {props.user.name}
                                    <br/> 
                                    mobile: {props.user.mobile} 
                                    <br/>
                                    status: {props.user.status}                                                                                                     
                                    </Typography>                                    
                                }                                
                            />
                            
                        </Grid>
                    </ListItem>
                </List>
            </Grid>
        </>
    );
};

export default WorkerPage;
