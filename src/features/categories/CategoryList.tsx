import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectCategories} from "./categorySlice";
import {DataGrid, GridRowsProp, GridColDef} from "@mui/x-data-grid";

export const CategoryList = () => {

    const categories = useAppSelector(selectCategories);
    console.log(categories);

    //create from catgories
    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: category.created_at
    }));

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 1},
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'description', headerName: 'Description', flex: 1},
        {
            field: 'is_active', headerName: 'Active', flex: 1, type: 'boolean',
            renderCell: (row) => {
                return row.value ? 'Active' : 'Inactive'
            }
        }
    ];

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
                    pageSize={3}
                    rowsPerPageOptions={[4, 10, 20]}
                    rows={rows} columns={columns}/>
            </div>
        </Box>
    )
}