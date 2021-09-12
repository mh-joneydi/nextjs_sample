import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableProps } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { memo, useState, useCallback } from "react";
import { HiOutlineInbox } from "react-icons/hi";
import Spin from "./Spin";
import Text from "./Text";

type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export interface DataGridColumns {
    dataKey: string,
    label: string,
    minWidth?: number,
    align?: Alignment,
    format?: (val: any, row?: any)=> any
}

interface OwnProps {
    columns: DataGridColumns[], 
    dataSource: any[] | null, 
    defaultPageSize?: number, 
    currentPage?: number ,
    onPageChange?: (page: number)=>void,
    loading?: boolean,
    rowsHover?: boolean,
    bodyCellsAlign?: Alignment,
    headerCellsAlign?: Alignment,
    maxHeight?: number|string,
    showRowNumber?: boolean,
}

type DataGridProps = TableProps & OwnProps;

const useStyle = makeStyles( theme=> ({
    tableRoot: {
        borderCollapse: 'separate',
        borderSpacing: theme.spacing(0,1.2),
        whiteSpace: 'nowrap'
    },
    tableBodyRows: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 1px 10px 0 #2d387510',
        borderRadius: 25,
        "& td:first-child": {
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomRightRadius: theme.shape.borderRadius
        },
        "& td:last-child": {
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius
        }
    },
    paginationUl: {
        padding: theme.spacing(2,1),
        justifyContent: 'center',
        '& .MuiPaginationItem-root': {
            fontSize: 13
        }
    },
    noData: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
    }
}));

const DataGrid: React.FC<DataGridProps> = ({ 
    columns, 
    dataSource, 
    defaultPageSize,
    onPageChange,
    currentPage, 
    loading = false, 
    rowsHover = false, 
    bodyCellsAlign = 'center', 
    headerCellsAlign = 'center',
    maxHeight = 400,
    showRowNumber = false,
    ...TableProps }) => {

    const classes = useStyle();
    const [defaultPage, setPage] = useState<number>(1);
    const handleChangePage = useCallback((e: any, newPage: any) => {
        if(!currentPage) {
            setPage(newPage);
        }
        if(onPageChange) {
            onPageChange(newPage);
        }
    }, [currentPage, onPageChange]);

    if(showRowNumber) {
        columns = [
            { dataKey: 'RowNumber', label: 'ردیف'},
            ...columns
        ]
    }

    const renderRow = (row: any, rowIndex: number)=> {
        return (
            <TableRow hover={rowsHover} tabIndex={-1} key={rowIndex} classes={{ root: classes.tableBodyRows }}>
                {columns.map((column,columnIndex) => {  
                    const value = (showRowNumber && columnIndex === 0)
                    ? defaultPageSize ? page*defaultPageSize+rowIndex+1-defaultPageSize : rowIndex+1  
                    : row[column.dataKey];
                    return (
                    <TableCell key={columnIndex} align={bodyCellsAlign} >
                        { 'format' in column? column?.format!(value,row) : <Text variant='body2' >{value || '-'}</Text> }
                    </TableCell>
                    );
                })}
            </TableRow>
        )
    }
    const page = currentPage || defaultPage;
    return ( 
        <Spin spinning={loading}>
            <TableContainer style={TableProps.stickyHeader?{maxHeight}:{}}>
                <Table {...TableProps} classes={{ root: classes.tableRoot }}>
                    <TableHead>
                        <TableRow >
                            {columns.map((column,index) => (
                                <TableCell
                                    key={ index }
                                    align={ column.align||headerCellsAlign }
                                    style={{ minWidth: column.minWidth||'unset' }}
                                    size='small'   
                                >
                                    <Text variant='h6'>{column.label}</Text>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            dataSource&& !!dataSource.length? (
                                (defaultPageSize?dataSource.slice((page-1)*defaultPageSize,(page-1)*defaultPageSize+defaultPageSize):dataSource).map((row, rowIndex) => {
                                    return (renderRow(row,rowIndex))
                                })
                            ) : (
                                <TableRow hover={rowsHover} tabIndex={-1} classes={{ root: classes.tableBodyRows }}>
                                    <TableCell colSpan={columns.length} height={170}>
                                        <div className={classes.noData}>
                                            <Text color='text.hint' startIcon={<HiOutlineInbox />} variant='h5'>
                                                موردی وجود ندارد
                                            </Text>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            { dataSource&& !!dataSource.length&&defaultPageSize&&(
                <Pagination 
                    count={Math.ceil(dataSource.length/defaultPageSize)} 
                    page={page} 
                    onChange={handleChangePage} 
                    showFirstButton 
                    showLastButton 
                    color='primary' 
                    size='small'
                    classes={{
                        ul: classes.paginationUl
                    }}
                />
            )}
        </Spin>
    );
}
 
export default memo(DataGrid);