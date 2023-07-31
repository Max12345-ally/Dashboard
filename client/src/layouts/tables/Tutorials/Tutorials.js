import {Grid as AgGrid} from 'ag-grid-community';
import {UpdateTutorialDialog} from './UpdateTutorialDialog';
import {CreateTutorialDialog} from './CreateTutorialDialog';
import {deleteTutorial} from './api/deleteTutorial';
import {loadTutorialPage} from './api/loadTutorialPage';
import {useCallback, useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';

let tutorialsLoadedCount = 0;

const agGridTutorialsOptions = {
  columnDefs: [
    {headerName: 'price', field: 'price'},
    {headerName: 'pageCount', field: 'pageCount'},
    {headerName: 'title', field: 'title'},
    {headerName: 'description', field: 'description'},
    {headerName: 'publishedDate', field: 'publishedDate'},
  ],
  rowBuffer: 0,
  rowSelection: 'single',
  // onSelectionChanged: onAuthorsSelectionChanged,
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

export function Tutorials() {
  useEffect(() => {
    initTutorialsTable();
  }, []);

  const initTutorialsTable = useCallback(async () => {
    //const authors = await loadAuthors();
    const gridDiv = document.querySelector('#tutorialsGrid');
    //agGridAuthorsOptions.rowData = authors
    const dataSource = {
      rowCount: undefined, // behave as infinite scroll

      getRows: async (params) => {
        console.log(
          'asking for ' +
            params.startRow +
            ' to ' +
            params.endRow +
            ' tutorials'
        );
        const offset = params.startRow;
        const limit = params.endRow - params.startRow;
        const tutorialsPage = await loadTutorialPage(offset, limit);

        // if on or after the last page, work out the last row.
        let lastRow = -1;
        if (tutorialsPage.length === 0) {
          lastRow = tutorialsLoadedCount;
        }
        // call the success callback
        params.successCallback(tutorialsPage, lastRow);
        tutorialsLoadedCount += tutorialsPage.length;
      },
    };

    new AgGrid(gridDiv, agGridTutorialsOptions);

    agGridTutorialsOptions.api.setDatasource(dataSource);
  }, []);

  const [isCreateTutorialDialogOpen, setIsCreateTutorialDialogOpen] =
    useState(false);

  const handleAddTutorialClick = () => {
    setIsCreateTutorialDialogOpen(true);
  };
  const handleDeleteTutorialClick = async () => {
    const selectedRows = agGridTutorialsOptions.api.getSelectedRows();

    if (selectedRows.length === 0) {
      window.alert('Please select row');
      return;
    }

    const selectedTutorial = selectedRows[0];
    const confirmed = window.confirm(`Delete ${selectedTutorial.title}?`);
    if (confirmed) {
      await deleteTutorial(selectedTutorial.id);
      window.location.reload();
    }
  };
  const [isUpdateTutorialDialogOpen, setIsUpdateTutorialDialogOpen] =
    useState(false);
  const [tutorialToEdit, setTutorialToEdit] = useState(null);

  const handleUpdateTutorialClick = async () => {
    const selectedRows = agGridTutorialsOptions.api.getSelectedRows();

    if (selectedRows.length === 0) {
      window.alert('Please select row');
      return;
    }

    const selectedAuthor = selectedRows[0];
    setIsUpdateTutorialDialogOpen(true);
    setTutorialToEdit(selectedAuthor);
  };
  return (
    <>
      <CreateTutorialDialog
        isCreateTutorialDialogOpen={isCreateTutorialDialogOpen}
        setIsCreateTutorialDialogOpen={setIsCreateTutorialDialogOpen}
      />
      <UpdateTutorialDialog
        isUpdateTutorialDialogOpen={isUpdateTutorialDialogOpen}
        setIsUpdateTutorialDialogOpen={setIsUpdateTutorialDialogOpen}
        tutorialToUpdate={tutorialToEdit}
      />
      <Grid item xs={12}>
        <div style={{display: 'flex', gap: '10px', marginBottom: '5px'}}>
          <MDButton
            variant='gradient'
            color='info'
            onClick={handleAddTutorialClick}
          >
            <Icon sx={{fontWeight: 'bold'}}>add</Icon>
            &nbsp;Добавить запись
          </MDButton>

          <MDButton
            variant='gradient'
            color='warning'
            onClick={handleUpdateTutorialClick}
          >
            <Icon sx={{fontWeight: 'bold'}}>update</Icon>
            &nbsp; Изменить
          </MDButton>

          <MDButton
            variant='gradient'
            color='dark'
            onClick={handleDeleteTutorialClick}
          >
            <Icon sx={{fontWeight: 'bold'}}>delete</Icon>
            &nbsp; Удалить
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
              Tutorials
              <div
                id='tutorialsGrid'
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
