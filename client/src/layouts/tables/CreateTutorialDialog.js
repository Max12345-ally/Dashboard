import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {saveNewTutorial} from './data/saveNewTutorial';

export default function CreateTutorialsDialog(props) {
  const {isCreateTutorialDialogOpen, setIsCreateTutorialDialogOpen} = props;
  const [authorName, setAuthorName] = useState('');
  const [price, setPrice] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');

  const handleClose = () => {
    setIsCreateTutorialDialogOpen(false);
  };
  const handleAdd = async () => {
    //1. collect data

    const tutorialToSave = {
      authorName,
      price,
      pageCount,
      title,
      description,
      publishedDate,
    };
    console.log(tutorialToSave);

    //2. send data

    await saveNewTutorial(tutorialToSave);
    setAuthorName('');
    setPrice('');
    setPageCount('');
    setTitle('');
    setDescription('');
    setPublishedDate('');

    //3. close popup
    handleClose();
  };

  return (
    <Dialog open={isCreateTutorialDialogOpen} onClose={handleClose}>
      <DialogTitle>Add new Author2</DialogTitle>
      <DialogContent>
        <DialogContentText>
          please add new Author2 to continue
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
          label='PageCountP'
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
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
