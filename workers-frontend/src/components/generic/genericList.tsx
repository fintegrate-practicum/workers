import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Item from "./item";

const GenericList = (props: {
    title: string,
    list: Object[],
    column: string[]
}) => {
    const list = props.list;
    const column = props.column;
    return(
        <>
        <h2>{props.title}</h2>
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    {
                        column.map((c)=>{
                            return(<TableCell align="left" sx={{fontWeight: "bold"}}>{c}</TableCell>)
                        })
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        list.map((l) => (
                            <Item column={column} item={l} />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default GenericList;