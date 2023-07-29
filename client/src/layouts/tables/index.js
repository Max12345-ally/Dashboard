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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { loadAuthors } from "./data/loadAuthors";
import { loadTutorials } from "./data/loadTutorials";
import { Grid as AgGrid } from 'ag-grid-community';

import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CreateAuthorsDialog from "./CreateAuthorDialog"
import CreateTutorialsDialog from "./CreateTutorialDialog"

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useCallback, useEffect,useState } from "react";
import { deleteAuthor } from "./data/deleteAuthor";
import { deleteTutorial } from "./data/deleteTutorial";

const agGridAuthorsOptions = {
  columnDefs: [
    { headerName: 'id', field: 'id' },
    { headerName: 'name', field: 'name' },
    { headerName: 'salary', field: 'salary' },
    { headerName: 'starsCount', field: 'starsCount' },
    { headerName: 'birthDate', field: 'birthDate' }
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
  maxBlocksInCache: 5//10

}



function onAuthorsSelectionChanged() {
  const selectedRows = agGridAuthorsOptions.api.getSelectedRows();
}

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const initAuthorsTable = useCallback(async () => {
    const authors = await loadAuthors();
    const gridDiv = document.querySelector('#authorsGrid');
    //agGridAuthorsOptions.rowData = authors
    const dataSource = {
      rowCount: undefined, // behave as infinite scroll

      getRows: (params) => {
        console.log('asking for ' + params.startRow + ' to ' + params.endRow);

        // At this point in your code, you would call the server.
        // To make the demo look real, wait for 500ms before returning
        setTimeout(function () {
          // take a slice of the total rows
          const rowsThisPage = authors.slice(params.startRow, params.endRow);
          // if on or after the last page, work out the last row.
          let lastRow = -1;
          if (authors.length <= params.endRow) {
            lastRow = authors.length;
          }
          // call the success callback
          params.successCallback(rowsThisPage, lastRow);
        }, 500);
      },
    };

    new AgGrid(gridDiv, agGridAuthorsOptions); 

    agGridAuthorsOptions.api.setDatasource(dataSource);



}, []);

const agGridTutorialsOptions = {
  columnDefs: [
    { headerName: 'price', field: 'price' },
    { headerName: 'pageCount', field: 'pageCount' },
    { headerName: 'title', field: 'title' },
    { headerName: 'description', field: 'description' },
    { headerName: 'publishedDate', field: 'publishedDate' }
  ],
  rowSelection: 'single',
  onSelectionChanged: onAuthorsSelectionChanged
}

function onTutorialsSelectionChanged() {
  const selectedRows = agGridTutorialsOptions.api.getSelectedRows();
}

const initTutorialsTable = useCallback(async () => {
  
  const tutorials = await loadTutorials();
  const eGridDiv = document.querySelector('#tutorialsGrid');
  agGridTutorialsOptions.rowData = tutorials
 new AgGrid(eGridDiv, agGridTutorialsOptions);
 
 
}, []);

  useEffect(() => {
    initAuthorsTable();
    initTutorialsTable();
  }, []);

  const [isCreateAuthorDialogOpen, setIsCreateAuthorDialogOpen] = useState(false);

  const handleAddAuthorClick = () => {
    setIsCreateAuthorDialogOpen(true);
  };

  const [isCreateTutorialDialogOpen, setIsCreateTutorialDialogOpen] = useState(false);

  const handleAddTutorialClick = () => {
    setIsCreateTutorialDialogOpen(true);
  };

  

  const handleDeleteAuthorClick = async() => {

    const selectedRows = agGridAuthorsOptions.api.getSelectedRows();

    if (selectedRows.length === 0){
      window.alert("Please select row")
      return;
    } 

    const selectedAuthor = selectedRows[0]
    const confirmed = window.confirm(`Delete ${selectedAuthor.name}?`)
    if(confirmed){
      await deleteAuthor(selectedAuthor.id)
      window.location.reload()
    }
      

  };

  const handleDeleteTutorialClick = () => {
    const selectedRows = agGridTutorialsOptions.api.getSelectedRows();
    const selectedTutorial = selectedRows[0]
    const confirmed = window.confirm(`Delete ${selectedTutorial.name}?`)
    if(confirmed){
      deleteAuthor(selectedTutorial.id)
    }

  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
          <MDBox pt={1} pb={3}>
            <div display="flex" justify-content="space-between">      
            <MDButton variant="gradient" color="info" onClick={handleAddAuthorClick}>
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;add new author
            </MDButton>

          <MDButton variant="gradient" color="warning">
          <Icon sx={{ fontWeight: "bold" }}>update</Icon>
          &nbsp;change new author
          </MDButton>

          <MDButton variant="gradient" color="dark" onClick={handleDeleteAuthorClick}>
          <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
          &nbsp;delete author
          </MDButton>
          </div>
        <CreateAuthorsDialog isCreateAuthorDialogOpen={isCreateAuthorDialogOpen} setIsCreateAuthorDialogOpen={setIsCreateAuthorDialogOpen} />
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                  
              </MDBox>
              <MDBox
                mx={2}
                mt={0}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                Authors
                <div id="authorsGrid" style={{height: "200px", width: "100%", borderRadius: "10px", overflow: "hidden"}} className="ag-theme-alpine"></div>
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>

         
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
              <MDButton variant="gradient" color="dark" onClick={handleAddTutorialClick}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add new tutorial
              </MDButton>
              <MDButton variant="gradient" color="dark" onClick={handleDeleteTutorialClick}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;delete tutorial
              </MDButton>
              <CreateTutorialsDialog isCreateTutorialDialogOpen={isCreateTutorialDialogOpen} setIsCreateTutorialDialogOpen={setIsCreateTutorialDialogOpen} />
              </MDBox>
              <MDBox
                mx={2}
                mt={0}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Tutorials
                <div id="tutorialsGrid" style={{height: "400px", width: "100%", borderRadius: "10px", overflow: "hidden"}} className="ag-theme-alpine"></div>
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
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Team Members
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
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
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
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
