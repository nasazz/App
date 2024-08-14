import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import Header from '../../Components/Header';
import { getBlockedStockData } from '../../Services/BlockedStockService';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [blockedStockData, setBlockedStockData] = useState([]);

  useEffect(() => {
    // Fetch blocked stock data when the component mounts
    const fetchBlockedStockData = async () => {
      try {
        const data = await getBlockedStockData();
        setBlockedStockData(data);
      } catch (error) {
        console.error('Error fetching blocked stock data:', error);
      }
    };

    fetchBlockedStockData();
  }, []);

  const columns = [
    { field: 'blockedStockID', headerName: 'BlockedStockID', flex: 0.5 },
    { field: 'pnPlant', headerName: 'PnPlant', flex: 1 },
    { field: 'team', headerName: 'Team', flex: 1 },
    { field: 'blockedSinceDays', headerName: 'BlockedSinceDays', type: 'number', flex: 1 },
    { field: 'componentOrFG', headerName: 'ComponentOrFG', flex: 1 },
    { field: 'tradeInterco', headerName: 'TradeInterco', flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="BLOCKED STOCK" subtitle="List of The Blocked Stock" />
      <Box m="40px 0 0 0" height="75vh" sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.blueAccent[700],
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: colors.primary[400],
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: colors.blueAccent[700],
        },
        '& .MuiCheckbox-root': {
          color: `${colors.greenAccent[200]} !important`,
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `${colors.grey[100]} !important`,
        },
      }}>
        <DataGrid
          rows={blockedStockData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.blockedStockID}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
