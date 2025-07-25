import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Link, Paper } from '@mui/material';

import { useAtom } from 'jotai';
import { userStateAtom } from '../stores/atom';
import { useSetAtom } from 'jotai';
import { userAtom } from '../stores/atom';
import { requests } from '../utils/requests';
import { userProfileAtom } from '../stores/atom';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin, onSSO }) {
  const setUserProfile = useSetAtom(userProfileAtom);
  const [form, setForm] = useState({ userName: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useAtom(userAtom);
  

  const navigate = useNavigate();

  const setUserState = useSetAtom(userStateAtom);

   useEffect(() => {
    if (userId) {
      setForm((prev) => ({ ...prev, userName: userId }));
      setUserId(null);
    }
  }, [userId]);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const err = {};
    if (!form.userName) err.userName = 'Enter your username';
    if (!form.password) err.password = 'Enter your password';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
       
        console.log("Logging in....");
        const response = await requests({
          url: "http://localhost:8081/api/v1/user/login",
          method: "post",
          data: form,
        });

        console.log(response)
        console.log("After Logging in....");
        const userData = response.data;
        console.log("userData"+userData.accessToken.acountId)

        console.log("Setting User Data in Store....");
        if(userData != null) {
          setUserState({
            userId: userData.accessToken.acountId,
            authToken: userData.accessToken.authToken
          })

          console.log("Fetching user id....");
          const userId = userData?.accessToken?.acountId;

          console.log("calling profile api....");
          console.log(userId)
          const profileRes = await requests({
            url: 'http://localhost:8081/api/v1/user/profile',
            method: 'get',
            params: { userId },
          });

          console.log(profileRes)

          console.log("navingating to profile.....")
          if(profileRes) {
            setUserProfile(profileRes.data);
            navigate("/userprofile");
          }
        }
      } catch (err) {
        setErrors({ password: "Invalid username or password" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f6f6f6',
      }}
    >
      <Paper elevation={4} sx={{
        p: 4,
        borderRadius: 4,
        minWidth: 360,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 5,
      }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h6" component="div" fontWeight={600}>
            Welcome to Login
          </Typography>
          <Typography
            variant="body2"
            component="div"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Join our mortgage community and unleash the power of AI Assistance in mortgage processing.
          </Typography>
        </Box>
        <Typography sx={{ color: '#555', mb: 3 }}>Access your mortgage portal</Typography>
        <form style={{ width: '100%' }} onSubmit={handleSubmit} autoComplete="off">
          {/* User Name */}
          <Typography
            fontWeight={700}
            sx={{
              mt: 1,
              textAlign: 'left',    // <-- left align
              fontSize: 18,         // <-- increase size (try 20-22 as per your design)
            }}
          >
            User Name:
          </Typography>
          <TextField
            label="User Name"
            value={form.userName}
            onChange={handleChange("userName")}
            error={!!errors.userName}
            helperText={errors.userName}
            sx={{
              width: '100%',
              mt: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                minHeight: 50,
                height: 50,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00844A',
                  borderWidth: '3px',
                },
              }
            }}
            inputProps={{ maxLength: 60 }}
            placeholder="Enter user name"
            autoFocus
          />

          <Typography
            fontWeight={700}
            sx={{
              mt: 1,
              textAlign: 'left',    // <-- left align
              fontSize: 18,         // <-- increase size (try 20-22 as per your design)
            }}
          >
            Password:
          </Typography>
          {/* Password */}
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              width: '100%',
              mt: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                minHeight: 50,
                height: 50,
                    // The actual border is the .MuiOutlinedInput-notchedOutline child!
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00844A',
                  borderWidth: '3px',
                },
              },
            }}
            inputProps={{ maxLength: 60 }}
            placeholder="Enter password"
          />

          {/* Forgot password link */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <Link href="#" underline="hover" sx={{ fontSize: 14 }}>
              Forgot password?
            </Link>
          </Box>

          {/* Sign In Button */}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              bgcolor: '#00844A',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              borderRadius: 2,
              boxShadow: 'none',
              py: 1.4,
              mb: 1.5,
              mt: 0.5,
              '&:hover': { bgcolor: '#006C3B' },
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* SSO Button - for demo only */}
        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 1,
            borderRadius: 2,
            borderColor: '#00844A',
            color: '#00844A',
            fontWeight: 700,
            textTransform: 'none',
            fontSize: 16,
            py: 1,
            '&:hover': {
              bgcolor: '#e8ffe5',
              borderColor: '#006C3B',
              color: '#006C3B',
            },
          }}
          // No action needed for demo
        >
          Single Sign On
        </Button>
      </Paper>
    </Box>
  );
}