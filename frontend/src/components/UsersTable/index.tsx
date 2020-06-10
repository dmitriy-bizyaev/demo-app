import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import EditableTableCell from '../EditableTableCell';

export interface User {
    readonly id: string,
    readonly name: string,
    readonly email: string,
}

export interface Props {
    totalUsers: number,
    perPage: number,
    currentPage: number,
    users: readonly User[],
    onChangePage: (pageNum: number) => void,
    onUpdateUserName: (id: string, newName: string) => void,
    onUpdateUserEmail: (id: string, newEmail: string) => void,
    onDeleteUser: (id: string) => void,
}

const useStyles = makeStyles({
    avatarCell: {
        width: '72px',
    }
});

export default function UsersTable(props: Props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.avatarCell}></TableCell>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell className={classes.avatarCell}>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </TableCell>

                            <EditableTableCell
                                text={user.name}
                                onChange={newName => props.onUpdateUserName(user.id, newName)}
                            />

                            <EditableTableCell
                                text={user.email}
                                onChange={newEmail => props.onUpdateUserEmail(user.id, newEmail)}
                            />

                            <TableCell>
                                <IconButton onClick={() => props.onDeleteUser(user.id)}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={props.totalUsers}
                            page={props.currentPage}
                            rowsPerPage={props.perPage}
                            rowsPerPageOptions={[props.perPage]}
                            onChangePage={(_, page) => props.onChangePage(page)}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
