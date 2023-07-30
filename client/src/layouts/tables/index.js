/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import {loadTutorials} from './data/loadTutorials';
import {Grid as AgGrid} from 'ag-grid-community';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

import CreateTutorialsDialog from './CreateTutorialDialog';
import {Authors} from './Authors/Authors';
// Data

import projectsTableData from 'layouts/tables/data/projectsTableData';

import {deleteTutorial} from './data/deleteTutorial';
import {useCallback, useEffect, useState} from 'react';

function Tables() {
  const {columns: pColumns, rows: pRows} = projectsTableData();

  const agGridTutorialsOptions = {
    columnDefs: [
      {headerName: 'price', field: 'price'},
      {headerName: 'pageCount', field: 'pageCount'},
      {headerName: 'title', field: 'title'},
      {headerName: 'description', field: 'description'},
      {headerName: 'publishedDate', field: 'publishedDate'},
    ],
    rowSelection: 'single',
    // onSelectionChanged: onAuthorsSelectionChanged,
  };

  function onTutorialsSelectionChanged() {
    const selectedRows = agGridTutorialsOptions.api.getSelectedRows();
  }

  const initTutorialsTable = useCallback(async () => {
    const tutorials = await loadTutorials();
    const eGridDiv = document.querySelector('#tutorialsGrid');
    agGridTutorialsOptions.rowData = tutorials;
    new AgGrid(eGridDiv, agGridTutorialsOptions);
  }, []);

  useEffect(() => {
    initTutorialsTable();
  }, []);

  const [isCreateTutorialDialogOpen, setIsCreateTutorialDialogOpen] =
    useState(false);

  const handleAddTutorialClick = () => {
    setIsCreateTutorialDialogOpen(true);
  };

  const handleDeleteTutorialClick = () => {
    const selectedRows = agGridTutorialsOptions.api.getSelectedRows();
    const selectedTutorial = selectedRows[0];
    const confirmed = window.confirm(`Delete ${selectedTutorial.name}?`);
    if (confirmed) {
      //deleteAuthor(selectedTutorial.id);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={1} pb={3}>
        <Grid container spacing={6}>
          <Authors />
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <MDButton
                  variant='gradient'
                  color='dark'
                  onClick={handleAddTutorialClick}
                >
                  <Icon sx={{fontWeight: 'bold'}}>add</Icon>
                  &nbsp;add new tutorial
                </MDButton>
                <MDButton
                  variant='gradient'
                  color='dark'
                  onClick={handleDeleteTutorialClick}
                >
                  <Icon sx={{fontWeight: 'bold'}}>add</Icon>
                  &nbsp;delete tutorial
                </MDButton>
                <CreateTutorialsDialog
                  isCreateTutorialDialogOpen={isCreateTutorialDialogOpen}
                  setIsCreateTutorialDialogOpen={setIsCreateTutorialDialogOpen}
                />
              </MDBox>
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
                      height: '400px',
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

          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant='gradient'
                bgColor='info'
                borderRadius='lg'
                coloredShadow='info'
              >
                <MDTypography variant='h6' color='white'>
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{columns: pColumns, rows: pRows}}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
