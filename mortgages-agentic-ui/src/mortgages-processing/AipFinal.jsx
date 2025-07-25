import React, { useState } from "react";
import { useToast } from "./ToastContext";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { requests } from "../utils/requests";

import { useSetAtom } from 'jotai';
import { userAtom } from '../stores/atom';

const months = [
  "Month",
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function ApiFinal({ prevData = {} }) {

  const setUser = useSetAtom(userAtom);

  const {showToast} = useToast();


  const { state: allData } = useLocation();
  const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    title: "",
    firstName: "",
    lastName: "",
    nameChanged: null,
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    nationality: "",
    maritalStatus: "",
    mobile: "",
    email: "",
    userName: "",
    password: "",
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Helpers
  const validate = () => {
    const err = {};

    if (!form.title) err.title = "Please select title";
    if (!form.firstName) err.firstName = "Please enter your first name.";
    if (!form.lastName) err.lastName = "Please enter your last name.";

    if (!form.dobDay || isNaN(form.dobDay) || form.dobDay < 1 || form.dobDay > 31) err.dobDay = "Day must be between 1-31";
    if (!form.dobMonth || form.dobMonth === "Month") err.dobMonth = "Please select month";
    if (!form.dobYear || isNaN(form.dobYear) || form.dobYear.length !== 4 || Number(form.dobYear) > new Date().getFullYear()) err.dobYear = "Enter a valid year";
    if (!form.nationality) err.nationality = "Please select nationality";
    if (!form.maritalStatus) err.maritalStatus = "Please select marital status";
    if (!form.mobile || !/^\d{10,15}$/.test(form.mobile)) err.mobile = "Enter valid mobile number";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter valid email";
    if (form.userName !== form.email) err.userName = "Emails do not match";


    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!form.password) {
    err.password = "Please enter a password";
  } else if (!passwordPattern.test(form.password)) {
    err.password = "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special";
  }

  if (!form.confirmPassword) {
    err.confirmPassword = "Please confirm your password";
  } else if (form.password !== form.confirmPassword) {
    err.confirmPassword = "Passwords do not match";
  }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (field) => (e) => {

    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleToggle = (val) => {
    setForm((prev) => ({
      ...prev,
      nameChanged: val,
    }));
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    const finalData = { ...allData, ...form };

    console.log(finalData)
    try {
      const response = await requests({
        url: "http://localhost:8081/api/v1/user/register",     // Change to your API path
        method: "post",
        data: finalData,
        headers: { "Content-Type": "application/json" }, // Optionally add headers
      });

      console.log(response)
      if (response.status && response.status === 201) {

        setUser(response.data.userName)
        showToast("Singup Successful... redirecting...", "Success")
        setTimeout(() => {
          navigate("/signup-success", { state: response.data });
        }, 10000);
      }
    } catch (err) {
      // Error handling
      console.error("API Error:", err);
    }
  }
};

  return (
    <Box sx={{ px: 8, py: 3, maxWidth: 640, mx: "auto" }}>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>Agreement in Principle</Typography>
      <Typography variant="h2" sx={{ fontFamily: '"Merriweather",serif', fontWeight: 700, mb: 2, fontSize: 48 }}>
        About you
      </Typography>
      <Box sx={{ borderBottom: "2px solid #eee", mb: 2 }} />
      {/* Personal Details */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Personal details</Typography>
      <Alert severity="warning" sx={{ mb: 3, bgcolor: "#fff6e6", color: "#805900", borderColor: "#ffd699" }}>
        Enter all details exactly as they appear on any official documents you may have, such as your <b>passport</b> or <b>driving licence</b>.
        It's important what you enter matches your documents as it will help avoid delaying your application.
      </Alert>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
          {/* Title */}
          <Typography fontWeight={700} sx={{ mt: 1 }}>Title</Typography>
          <TextField
            select
            value={form.title}
            onChange={handleChange("title")}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ width: 380,
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          },  
            }}
          >
            {["Mr", "Mrs", "Miss", "Ms", "Dr", "Other"].map(opt => (
              <MenuItem value={opt} key={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          {/* First Name */}
          <Typography fontWeight={700} sx={{ mt: 1 }}>First name</Typography>
          <TextField
            value={form.firstName}
            onChange={handleChange("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName}
            sx={{ width: 380,
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          },  
             }}
            inputProps={{ maxLength: 30 }}
            placeholder="Enter your first name"
          />
          {/* Last Name */}
          <Typography fontWeight={700} sx={{ mt: 1 }}>Last name</Typography>
          <TextField
            value={form.lastName}
            onChange={handleChange("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName}
            sx={{ width: 380,
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          },  
             }}
            inputProps={{ maxLength: 30 }}
            placeholder="Enter your last name"
          />
          {/* Name changed */}
          <Typography fontWeight={700} sx={{ mt: 2 }}>Have you changed your name within the last three years?</Typography>
          <Typography
            component="a"
            sx={{ textDecoration: "underline", fontWeight: 500, mb: 1, color: "#111", cursor: "pointer", fontSize: 17,
              
             }}
            tabIndex={0}
          >
            Why do we need this?
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={form.nameChanged}
            onChange={(_, val) => handleToggle(val)}
            sx={{
              mb: 2,
              '& .Mui-selected': {
                bgcolor: '#111 !important',
                color: '#fff !important',
                borderColor: '#111',
              },
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          },  
              '& .MuiToggleButton-root': {
                width: 130,
                fontSize: 18,
                fontWeight: 600,
                borderRadius: 2,
                background: '#fff',
                color: '#111',
                border: '2px solid #bbb',
                '&:hover': { bgcolor: '#eee' },
              }
            }}
          >
            <ToggleButton value={true}>Yes</ToggleButton>
            <ToggleButton value={false}>No</ToggleButton>
          </ToggleButtonGroup>
          {/* Date of Birth */}
          <Typography fontWeight={700} sx={{ mt: 2 }}>Date of birth</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              value={form.dobDay}
              onChange={handleChange("dobDay")}
              error={!!errors.dobDay}
              helperText={errors.dobDay}
              sx={{ width: 100,
                '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          },  
               }}
              inputProps={{ maxLength: 2 }}
              placeholder="DD"
            />
            <TextField
              select
              value={form.dobMonth}
              onChange={handleChange("dobMonth")}
              error={!!errors.dobMonth}
              helperText={errors.dobMonth}
              sx={{ width: 130,
                 '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          },  
               }}
            >
              {months.map((m, i) => (
                <MenuItem value={i === 0 ? "" : m} key={m}>{m}</MenuItem>
              ))}
            </TextField>
            <TextField
              value={form.dobYear}
              onChange={handleChange("dobYear")}
              error={!!errors.dobYear}
              helperText={errors.dobYear}
              sx={{ width: 110,
                 '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          },  
               }}
              inputProps={{ maxLength: 4 }}
              placeholder="YYYY"
            />
          </Box>
          {/* Nationality */}
          <Typography fontWeight={700} sx={{ mt: 2 }}>Nationality</Typography>
          <Typography
            component="a"
            sx={{ textDecoration: "underline", fontWeight: 500, mb: 1, color: "#111", cursor: "pointer", fontSize: 17 }}
            tabIndex={0}
          >
            Why do we need this?
          </Typography>
          <TextField
            select
            value={form.nationality}
            onChange={handleChange("nationality")}
            error={!!errors.nationality}
            helperText={errors.nationality}
            sx={{ width: 380,
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          }, 
             }}
          >
            <MenuItem value="">Select</MenuItem>
            {["INDIA", "UK", "USA", "Other"].map(opt => (
              <MenuItem value={opt} key={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          {/* Marital status */}
          <Typography fontWeight={700} sx={{ mt: 2 }}>Marital status</Typography>
          <TextField
            select
            value={form.maritalStatus}
            onChange={handleChange("maritalStatus")}
            error={!!errors.maritalStatus}
            helperText={errors.maritalStatus}
            sx={{ width: 380,
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          }, 
             }}
          >
            <MenuItem value="">Select</MenuItem>
            {["Single", "Married", "Divorced", "Widowed"].map(opt => (
              <MenuItem value={opt} key={opt}>{opt}</MenuItem>
            ))}
          </TextField>

          {/* Contact details */}
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>Contact details</Typography>
          <Typography sx={{ mb: 2, color: "#222", fontSize: 17 }}>
            We’ll use these details to send you your AIP decision. You can also use these details to get back into your AIP.
          </Typography>
          {/* Mobile */}
          <Typography fontWeight={700}>Mobile number</Typography>
          <TextField
            value={form.mobile}
            onChange={handleChange("mobile")}
            error={!!errors.mobile}
            helperText={errors.mobile}
            sx={{ width: 380,
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          }, 
             }}
            inputProps={{ maxLength: 15 }}
            placeholder="e.g. 07800123456"
          />
          {/* Email */}
          <Typography fontWeight={700}>Email</Typography>
          <TextField
            value={form.email}
            onChange={handleChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ width: 380,
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          }, 
             }}
            inputProps={{ maxLength: 60 }}
            placeholder="Enter email"
          />
          {/* Confirm Email */}
          <Typography fontWeight={700}>Confirm email</Typography>
          <TextField
            value={form.userName}
            onChange={handleChange("userName")}
            error={!!errors.userName}
            helperText={errors.userName}
            sx={{ width: 380,
              '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            border: '2px solid #111',
            pr: 0,
            pl: 0,
            minHeight: 50,   // minimum box height (adjust as needed)
            height: 50,      // fixed height
          }, 
             }}
            inputProps={{ maxLength: 60 }}
            placeholder="Confirm email"
          />
          {/* Password */}
<Typography fontWeight={700}>Password</Typography>
<TextField
  type="password"
  value={form.password}
  onChange={handleChange("password")}
  error={!!errors.password}
  helperText={errors.password}
  sx={{
    width: 380,
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      border: '2px solid #111',
      pr: 0,
      pl: 0,
      minHeight: 50,
      height: 50,
    }
  }}
  inputProps={{ maxLength: 60 }}
  placeholder="Enter password"
/>

{/* Confirm Password */}
<Typography fontWeight={700}>Confirm Password</Typography>
<TextField
  type="password"
  value={form.confirmPassword}
  onChange={handleChange("confirmPassword")}
  error={!!errors.confirmPassword}
  helperText={errors.confirmPassword}
  sx={{
    width: 380,
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      border: '2px solid #111',
      pr: 0,
      pl: 0,
      minHeight: 50,
      height: 50,
    }
  }}
  inputProps={{ maxLength: 60 }}
  placeholder="Confirm password"
/>

          {/* Navigation */}
          <Box display="flex" justifyContent="space-between" width="100%" mt={3}>
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

            <Box display="flex" gap={2}>
              <Button
                type="submit"
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
                Sign Up &rarr;
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
