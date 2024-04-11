import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Item from "./item";
import { ComponentType } from 'react';

const GenericList = (props: {
    title: string,
    list: object[],
    column: string[],
    desing: ComponentType<{
        item: object,
        column: string[]
    }> | null}) => {

    const {title, list, column, desing} = props

    return(
        <>
        <h2>{title}</h2>
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
                                <Item column={column} item={l} Desing={desing}/>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default GenericList;