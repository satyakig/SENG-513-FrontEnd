import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  Input,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { commentCardStyles } from './CommentCard.styles';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/combinedReducer';
import { v4 } from 'uuid';
import { getStorage } from '../../lib/Firebase';
import { createComment, CreateCommentType } from '../../lib/CommentRequests';

const SUBMIT_COMMENT_PHOTO = 'SUBMIT_COMMENT_PHOTO';

interface SubmitCommentCardProps {
  eventId: string;
}

const SubmitCommentCard = (props: SubmitCommentCardProps) => {
  const dispatch = useDispatch();
  const classes = commentCardStyles();

  const user = useSelector((state: ReduxState) => {
    return state.user;
  });

  const [commentMsg, setCommentMsg] = useState('');
  const [commentPhotoURL, setCommentPhotoURL] = useState('');

  function uploadPhoto() {
    const element = document.getElementById(SUBMIT_COMMENT_PHOTO);
    if (element) {
      element.click();
    }
  }

  const handleCommentPictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length !== 1) {
      return;
    }

    const id = `${v4()}${user.uid}`;
    const file = e.target.files[0];

    const storageRef = getStorage().child(id);
    storageRef
      .put(file)
      .then(() => {
        return storageRef.getDownloadURL();
      })
      .then((link) => {
        setCommentPhotoURL(link);
      });
  };

  const handleCommentMsgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentMsg(event.target.value);
  };

  function handleSubmit() {
    if (!commentMsg && !commentPhotoURL) {
      return;
    }

    const comment: CreateCommentType = {
      eid: props.eventId,
      message: commentMsg,
      photoURL: commentPhotoURL,
    };

    dispatch(createComment(comment));

    setCommentMsg('');
    setCommentPhotoURL('');
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt={user.name} src={user.photoURL} />}
        title="submit a comment"
      />
      {commentPhotoURL ? <CardMedia component="img" image={commentPhotoURL} /> : null}
      <Input
        id={SUBMIT_COMMENT_PHOTO}
        type="file"
        onChange={handleCommentPictureChange}
        style={{ display: 'none' }}
      />
      <TextField
        value={commentMsg}
        onChange={handleCommentMsgChange}
        multiline={true}
        rows="3"
        placeholder="write something..."
        className={classes.textField}
      />
      <CardActions>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Button size="small" color="primary" onClick={uploadPhoto}>
            Upload Photo
          </Button>
          <Button size="small" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SubmitCommentCard;
