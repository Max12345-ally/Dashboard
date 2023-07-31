import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {saveNewAuthor} from './api/saveNewAuthor';

export function CreateAuthorDialog(props) {
  const {isCreateAuthorDialogOpen, setIsCreateAuthorDialogOpen} = props;
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [starsCount, setStarsCount] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleClose = () => {
    setIsCreateAuthorDialogOpen(false);
  };
  const handleAdd = async () => {
    //1. collect data
    const authorToSave = {
      name,
      salary,
      starsCount,
      birthDate,
    };
    console.log(authorToSave);

    //2. send data

    await saveNewAuthor(authorToSave);
    setName('');
    setSalary('');
    setStarsCount('');
    setBirthDate('');

    //3. close popup
    handleClose();
  };

  return (
    <Dialog open={isCreateAuthorDialogOpen} onClose={handleClose}>
      <DialogTitle>Add new Author</DialogTitle>
      <DialogContent>
        <DialogContentText>please add new Author to continue</DialogContentText>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          margin='dense'
          id='name'
          label='Name'
          type='details'
          fullWidth
          variant='standard'
        />
        <TextField
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          autoFocus
          margin='dense'
          id='salary'
          label='Salary'
          type='details'
          fullWidth
          variant='standard'
        />
        <TextField
          value={starsCount}
          onChange={(e) => setStarsCount(e.target.value)}
          autoFocus
          margin='dense'
          id='starsCount'
          label='StarsCount'
          type='details'
          fullWidth
          variant='standard'
        />
        <TextField
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          autoFocus
          margin='dense'
          id='birthDate'
          label='BirthDate'
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
