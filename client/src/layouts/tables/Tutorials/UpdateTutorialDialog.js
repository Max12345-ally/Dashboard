import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {updateTutorial} from './api/updateTutorial';

//1.1 see the current data
//1,2 find id of Author

export function UpdateTutorialDialog(props) {
  const {
    isUpdateTutorialDialogOpen,
    setIsUpdateTutorialDialogOpen,
    tutorialToUpdate,
  } = props;
  const [authorName, setAuthorName] = useState('');
  const [price, setPrice] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');

  useEffect(() => {
    setAuthorName(tutorialToUpdate?.authorName);
    setPrice(tutorialToUpdate?.price);
    setPageCount(tutorialToUpdate?.pageCount);
    setTitle(tutorialToUpdate?.title);
    setDescription(tutorialToUpdate?.description);
    setPublishedDate(tutorialToUpdate?.publishedDate);
  }, [tutorialToUpdate]);

  const handleClose = () => {
    setIsUpdateTutorialDialogOpen(false);
  };
  const handleUpdate = async () => {
    //1. collect data
    const tutorialToSend = {
      id: tutorialToUpdate.id,
      authorName,
      price,
      pageCount,
      title,
      description,
      publishedDate,
    };

    //2. resend updated data

    await updateTutorial(tutorialToSend);
    setAuthorName('');
    setPrice('');
    setPageCount('');
    setTitle('');
    setDescription('');
    setPublishedDate('');

    //3. close popup

    handleClose();
    window.location.reload();
  };

  return (
    <Dialog open={isUpdateTutorialDialogOpen} onClose={handleClose}>
      <DialogTitle>update Tutorial</DialogTitle>
      <DialogContent>
        <DialogContentText>
          please update Tutorial to continue
        </DialogContentText>
        <TextField
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          autoFocus
          margin='dense'
          id='authorName'
          label='AuthorName'
          type='details'
          fullWidth
          variant='standard'
        />
        <TextField
          value={pageCount}
          onChange={(e) => setPageCount(e.target.value)}
          autoFocus
          margin='dense'
          id='PageCount'
          label='PageCount'
          type='details'
          fullWidth
          variant='standard'
        />
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          margin='dense'
          id='title'
          label='Title'
          type='details'
          fullWidth
          variant='standard'
        />
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          autoFocus
          margin='dense'
          id='price'
          label='Price'
          type='details'
          fullWidth
          variant='standard'
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoFocus
          margin='dense'
          id='description'
          label='Description'
          type='details'
          fullWidth
          variant='standard'
        />
        <TextField
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          autoFocus
          margin='dense'
          id='publishedDate'
          label='Published Date'
          type='details'
          fullWidth
          variant='standard'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
