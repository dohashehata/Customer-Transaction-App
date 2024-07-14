import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, styled, Typography, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Grade } from '@mui/icons-material';

const CustomTable = styled(Table)({
  width: '98%',
  margin: '10px auto',
  backgroundColor: '#f5f5f5',
});

const CustomTableCell = styled(TableCell)({
  padding: '10px',
  borderBottom: '2px solid #ccc',
});

const CustomIconButton = styled(IconButton)({
  color: '#07012b',
  '&:hover': {
    color: '#ff5722',
  },
});

const CustomTableHead = styled(TableHead)({
  backgroundColor: ' #ff7b00',
  color: '#fff',
});

const CustomerTableSearch = ({ filters, onEdit, onDelete, onSelect, data }) => {
  const filterData = () => {
    if (!data || !data.transactions || !data.customers) return [];

    const { nameFilter, minAmountFilter } = filters;

    return data.transactions.map(transaction => {
      const customer = data.customers.find(customer => customer.id === transaction.customer_id);
      return {
        ...transaction,
        customerName: customer ? customer.name : ''
      };
    }).filter(transaction => {
      const nameMatch = nameFilter ? transaction.customerName.toLowerCase().includes(nameFilter.toLowerCase()) : true;
      const amountMatch = minAmountFilter ? transaction.amount >= parseFloat(minAmountFilter) : true;

      return nameMatch && amountMatch;
    });
  };

  const filteredData = filterData();
  const cellStyle = { backgroundColor: '#e2d0f1' }

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={6}>
        {filteredData.length === 0 ? (
          <Typography variant="h6" align="center" style={{ margin: '20px 0', color: 'black' }}>
            No Name or transactions match your search criteria.
          </Typography>
        ) : (
          <CustomTable>
            <CustomTableHead>
              <TableRow>
                <TableCell style={cellStyle}>ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell style={cellStyle}>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell style={cellStyle}>Customer ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </CustomTableHead>
            <TableBody>
              {(() => {
                const displayedCustomerIds = new Set();
                return filteredData.map((data) => {
                  const isFirstOccurrence = !displayedCustomerIds.has(data.customer_id);
                  displayedCustomerIds.add(data.customer_id);

                  return (
                    <TableRow key={data.id}>
                      <CustomTableCell>{data.id}</CustomTableCell>
                      <CustomTableCell style={cellStyle}>{data.customerName}</CustomTableCell>
                      <CustomTableCell>{data.date}</CustomTableCell>
                      <CustomTableCell style={cellStyle}>{data.amount}</CustomTableCell>
                      <CustomTableCell>{data.customer_id}</CustomTableCell>
                      <CustomTableCell style={cellStyle}>
                        <CustomIconButton onClick={() => onEdit(data)}>
                          <EditIcon />
                        </CustomIconButton>
                        <CustomIconButton onClick={() => onDelete(data.id)}>
                          <DeleteIcon />
                        </CustomIconButton>
                        <CustomIconButton onClick={() => onSelect(data.customer_id)} aria-label="view graph">
                          <ShowChartIcon />
                        </CustomIconButton>
                      </CustomTableCell>
                    </TableRow>
                  );
                });
              })()}
            </TableBody>
          </CustomTable>
        )}
      </Grid>
      <Grade />
    </Grid>
  );
};

export default CustomerTableSearch;
