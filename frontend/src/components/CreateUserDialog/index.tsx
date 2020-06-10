import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

export interface CreateUserData {
    name: string,
    email: string,
}

export interface Props {
    open: boolean,
    onCancel: () => void,
    onCreateUser: (data: CreateUserData) => void,
}

export default function CreateUserDialog(props: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleCancel = () => {
        setName('');
        setEmail('');
        props.onCancel();
    }

    const handleCreateClick = () => {
        setName('');
        setEmail('');
        props.onCreateUser({ name, email });
    }

    return (
        <Dialog open={props.open} onClose={handleCancel}>
            <DialogTitle>Create new user</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Fill in the form below and click Create to create a new user.
                </DialogContentText>

                <FormGroup>
                    <TextField
                        label="Email address"
                        value={email}
                        required
                        onChange={event => setEmail(event.target.value || '')}
                    />

                    <TextField
                        label="Name"
                        value={name}
                        required
                        onChange={event => setName(event.target.value || '')}
                    />
                </FormGroup>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button color="primary" onClick={handleCreateClick}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}
