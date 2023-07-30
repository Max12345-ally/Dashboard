import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {updateAuthor} from './api/updateAuthor';

//1.1 see the current data
//1,2 find id of Author

export default function UpdateAuthorsDialog(props) {
  const {
    isUpdateAuthorDialogOpen,
    setIsUpdateAuthorDialogOpen,
    authorToUpdate,
  } = props;
  const [name, setName] = useState(authorToUpdate?.name);
  const [salary, setSalary] = useState(authorToUpdate?.salary);
  const [starsCount, setStarsCount] = useState(authorToUpdate?.starsCount);
  const [birthDate, setBirthDate] = useState(authorToUpdate?.birthDate);

  useEffect(() => {
    setName(authorToUpdate?.name);
    setSalary(authorToUpdate?.salary);
    setStarsCount(authorToUpdate?.starsCount);
    setBirthDate(authorToUpdate?.birthDate);
  }, [authorToUpdate]);

  const handleClose = () => {
    setIsUpdateAuthorDialogOpen(false);
  };
  const handleUpdate = async () => {
    //1. collect data
    const authorToSend = {
      id: authorToUpdate.id,
      name,
      salary,
      starsCount,
      birthDate,
    };

    //2. resend updated data

    await updateAuthor(authorToSend);
    setName('');
    setSalary('');
    setStarsCount('');
    setBirthDate('');

    //3. close popup

    handleClose();
    window.location.reload();
  };

  return (
    <Dialog open={isUpdateAuthorDialogOpen} onClose={handleClose}>
      <DialogTitle>Update new Author</DialogTitle>
      <DialogContent>
        <DialogContentText>
          please update new Author to continue
        </DialogContentText>
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
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
