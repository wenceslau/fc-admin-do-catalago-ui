import {Box, Button, IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectCategories} from "./categorySlice";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
    GridToolbar
} from "@mui/x-data-grid";

export const CategoryList = () => {

    const categories = useAppSelector(selectCategories);
    console.log(categories);

    //create from catgories
    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString("pt-BR")
    }));

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 1},
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'description', headerName: 'Description', flex: 1},
        {
            field: 'isActive', headerName: 'Active', flex: 1, type: 'boolean',
            renderCell: renderIsActiveCell,
        },
        {field: 'createdAt', headerName: 'Created At', flex: 1},
        {
            field: 'actions', headerName: 'Actions', flex: 1,
            renderCell: renderActionsCell
        }
    ];

    function renderActionsCell(row: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => {
                    console.log(row.id)
                }}
                aria-label="Delete"
            >
                <DeleteIcon/>
            </IconButton>
        )
    }

    function renderIsActiveCell(row: GridRenderCellParams) {
        return (
            <Typography color={row.value ? 'primary' : 'error'}>
                {row.value ? 'Active' : 'Inactive'}
            </Typography>
        )
    }

    return (
        <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Box display={"flex"} justifyContent={"flex-end"}>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{marginBottom: "1rem"}}
                >
                    New Category
                </Button>

            </Box>
            <div style={{height: 300, width: '100%'}}>
                <DataGrid
                    components={{Toolbar: GridToolbar}}
                    rowsPerPageOptions={[4, 10, 20]}
                    disableColumnSelector={true}
                    disableColumnFilter={true}
                    disableDensitySelector={true}
                    // checkboxSelection={true}
                    disableSelectionOnClick={true}

                    pageSize={3}
                    rows={rows}
                    columns={columns}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: {debounceMs: 500}
                        }
                    }}
                />
            </div>
        </Box>
    )
}