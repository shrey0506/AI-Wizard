import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Divider, Link, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const options1 = [
  { label: 'Buy a home', value: 'buy' },
  { label: 'Remortgage or Switch my deal', value: 'remortgage' },
  { label: 'Discuss Buy to Let mortgages', value: 'let' },
];

const remortgageOptions2 = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const options2 = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const options3 = [
  { label: "I'm just researching", value: 'researching' },
  { label: "I'm viewing properties", value: 'viewing' },
  { label: "I'm ready to make an offer", value: 'ready' },
  { label: "I've had an offer accepted", value: 'accepted' },
];

const options4 = [
  { label: 'Just me', value: 'justMe' },
  { label: 'Me and someone else', value: 'meAndSomeone' },
  { label: '3 or more people', value: 'threeOrMore' },
];

// Reusable selection button
const ChoiceButton = ({ selected, onClick, children, width = '100%' }) => (
  <Button
    onClick={onClick}
    fullWidth
    disableRipple
    sx={{
      borderRadius: 3,
      fontSize: 20,
      fontWeight: 400,
      px: 2,
      py: 1.2,
      borderColor: '#111',
      color: selected ? '#fff' : '#111',
      bgcolor: selected ? '#111' : '#fff',
      justifyContent: 'flex-start',
      textAlign: 'left',
      mb: 2,
      minWidth: 0,
      width,
      boxShadow: selected ? 1 : 0,
      border: '2px solid #111',
      transition: 'all 0.2s',
      '&:hover': {
        bgcolor: selected ? '#111' : '#f5f5f5',
      },
    }}
  >
    {selected && <CheckIcon sx={{ mr: 2, fontSize: 26 }} />}
    {children}
  </Button>
);

const AgreementInPrinciple = () => {
    const navigate = useNavigate();

    const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState(null);
  const [step3, setStep3] = useState('');
  const [step4, setStep4] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    const data = {
      option: step1,
      firstHome: step2,
      journey: step3,
      applicants: step4,
    };

    window.scrollTo({ top: 0, behavior: "smooth" }); 
    console.log(data)
    navigate('/mortgage-introduction', { state: data }); // inside your AgreementInPrinciple component
  };

  const indent = { xs: 0, md: '20%' };
  const width = { xs: '100%', md: 540 };

  const isRemortgage = step1 === 'remortgage';
  const isLet = step1 === 'let';

  return (
    <Box
      sx={{
        bgcolor: '#f6f6f6',
        minHeight: '100vh',
        width: '100%',
        py: { xs: 3, md: 6 },
        px: { xs: 1, md: 0 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 900, ml: indent, pr: { xs: 0, md: '10%' } }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, fontFamily: '"Merriweather", serif', color: '#222', mt: 2 }}
        >
          Agreement in Principle
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontFamily: '"Merriweather", serif',
            fontSize: { xs: 28, md: 28 },
            mt: 1,
            mb: 2,
            color: '#111',
          }}
        >
          Get some quick figures
        </Typography>
        <Divider sx={{ my: 3, borderColor: '#cfcfcf' }} />

        {/* -- STEP 1 -- */}
        <Typography sx={{ color: '#222', fontSize: 17, mb: 2 }}>
          Already have a Lloyds Bank mortgage and want to switch your product or borrow more?
          <br />
          Please visit our{' '}
          <Link href="#" sx={{ fontWeight: 500, color: '#111', textDecoration: 'underline' }}>
            tools for existing customers.
          </Link>
        </Typography>
        <Typography sx={{ color: '#222', fontSize: 17, mb: 3 }}>
          Already have a Lloyds Bank mortgage and want to move home? Please select ‘Buy a home’.
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#111', fontSize: 18 }}>
          Firstly, what would you like to do?
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', width, mb: 4, px: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          }, 
         }}>
          {options1.map(opt => (
            <ChoiceButton
              key={opt.value}
              selected={step1 === opt.value}
              width="680px"
              onClick={() => {
                setStep1(opt.value);
                setStep2(null);
                setStep3('');
                setStep4('');
              }}
            >
              {opt.label}
            </ChoiceButton>
          ))}
        </Box>

        {/* ---- REMORTGAGE FLOW ---- */}
        {isRemortgage && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#111', fontSize: 18 }}>
              Do you currently have a mortgage with Lloyds Bank?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', width, gap: 2, mb: 2 }}>
              {remortgageOptions2.map(opt => (
                <ChoiceButton
                  key={opt.value.toString()}
                  selected={step2 === opt.value}
                  onClick={() => setStep2(opt.value)}
                  width="200px"
                >
                  {opt.label}
                </ChoiceButton>
              ))}
            </Box>
            {step2 !== null && (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#111',
                    color: '#fff',
                    borderRadius: 3,
                    px: 2,
                    py: 1.2,
                    fontSize: 22,
                    fontWeight: 700,
                    mt: 2,
                    mb: 3,
                    boxShadow: 'none',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#222',
                    },
                  }}
                  onClick={() => window.open('https://www.lloydsbank.com/mortgages/existing-customers.html', '_blank')}
                >
                  Visit Existing Customer Tools
                </Button>
                <Paper
                  variant="outlined"
                  sx={{
                    bgcolor: '#f5f6fa',
                    borderColor: '#89a8e7',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    px: 3,
                    py: 2,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    width,
                    color: '#111',
                  }}
                >
                  <InfoOutlinedIcon sx={{ color: '#3271c5', fontSize: 32, mr: 2 }} />
                  <span>
                    Please use the existing customer tools link to see our current deals.
                  </span>
                </Paper>
              </>
            )}
          </>
        )}

        {/* ---- BUY TO LET MORTGAGES FLOW ---- */}
        {isLet && (
          <Paper
            variant="outlined"
            sx={{
              bgcolor: '#f5f6fa',
              borderColor: '#89a8e7',
              borderWidth: 1,
              borderStyle: 'solid',
              px: 3,
              py: 2,
              mb: 3,
              display: 'flex',
              alignItems: 'flex-start',
              width,
              color: '#111',
              fontSize: 19,
              lineHeight: 1.6,
            }}
          >
            <InfoOutlinedIcon sx={{ color: '#3271c5', fontSize: 32, mr: 2, mt: 0.5 }} />
            <span>
              If you’re currently renting out or thinking about renting out your property <br />
              <Link
                href="https://www.lloydsbank.com/mortgages/buy-to-let.html"
                sx={{ fontWeight: 500, color: '#111', textDecoration: 'underline' }}
                target="_blank"
                rel="noopener"
              >
                Go to Buy to Let mortgages.
              </Link>
              <br /><br />
              If you're letting your family live in it or taking on a lodger, please select 'I want to buy a home'.
            </span>
          </Paper>
        )}

        {/* ---- STANDARD FLOW (BUY A HOME) ---- */}
        {!isRemortgage && !isLet && step1 && (
          <>
            {/* -- STEP 2: Only show if step1 is selected -- */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#111', fontSize: 18 }}>
              Will this be your first home?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', width, gap: 2, mb: 2,
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          }, 
             }}>
              {options2.map(opt => (
                <ChoiceButton
                  key={opt.value.toString()}
                  selected={step2 === opt.value}
                  onClick={() => {
                    setStep2(opt.value);
                    setStep3('');
                    setStep4('');
                  }}
                  width="200px"
                >
                  {opt.label}
                </ChoiceButton>
              ))}
            </Box>
            <Paper
              variant="outlined"
              sx={{
                bgcolor: '#f5f6fa',
                borderColor: '#89a8e7',
                borderWidth: 1,
                borderStyle: 'solid',
                px: 3,
                py: 2,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                width,
                color: '#111',
              }}
            >
              <InfoOutlinedIcon sx={{ color: '#3271c5', fontSize: 32, mr: 2 }} />
              <span>
                If there&apos;s more than one applicant and anyone is a first time buyer, select &apos;Yes&apos;.
              </span>
            </Paper>
          </>
        )}

        {/* -- STEP 3: Only show in standard flow, after step2 is selected -- */}
        {!isRemortgage && !isLet && step2 !== null && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#111', fontSize: 18 }}>
              Where are you on your home-buying journey?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', width, mb: 4 }}>
              {options3.map(opt => (
                <ChoiceButton
                  key={opt.value}
                  selected={step3 === opt.value}
                  width="680px"
                  onClick={() => {
                    setStep3(opt.value);
                    setStep4('');
                  }}
                >
                  {opt.label}
                </ChoiceButton>
              ))}
            </Box>
          </>
        )}

        {/* -- STEP 4: Only show in standard flow, after step3 is selected -- */}
        {!isRemortgage && !isLet && step3 && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#111', fontSize: 18 }}>
              How many people will be applying for the mortgage?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', width:900, gap: 2, mb: 4 }}>
              {options4.map(opt => (
                <ChoiceButton
                  key={opt.value}
                  selected={step4 === opt.value}
                  onClick={() => setStep4(opt.value)}
                  width="280px"
                >
                  {opt.label}
                </ChoiceButton>
              ))}
            </Box>
          </>
        )}

        {/* -- PRIVACY NOTICE -- */}
        <Typography sx={{ color: '#222', mb: 4, fontSize: 16 }}>
          For how we use your personal information read our{' '}
          <Link href="#" sx={{ fontWeight: 500, color: '#111', textDecoration: 'underline' }}>
            privacy notice.
          </Link>
        </Typography>
        <Divider sx={{ my: 3, borderColor: '#cfcfcf' }} />

        {/* -- CONTINUE BUTTON (standard flow only) -- */}
        {/* For other flows, show disabled continue button for layout consistency */}
        {(!isRemortgage && !isLet) && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button
            variant="contained"
            sx={{
                bgcolor: (step1 && step2 !== null && step3 && step4) ? '#111' : '#bdbdbd',
                color: (step1 && step2 !== null && step3 && step4) ? '#fff' : '#666',
                borderRadius: 3,
                px: 4,
                // py: 1.5,
                fontSize: 20,
                fontWeight: 700,
                boxShadow: 'none',
                '&:hover': {
                bgcolor: (step1 && step2 !== null && step3 && step4) ? '#00844A' : '#bdbdbd',
                color: (step1 && step2 !== null && step3 && step4) ? '#fff' : '#666',
                },
            }}
            endIcon={<ArrowForwardIcon />}
            onClick={handleContinue}
            disabled={loading || !(step1 && step2 !== null && step3 && step4)}
            >
            Continue
            </Button>
        </Box>
        )}
      </Box>
    </Box>
  );
};

export default AgreementInPrinciple;