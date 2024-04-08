import * as React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Icon,Button,Item,ItemText } from '@mui/material';
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
                        <Box sx={{ 'auto': 250 }} role="presentation">
                            <List>
                                <Item disablePadding>
                                    <Button>
                                        <Icon sx={{
                                            padding: "4px",
                                        }}>
                                            <AccountBoxIcon /></Icon>
                                        <ItemText primary="name" />
                                    </Button>
                                </Item>
                                <Item disablePadding>
                                    <Button>
                                        <Icon sx={{
                                            padding: "4px",
                                        }}><CallIcon /></Icon>
                                        <ItemText primary="phon" />
                                    </Button>
                                </Item>
                                <Item disablePadding>
                                    <Button>
                                        <Icon sx={{
                                            padding: "4px",
                                        }}><MailIcon /></Icon>
                                        <ItemText primary="email" />
                                    </Button>
                                </Item>
                                <Item disablePadding>
                                    <Button>
                                        <Icon sx={{
                                            padding: "4px",
                                        }}> <AddIcon /></Icon>
                                        <ItemText primary="details" />
                                    </Button>
                                </Item>
                                <Divider />
                            </List>
                        </Box>
                    </Drawer>
                </React.Fragment>

            </div>
        </>
    );
}
