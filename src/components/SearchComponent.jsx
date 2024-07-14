
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
      borderBottom: '2px solid black',
    },
    '&:hover fieldset': {
      borderBottom: '2px solid orange',
    },
    '&.Mui-focused fieldset': {
      borderBottom: '2px solid orange',
    },
  },
});

const SearchComponent = ({ onFiltersChange }) => {
  const [searchString, setSearchString] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchString(value);

    const filters = { nameFilter: '', minAmountFilter: '' };

    // Regex to detect non-numeric strings (names) and numbers (amounts)
    const parts = value.match(/([0-9]+(\.[0-9]+)?)|([^0-9]+)/g);
    if (parts) {
      parts.forEach(part => {
        const trimmedPart = part.trim();
        if (!isNaN(trimmedPart) && trimmedPart !== '') {
          filters.minAmountFilter = trimmedPart;
        } else {
          filters.nameFilter += ` ${trimmedPart}`;
        }
      });
    }

    filters.nameFilter = filters.nameFilter.trim();

    console.log('Search String:', value);
    console.log('Parsed Filters:', filters);

    onFiltersChange(filters);
  };

  return (
      
    <Grid
                    container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={12} sm={8} md={6}></Grid>
      <CustomTextField
        variant="outlined"
        value={searchString}
        onChange={handleSearchChange}
        placeholder=" You Can Search by Customer Name, Amount"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          style: {
            padding: '10px 0',
            fontSize: '16px',
          },
        }}
        sx={{
          width: '400px',
          margin: '20px 0',
        }}
      />
    </Grid>
  );
};

export default SearchComponent;
