import {Grid as AgGrid} from 'ag-grid-community';
import UpdateAuthorsDialog from './UpdateAuthorDialog';
import CreateAuthorsDialog from './CreateAuthorDialog';
import {deleteAuthor} from './api/deleteAuthor';
import {loadAuthorPage} from './api/loadAuthorPage';
import {useCallback, useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';

let authorsLoadedCount = 0;

const agGridAuthorsOptions = {
  columnDefs: [
    {headerName: 'id', field: 'id'},
    {headerName: 'name', field: 'name'},
    {headerName: 'salary', field: 'salary'},
    {headerName: 'starsCount', field: 'starsCount'},
    {headerName: 'birthDate', field: 'birthDate'},
  ],
  rowBuffer: 0,
  rowSelection: 'single',
  onSelectionChanged: onAuthorsSelectionChanged,
  rowModelType: 'infinite',
  // how big each page in our page cache will be, default is 100
  cacheBlockSize: 5, //100,
  // how many extra blank rows to display to the user at the end of the dataset,
  // which sets the vertical scroll and then allows the grid to request viewing more rows of data.
  // default is 1, ie show 1 row.
  cacheOverflowSize: 2,
  // how many server side requests to send at a time. if user is scrolling lots, then the requests
  // are throttled down
  maxConcurrentDatasourceRequests: 1,
  // how many rows to initially show in the grid. having 1 shows a blank row, so it looks like
  // the grid is loading from the users perspective (as we have a spinner in the first col)
  infiniteInitialRowCount: 5, //100
  // how many pages to store in cache. default is undefined, which allows an infinite sized cache,
  // pages are never purged. this should be set for large data to stop your browser from getting
  // full of data
  maxBlocksInCache: 5, //10
};

function onAuthorsSelectionChanged() {
  const selectedRows = agGridAuthorsOptions.api.getSelectedRows();
}

export function Authors() {
  useEffect(() => {
    initAuthorsTable();
  }, []);

  const initAuthorsTable = useCallback(async () => {
    //const authors = await loadAuthors();
    const gridDiv = document.querySelector('#authorsGrid');
    //agGridAuthorsOptions.rowData = authors
    const dataSource = {
      rowCount: undefined, // behave as infinite scroll

      getRows: async (params) => {
        console.log(
          'asking for ' + params.startRow + ' to ' + params.endRow + ' authors'
        );
        const offset = params.startRow;
        const limit = params.endRow - params.startRow;
        const authorsPage = await loadAuthorPage(offset, limit);

        // if on or after the last page, work out the last row.
        let lastRow = -1;
        if (authorsPage.length === 0) {
          lastRow = authorsLoadedCount;
        }
        // call the success callback
        params.successCallback(authorsPage, lastRow);
        authorsLoadedCount += authorsPage.length;
      },
    };

    new AgGrid(gridDiv, agGridAuthorsOptions);

    agGridAuthorsOptions.api.setDatasource(dataSource);
  }, []);

  const [isCreateAuthorDialogOpen, setIsCreateAuthorDialogOpen] =
    useState(false);

  const handleAddAuthorClick = () => {
    setIsCreateAuthorDialogOpen(true);
  };
  const handleDeleteAuthorClick = async () => {
    const selectedRows = agGridAuthorsOptions.api.getSelectedRows();

    if (selectedRows.length === 0) {
      window.alert('Please select row');
      return;
    }

    const selectedAuthor = selectedRows[0];
    const confirmed = window.confirm(`Delete ${selectedAuthor.name}?`);
    if (confirmed) {
      await deleteAuthor(selectedAuthor.id);
      window.location.reload();
    }
  };
  const [isUpdateAuthorDialogOpen, setIsUpdateAuthorDialogOpen] =
    useState(false);
  const [authorToEdit, setAuthorToEdit] = useState(null);

  const handleUpdateAuthorClick = async () => {
    const selectedRows = agGridAuthorsOptions.api.getSelectedRows();

    if (selectedRows.length === 0) {
      window.alert('Please select row');
      return;
    }

    const selectedAuthor = selectedRows[0];
    setIsUpdateAuthorDialogOpen(true);
    setAuthorToEdit(selectedAuthor);
  };
  return (
    <>
      <CreateAuthorsDialog
        isCreateAuthorDialogOpen={isCreateAuthorDialogOpen}
        setIsCreateAuthorDialogOpen={setIsCreateAuthorDialogOpen}
      />
      <UpdateAuthorsDialog
        isUpdateAuthorDialogOpen={isUpdateAuthorDialogOpen}
        setIsUpdateAuthorDialogOpen={setIsUpdateAuthorDialogOpen}
        authorToUpdate={authorToEdit}
      />
      <Grid item xs={12}>
        <div style={{display: 'flex', gap: '10px', marginBottom: '5px'}}>
          <MDButton
            variant='gradient'
            color='info'
            onClick={handleAddAuthorClick}
          >
            <Icon sx={{fontWeight: 'bold'}}>add</Icon>
            &nbsp;add new author
          </MDButton>

          <MDButton
            variant='gradient'
            color='warning'
            onClick={handleUpdateAuthorClick}
          >
            <Icon sx={{fontWeight: 'bold'}}>update</Icon>
            &nbsp;change new author
          </MDButton>

          <MDButton
            variant='gradient'
            color='dark'
            onClick={handleDeleteAuthorClick}
          >
            <Icon sx={{fontWeight: 'bold'}}>delete</Icon>
            &nbsp;delete author
          </MDButton>
        </div>
        <Card>
          <MDBox pt={3}></MDBox>
          <MDBox
            mx={2}
            mt={0}
            py={3}
            px={2}
            variant='gradient'
            bgColor='info'
            borderRadius='lg'
            coloredShadow='info'
          >
            <MDTypography variant='h6' color='white'>
              Authors
              <div
                id='authorsGrid'
                style={{
                  height: '200px',
                  width: '100%',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}
                className='ag-theme-alpine'
              ></div>
            </MDTypography>
          </MDBox>
        </Card>
      </Grid>
    </>
  );
}
