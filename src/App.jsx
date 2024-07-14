import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import CustomerTableSearch from './components/CustomerTableSearch.jsx';
import SearchComponent from './components/SearchComponent.jsx';
import CustomerModal from './components/CustomerModal.jsx';
import TransactionGraph from './components/TransactionGraph.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

const MainContainer = styled(Box)({
  backgroundColor: '#f0f0f0',
  minHeight: '100vh',
  padding: '20px',
});

const ContentContainer = styled(Paper)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const App = () => {
  const [filters, setFilters] = useState({ nameFilter: '', minAmountFilter: '' });
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [open, setOpen] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [data, setData] = useState({ customers: [], transactions: [] });
  const [loading, setLoading] = useState(true); // Initially set loading to true

  const graphRef = useRef(null);

  useEffect(() => {
    setLoading(true); // Start loading when component mounts

    Promise.all([
      axios.get('https://islamic-backend-3.onrender.com/api/track/customers'),
      axios.get('https://islamic-backend-3.onrender.com/api/track/transactions')
    ])
      .then(([customersResponse, transactionsResponse]) => {
        setData({
          customers: customersResponse.data,
          transactions: transactionsResponse.data
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []); 

  const handleCustomerSelect = (id) => {
    setSelectedCustomer(id);
    setShowGraph(true);
    setTimeout(() => {
      if (graphRef.current) {
        graphRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const filteredTransactions = data.transactions.filter(
    (transaction) => transaction.customer_id === selectedCustomer
  );

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
      {loading ? <LoadingSpinner /> : (
        <MainContainer>
          <h1>Customer Management System</h1>
          <ContentContainer>
            <SearchComponent onFiltersChange={setFilters} />
            <CustomerTableSearch
              filters={filters}
              data={data}
              onEdit={() => {}}
              onDelete={() => {}}
              onSelect={handleCustomerSelect}
            />
            <>
              <CustomerModal
                open={open}
                onClose={() => setOpen(false)}
                customerName={customerName}
                setCustomerName={setCustomerName}
                onSave={() => {}}
              />
              {showGraph && selectedCustomer && (
                <div style={{ paddingTop: '8%' }} ref={graphRef}>
                  <TransactionGraph transactions={filteredTransactions} />
                </div>
              )}
            </>
          </ContentContainer>
        </MainContainer>
      )}
 </Grid>
  );
};

export default App;
