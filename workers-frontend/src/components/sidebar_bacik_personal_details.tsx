import * as React from 'react';
import { Box, Drawer, List, Divider, Icon, Button, MenuItem, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxIcon from '@mui/icons-material/AccountBox';



interface SidebarWorkerDetailsProps {
}

export default function SidebarWorkerDetails(props: SidebarWorkerDetailsProps) {
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
                    <Button onClick={toggleDrawer(true)} sx={{ 'auto': 200 }}>details</Button>
                    <Drawer anchor={ANCHOR} open={state} onClose={toggleDrawer(false)}>
                        <Box sx={{ 'auto': 250, pointerEvents: 'none' }} role="presentation" >
                            <List>
                                <MenuItem   >
                                    <Button >
                                        <Icon sx={{
                                            padding: "12px ", paddingTop: "2px"
                                        }}>
                                            <AccountBoxIcon /></Icon>
                                        name
                                    </Button>
                                </MenuItem>
                                <MenuItem >
                                    <Button>
                                        <Icon sx={{
                                            padding: "12px", paddingTop: "2px",
                                        }}><CallIcon /></Icon>
                                        phon
                                    </Button>
                                </MenuItem>
                                <MenuItem >
                                    <Button>
                                        <Icon sx={{
                                            padding: "12px", paddingTop: "2px"
                                        }}><MailIcon /></Icon>
                                        email
                                    </Button>
                                </MenuItem>
                                <MenuItem sx={{pointerEvents: 'auto' ,border:0}} >
                                    <Button >
                                        <Icon sx={{
                                            padding: "12px", paddingTop: "2px"
                                        }}> <AddIcon /></Icon>
                                        details
                                    </Button>
                                </MenuItem>
                                <Divider />
                            </List>
                        </Box>
                    </Drawer>
                </React.Fragment>

            </div>
        </>
    );
}
