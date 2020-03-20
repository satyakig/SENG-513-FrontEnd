import React, { useEffect, createRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { profileModalStyles } from './ProfileModal.styles';
import {
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  DialogTitle,
  DialogActions,
  Container,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/combinedReducer';

interface ProfileProps {
  open: boolean;
  handleClose: () => void;
}

const ProfileModal = (props: ProfileProps) => {
  const classes = profileModalStyles();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone);
  }, [user]);

  const nameInput = createRef<string>();
  const phoneInput = createRef<string>();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  function close() {
    setName(user.name);
    setPhone(user.phone);

    props.handleClose();
  }

  function handleSaveChanges() {
    // Read values
    // @ts-ignore
    console.log(nameInput.current.value);
    // @ts-ignore
    console.log(phoneInput.current.value);

    // Check if input changed, if not, do props.handleClose()
    // Validate input
    // Send to API to update Firebase
  }

  return (
    <Dialog
      open={props.open}
      onClose={close}
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
    >
      <IconButton className={classes.closeButton} onClick={close} color="secondary">
        <CloseIcon />
      </IconButton>
      <Container maxWidth="lg">
        <DialogTitle>
          <Typography className={classes.title} variant="h6" component="span" display="block">
            Profile
          </Typography>
        </DialogTitle>
        <Grid container={true} direction="column" justify="center" alignItems="center">
          <Grid item={true} className={classes.gridItem}>
            <Avatar alt={user.name} src={user.photoURL} className={classes.avatarPicture} />
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                value={name}
                onChange={handleNameChange}
                label="Name"
                inputRef={nameInput}
              />
            </FormControl>
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel>Email</InputLabel>
              <OutlinedInput value={user.email} label="Email" disabled={true} />
            </FormControl>
          </Grid>
          <Grid item={true} className={classes.gridItem}>
            <FormControl variant="outlined">
              <InputLabel>Phone</InputLabel>
              <OutlinedInput
                value={phone}
                onChange={handlePhoneChange}
                label="Phone"
                inputRef={phoneInput}
              />
            </FormControl>
          </Grid>
        </Grid>
        <DialogActions className={classes.actions}>
          <Button
            onClick={handleSaveChanges}
            color="secondary"
            variant="contained"
            className={classes.submit}
          >
            Save
          </Button>
        </DialogActions>
      </Container>
    </Dialog>
  );
};

export default ProfileModal;
