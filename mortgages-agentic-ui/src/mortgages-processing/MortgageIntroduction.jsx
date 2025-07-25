import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, TextField, InputAdornment, Radio, RadioGroup, FormControlLabel, Button, Link } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { useLocation, useNavigate } from 'react-router-dom';
import {List, ListItem, ListItemText } from '@mui/material';

const DEPOSIT_STATUS = [
  "My deposit is ready",
  "Someone in my family is gifting it",
  "It's coming from the sale of a property",
  "I'm still saving",
  "I haven't started saving"
];
const COLORS = ['#1dc187', '#111'];

const MortgageIntroduction = () => {

const [depositError, setDepositError] = useState('');
    
    const handleDepositChange = (e) => {
    console.log("Called func");
  const value = e.target.value.replace(/[^\d]/g, ''); // allow only numbers
  setDeposit(value);

  // Calculate deposit percentage immediately
  const propValueNum = Number(propertyValue);
  const depositNum = Number(value);
  const percent = propValueNum && depositNum ? (depositNum / propValueNum) * 100 : 0;

  // Validate
  if (percent > 15) {
    console.log(percent)
    setDepositError('Deposit percentage cannot be greater than 15%. Please enter a lower deposit amount.');
  } else {
    setDepositError('');
  }
};


  const navigate = useNavigate();
  const { state: previousData } = useLocation();

  const [applicants, setApplicants] = useState('justMe');
  const [propertyValue, setPropertyValue] = useState('');
  const [deposit, setDeposit] = useState('');
  const [depositStatus, setDepositStatus] = useState('');

  // Only allow numbers
  const handleNumberInput = setter => e => setter(e.target.value.replace(/\D/g, ''));

  // Parse and calculate
  const propValueNum = Number(propertyValue) || 0;
  const depositNum = Number(deposit) || 0;
  const depositPercentage = propValueNum ? Math.round((depositNum / propValueNum) * 1000) / 10 : 0;
  const ltv = propValueNum ? Math.round((1 - (depositNum / propValueNum)) * 1000) / 10 : 0;
  const totalLoan = propValueNum - depositNum;

  // Donut chart data
  const pieData = [
    { name: 'Deposit', value: depositPercentage },
    { name: 'Loan', value: 100 - depositPercentage }
  ];

  // Continue button disabled unless all required data is filled & deposit < property value
  const canContinue = (
    applicants &&
    propValueNum > 0 &&
    depositNum > 0 &&
    depositNum < propValueNum &&
    depositStatus
  );


  const handleContinue = () => {
    console.log(previousData)
    const allData = {
      ...previousData,
      applicants,
      propertyValue: propValueNum,
      deposit: depositNum,
      depositStatus,
      depositPercentage,
      ltv,
      totalLoan
    };
    // Send to backend or navigate further as you wish
    console.log('Merged form data:', allData);
    navigate('/apifinal', { state: allData });
  };

  const eightyFivePercent = propValueNum > 0 ? propValueNum * 0.85 : 0;
    const formatted85 = eightyFivePercent.toLocaleString('en-UK', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
    });


  return (
    <Box
      sx={{
        bgcolor: '#f6f6f6',
        minHeight: '100vh',
        width: '100%',
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      {/* Intro info */}
      <Paper
        variant="outlined"
        sx={{
          bgcolor: '#f5f6fa',
          borderColor: '#89a8e7',
          borderWidth: 1,
          borderStyle: 'solid',
          px: 3,
          py: 2,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          width: { xs: '100%', md: 750 },
          color: '#111',
          fontSize: 19,
          lineHeight: 1.6,
        }}
      >
        <InfoOutlinedIcon sx={{ color: '#3271c5', fontSize: 32, mr: 2, mt: 0.5 }} />
        <span>
          You’ll be able to change this later if you need to, by speaking to one of our Mortgage Advisers.
        </span>
      </Paper>

      {/* Applicants radio */}
      <Typography sx={{ fontWeight: 700, color: '#111', fontSize: 22, mb: 1 }}>
        How many people will be applying for the mortgage?
      </Typography>
      <RadioGroup
        row
        value={applicants}
        onChange={e => setApplicants(e.target.value)}
        sx={{ mb: 4, ml: 1 }}
      >
        <FormControlLabel
          value="justMe"
          control={<Radio sx={{
            color: '#111',
            '&.Mui-checked': { color: '#111' },
            fontSize: 26
          }}/>}
          label={<Typography sx={{ fontSize: 21, color: '#111', fontWeight: 500 }}>Just me</Typography>}
        />
        <FormControlLabel
          value="meAndSomeoneElse"
          control={<Radio sx={{
            color: '#111',
            '&.Mui-checked': { color: '#111' },
            fontSize: 26
          }}/>}
          label={<Typography sx={{ fontSize: 21, color: '#111', fontWeight: 500 }}>Me and someone else</Typography>}
        />
      </RadioGroup>

      {/* Section title */}
      <Typography variant="h4" sx={{
        fontWeight: 700,
        fontFamily: '"Merriweather", serif',
        color: '#111',
        fontSize: 28,
        mb: 2,
      }}>
        Tell us about the property you’re thinking of buying
      </Typography>

      {/* Property value */}
      <Typography sx={{ fontWeight: 700, color: '#111', fontSize: 20, mb: 1 }}>
        Property value
      </Typography>
      <Typography sx={{ color: '#222', fontSize: 18, mb: 2 }}>
        This doesn’t need to be the exact amount right now.
      </Typography>
      <TextField
        value={propertyValue}
        onChange={handleNumberInput(setPropertyValue)}
        placeholder="£"
        sx={{
          mb: 3,
          background: '#fff',
          borderRadius: 2,
          width: 450,
          '& .MuiInputBase-input': { fontSize: 24, fontWeight: 500 },
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start" sx={{ fontSize: 24, pl: 2 }}>£</InputAdornment>
        }}
      />

      {/* Deposit */}
      <Typography sx={{ fontWeight: 700, color: '#111', fontSize: 20, mb: 1 }}>
        Deposit
      </Typography>
      <Typography sx={{ color: '#222', fontSize: 18, mb: 2 }}>
        Tell us roughly how much your deposit will be.
      </Typography>
      <TextField
        value={deposit}
        onChange={handleDepositChange}
        placeholder="£"
        sx={{
          mb: 3,
          background: '#fff',
          borderRadius: 2,
          width: 450,
          '& .MuiInputBase-input': { fontSize: 24, fontWeight: 500 },
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start" sx={{ fontSize: 24, pl: 2 }}>£</InputAdornment>
        }}
      />

      {Number(depositPercentage) > 15 && (
  <Paper
    elevation={0}
    sx={{
      mt: 4,
      bgcolor: '#f7faff',
      borderRadius: 3,
      border: '1px solid #57a3e0',
      px: 5,
      py: 3,
      width: 720,
      maxWidth: '100%',
      color: '#111',
      mb: 2
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <InfoOutlinedIcon sx={{ fontSize: 32, color: '#256edb', mr: 2, mt: '3px' }} />
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 1.5 }}>
          Your deposit is more than 15% of the property value.
        </Typography>
        <Typography sx={{ fontWeight: 500, mb: 1 }}>
          Please enter a lower deposit amount so your deposit is no more than 15% of the property value to continue.
        </Typography>
        {/* Optionally add bullet points or extra instructions here */}
        <List sx={{ pl: 2, mb: 1 }}>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <ListItemText
              primary={
                <Typography component="span" sx={{ fontWeight: 500 }}>
                  Borrow less than <b>{formatted85}</b>.
                </Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <ListItemText
              primary={
                <Typography component="span" sx={{ fontWeight: 500 }}>
                  Buy a property which <b>isn't</b> a new build flat.
                </Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <ListItemText
              primary={
                <Typography component="span" sx={{ fontWeight: 500 }}>
                  Pass our credit and affordability checks.
                </Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0 }}>
            <ListItemText
              primary={
                <Typography component="span" sx={{ fontWeight: 500 }}>
                  Not own a share in any other properties.
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Typography sx={{ mt: 2, fontWeight: 700 }}>
          You could be at greater risk of negative equity if your mortgage is more than 85% of your property valuation
        </Typography>
        <Typography sx={{ mt: 1 }}>
          If you only have a small amount of equity in your property, there might be an increased risk of negative equity if house prices fall.
          Negative equity is where your property is worth less than your mortgage. If this happens, it will be difficult to remortgage or move house in the future.
        </Typography>
      </Box>
    </Box>
  </Paper>
)}


      {/* Calculated values + Donut chart */}
      {(propValueNum && depositNum && propValueNum > depositNum) && (
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            bgcolor: '#e8f6ff',
            borderRadius: 4,
            px: 5,
            py: 3,
            width: 720,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Typography sx={{ fontWeight: 500, fontSize: 20, flex: 1 }}>Deposit percentage</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{depositPercentage}%</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', mb: 2, mt: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500, fontSize: 20 }}>Loan to value (LTV)</Typography>
                <Link sx={{ color: '#111', fontWeight: 500, fontSize: 17 }}>What is LTV?</Link>
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{ltv}%</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', mt: 2 }}>
              <Typography sx={{ fontWeight: 500, fontSize: 20, flex: 1 }}>Total loan amount</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
                £{totalLoan > 0 ? totalLoan.toLocaleString() : 0}
              </Typography>
            </Box>
          </Box>
          {/* Chart */}
          <Box sx={{ minWidth: 150 }}>
            <PieChart width={120} height={120}>
              <Pie
                data={pieData}
                cx={60}
                cy={60}
                innerRadius={40}
                outerRadius={56}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
                <Label
                  value={`${ltv}%`}
                  position="center"
                  style={{ fontSize: 22, fontWeight: 700, fill: '#111' }}
                />
              </Pie>
            </PieChart>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#1dc187', borderRadius: '50%', mr: 0.5 }} />
                <Typography sx={{ fontSize: 15, color: '#111' }}>Deposit</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#111', borderRadius: '50%', mr: 0.5 }} />
                <Typography sx={{ fontSize: 15, color: '#111' }}>Loan</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Deposit status radio */}
      <Box sx={{ mt: 5, mb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 22, color: '#111', mb: 2 }}>
          Where are you with your deposit?
        </Typography>
        <RadioGroup
          value={depositStatus}
          onChange={e => setDepositStatus(e.target.value)}
        >
          {DEPOSIT_STATUS.map(option => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio sx={{
                color: '#111',
                '&.Mui-checked': { color: '#111' },
                fontSize: 32,
                mr: 2
              }}/>}
              label={<Typography sx={{ fontSize: 21, color: '#111', fontWeight: 400 }}>{option}</Typography>}
              sx={{ mb: 0.5 }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Buttons row */}
      <Box sx={{
        display: 'flex',
        width: '100%',
        mt: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 720,
        borderTop: '1px solid #e0e0e0',
        pt: 3
      }}>
               <Button
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{
            bgcolor: "#111",
            color: "#fff",
            fontWeight: 700,
            fontSize: 20,
            px: 4,
            borderRadius: 3,
            '&:hover': { bgcolor: "#222" }
          }}
        >
          &larr;  Back
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          disabled={!canContinue}
          onClick={handleContinue}
          sx={{
            bgcolor: '#111',
            color: '#fff',
            fontWeight: 700,
            fontSize: 20,
            borderRadius: 3,
            px: 4,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#222' }
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default MortgageIntroduction;
