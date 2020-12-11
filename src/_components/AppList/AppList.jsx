import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import { listActions } from '../../_actions';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";


import styles from './styles'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

export const AppList = () => {
  const { data } = useSelector(state => state.list);
  const { rowsPerPage } = useSelector(state => state.list);
  const { resultCount } = useSelector(state => state.list);
  const { page } = useSelector(state => state.list);
  const [filter, setFilter] = useState('');
  const classes = styles;

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    dispatch(listActions.getListData(filter, newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    dispatch(listActions.getListData(filter, 0, newRowsPerPage));
  };

  const TablePaginationActions = () => {
    const classes = useStyles();
    const theme = useTheme();
  
    const handleFirstPageButtonClick = (event) => {
      handleChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      handleChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      handleChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      handleChangePage(event, Math.max(0, Math.ceil(resultCount / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(resultCount / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(resultCount / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.search}>
        <TextField id="search-filter"
          label="Search"
          type="search"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton color='primary' onClick={e => handleChangePage(e, 0)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data !== undefined ? data.map(item => {
              return (
                // use of composed key because provided data have duplicated ids
                <TableRow key={`${item.id}-${item.name}`}>
                  <TableCell component="th" scope="row">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              );
            }) : null}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={resultCount}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  disabled: false
                }}
                nextIconButtonProps={{
                  disabled: false
                }}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: false,
                  disabled: resultCount === 0
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  )
}