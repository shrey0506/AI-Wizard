import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignupSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  console.log("Data is "+data)

  const status = data.status?.toLowerCase(); // Normalize for consistency

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f6f6f6",
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          minWidth: 360,
          bgcolor: "#fff",
          boxShadow: 5,
          textAlign: "center"
        }}
      >
        <Typography variant="h4" fontWeight={700} color="#00844A" mb={2}>
          Signup Successful!
        </Typography>

        <Typography mb={2}>
          Thank you for registering. Your application ID is:
        </Typography>
        <Typography fontWeight={700} fontSize={22} color="#111" mb={3}>
          {data.userId || "N/A"}
        </Typography>

        {data.status && (
          <>
            <Typography fontWeight={600} color="text.secondary" mb={1}>
              Status: {data.status}
            </Typography>

            

            {data.status === "Approved" ? (
              <Typography>
                <Typography fontWeight={500} color="text.secondary" mb={2}>
                ROI: {data.roi || "Not available"}
                </Typography>
                <Typography fontWeight={500} color="text.secondary" mb={1}>
                Reason: {data.reason || "Not provided"}
              </Typography>
              </Typography>
            ) : (
              <Typography fontWeight={500} color="error.main" mb={2}>
                You haven&apos;t met the eligibility criteria
              </Typography>
            )}
          </>
        )}

        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            bgcolor: "#00844A",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 2,
            px: 4,
            py: 1.2,
            fontSize: 18,
            "&:hover": { bgcolor: "#006C3B" },
          }}
        >
          Go to Login
        </Button>
      </Box>
    </Box>
  );
}
