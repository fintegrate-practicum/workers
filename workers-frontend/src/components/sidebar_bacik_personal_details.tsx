import * as React from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Margin } from '@mui/icons-material';

interface SideebarWorkerDetailsProps {
}

export default function SideebarWorkerDetails(props: SideebarWorkerDetailsProps): React.FC {
    const [state, setState] = React.useState(false);
    const ANCHOR = 'right';

    const toggleDrawer = (open: boolean) => (event: React.SyntheticEvent) => {
        if (event.type === 'keydown' && (event.currentTarget.textContent === 'Tab' || event.currentTarget.textContent === 'Shift')) {
            return;
        }
        setState(open);
    };

    return (
        <>
        <div>

            <React.Fragment key='right'>
                <Button onClick={toggleDrawer(true)} sx={{'auto':200}}>details</Button>
                <Drawer anchor={ANCHOR} open={state} onClose={toggleDrawer(false)}>
                    <Box sx={{ 'auto': 250 }} role="presentation">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                                    <ListItemText primary="name" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon><CallIcon /></ListItemIcon>
                                    <ListItemText primary="phon" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon><MailIcon /></ListItemIcon>
                                    <ListItemText primary="email"  />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon><AddIcon /></ListItemIcon>
                                    <ListItemText primary="details"/>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
            </div>
        </>
    );
}
