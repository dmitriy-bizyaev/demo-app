import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import UsersTable from '../../components/UsersTable';
import TheFab from '../../components/TheFab';
import CreateUserDialog, { CreateUserData } from '../../components/CreateUserDialog';
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserNameMutation,
    useUpdateUserEmailMutation,
    useCreateUserMutation,
} from './operations.generated';

const PAGE_SIZE = 10;

const useStyles = makeStyles({
    container: {
        paddingTop: '20px',
    }
});

export default function App() {
    const [currentPage, setCurrentPage] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const classes = useStyles();
    const { data, updateQuery: updateUsersQuery } = useGetUsersQuery({
        variables: {
            skip: currentPage * PAGE_SIZE,
            limit: PAGE_SIZE,
        },
        fetchPolicy: 'network-only',
    });

    const [doDeleteUserMutation] = useDeleteUserMutation();
    const [doUpdateUserNameMutation] = useUpdateUserNameMutation();
    const [doUpdateUserEmailMutation] = useUpdateUserEmailMutation();
    const [doCreateUserMutation] = useCreateUserMutation();

    if (!data) {
        return null;
    }

    const handleDeleteUser = async (id: string) => {
        const result = await doDeleteUserMutation({
            variables: {
                id,
            },
        });

        if (result.data) {
            updateUsersQuery(prevResult => ({
                users: {
                    count: prevResult.users.count - 1,
                    nodes: prevResult.users.nodes.filter(user => user.id !== id),
                },
            }));
        }
    };

    const handleUpdateName = async (id: string, newName: string) => {
        const result = await doUpdateUserNameMutation({
            variables: {
                id,
                name: newName,
            }
        });

        if (result.data) {
            updateUsersQuery(prevResult => ({
                users: {
                    count: prevResult.users.count,
                    nodes: prevResult.users.nodes.map(
                        user => user.id === id ? { ...user, name: newName } : user,
                    ),
                },
            }));
        }
    };

    const handleUpdateEmail = async (id: string, newEmail: string) => {
        const result = await doUpdateUserEmailMutation({
            variables: {
                id,
                email: newEmail,
            }
        });

        if (result.data) {
            updateUsersQuery(prevResult => ({
                users: {
                    count: prevResult.users.count,
                    nodes: prevResult.users.nodes.map(
                        user => user.id === id ? { ...user, email: newEmail } : user,
                    ),
                },
            }));
        }
    };

    const handleFabClick = () => {
        if (!dialogOpen) {
            setDialogOpen(true);
        }
    };

    const handleCreateUser = async (userData: CreateUserData) => {
        const result = await doCreateUserMutation({
            variables: {
                name: userData.name,
                email: userData.email,
            },
        });

        if (result.data) {
            const isOnLastPage = data.users.count - currentPage * PAGE_SIZE <= PAGE_SIZE;
            const willPushNewUser = isOnLastPage && data.users.nodes.length < PAGE_SIZE;

            updateUsersQuery(prevResult => ({
                users: {
                    count: prevResult.users.count + 1,
                    nodes: willPushNewUser
                        ? [...prevResult.users.nodes, result.data!.createUser]
                        : prevResult.users.nodes,
                },
            }));

            setDialogOpen(false);
        }
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Demo App
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container component="main" className={classes.container}>
                <UsersTable
                    totalUsers={data.users.count}
                    perPage={PAGE_SIZE}
                    currentPage={currentPage}
                    users={data.users.nodes}
                    onChangePage={setCurrentPage}
                    onDeleteUser={handleDeleteUser}
                    onUpdateUserName={handleUpdateName}
                    onUpdateUserEmail={handleUpdateEmail}
                />
            </Container>

            <TheFab onClick={handleFabClick} />

            <CreateUserDialog
                open={dialogOpen}
                onCreateUser={handleCreateUser}
                onCancel={handleDialogClose}
            />
        </>
    );
}
