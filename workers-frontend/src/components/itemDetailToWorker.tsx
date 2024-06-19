import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SidebarWorkerDetails from './sidebar_bacik_personal_details';

const ItemDetailToWorker = (props: {
    item: object,
    column: string[]
}) => {

    const { item, column } = props

    return(
        <>
        {            
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                {
                    column.map((c)=>{
                        return(c==="details"?<TableCell><SidebarWorkerDetails/></TableCell>:<TableCell align="left">{item[c as keyof typeof undefined]}</TableCell>)
                    })
                }
            </TableRow>
        }
        </>
    )
}

export default ItemDetailToWorker;