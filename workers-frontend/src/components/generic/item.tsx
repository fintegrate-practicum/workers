import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const Item = (props: {
    item: Object,
    column: string[],
    desing: HTMLElement | null
}) => {

    const item = props.item;
    const column = props.column;

    return(
        <>
        {
            props.desing? props.desing:
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {
                    column.map((c)=>{
                        return(<TableCell align="left">{item[c as keyof typeof undefined]}</TableCell>)
                    })
                }
            </TableRow>
        }
        </>
    )
}

export default Item;