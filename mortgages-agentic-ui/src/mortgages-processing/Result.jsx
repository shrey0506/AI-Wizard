import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Result() {
  const { state: result } = useLocation();

  if (!result) {
    return <Typography>No result data!</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f4f8f6',
      }}
    >
      <Card sx={{ minWidth: 420, maxWidth: 500, boxShadow: 4, borderRadius: 4, p: 3 }}>
        <CardContent>
          {/* Application ID row with icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.5, flex: 1, color: "#00844A" }}
            >
              Application ID
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#222", mr: 1 }}>
              {result.userId}
            </Typography>
            <CheckCircleIcon sx={{ color: "#19c187", fontSize: 32 }} />
          </Box>

          {/* First & Last Name */}
          {/* <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Typography  sx={{ fontWeight: 600,fontSize:18, textAlign:"left", color: "#444" }}>
               {result.lastName}
            </Typography>
            <Typography  sx={{ fontWeight: 600,fontSize:18, textAlign:"right", color: "#444" }}>
              {result.firstName}
            </Typography>
          </Box> */}

          {/* Reason */}
           <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: "red", fontWeight: 500 }}>
              {"Your mortgage is decliend due to below reason"}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: "#666", fontWeight: 500 }}>
              {result.reason}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Thank You */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#00844A",
              mb: 0.5,
              textAlign: "center",
              letterSpacing: 0.5
            }}
          >
            Thank you for choosing Mortgage Agentic!
          </Typography>
          <Typography variant="body2" sx={{ color: "#333", textAlign: "center" }}>
            Your application has been submitted successfully.<br />
            Our mortgage experts will review your details and get back to you soon.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
