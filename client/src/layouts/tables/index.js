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

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useCallback, useEffect,useState } from "react";
import { deleteAuthor } from "./data/deleteAuthor";

const agGridOptions = {
  columnDefs: [
    { headerName: 'id', field: 'id' },
    { headerName: 'name', field: 'name' },
    { headerName: 'salary', field: 'salary' },
    { headerName: 'starsCount', field: 'starsCount' },
    { headerName: 'birthDate', field: 'birthDate' }
  ],
  rowSelection: 'single',
  onSelectionChanged: onSelectionChanged


}
function onSelectionChanged() {
  const selectedRows = agGridOptions.api.getSelectedRows();

  console.log(selectedRows)
}
function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  

  const initTable = useCallback(async () => {
    const authors = await loadAuthors();
    // const tutorials = await loadTutorials();
    var eGridDiv = document.querySelector('#myGrid');
    agGridOptions.rowData = authors
   new AgGrid(eGridDiv, agGridOptions);
   
   
}, []);

  useEffect(() => {
    initTable();
    
  }, []);


  const [isCreateAuthorDialogOpen, setIsCreateAuthorDialogOpen] = useState(false);

  const handleAddAuthorClick = () => {
    setIsCreateAuthorDialogOpen(true);
  };

  const handleDeleteAuthorClick = () => {
    const selectedRows = agGridOptions.api.getSelectedRows();
    const selectedAuthor = selectedRows[0]
    const confirmed = window.confirm(`Delete ${selectedAuthor.name}?`)
    if(confirmed){
      deleteAuthor(selectedAuthor.id)
    }
  };

  

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox pt={1} pb={3}>
          <div display="flex" justify-content="space-between">      
          <MDButton variant="gradient" color="dark" onClick={handleAddAuthorClick}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new author
          </MDButton>

          <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;change new author
          </MDButton>

          <MDButton variant="gradient" color="dark" onClick={handleDeleteAuthorClick}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
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
                <div id="myGrid" style={{height: "400px", width: "100%", borderRadius: "10px", overflow: "hidden"}} className="ag-theme-alpine"></div>
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>

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
                  Tutorials
                <div id="myGrid" style={{height: "400px", width: "100%", borderRadius: "10px", overflow: "hidden"}} className="ag-theme-alpine"></div>
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
