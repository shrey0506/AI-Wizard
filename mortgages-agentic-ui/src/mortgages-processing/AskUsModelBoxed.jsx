import React, { useState, forwardRef } from "react";
import { Button, Dialog, DialogTitle, DialogContent, IconButton, Slide, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Home} from "./Home";

const SlideTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const AskUsModalBoxed = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Your fixed box with vertical Ask Us button */}
      <Box
        sx={{
          position: 'fixed',
          right: 0,
          top: '35%',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          transform: 'translateY(-50%)'
        }}
      >
        <Button
          sx={{
            bgcolor: '#00844A',
            color: '#fff',
            borderRadius: '6px 0 0 6px',
            px: 1,
            py: 0.4,
            minWidth: 0,
            minHeight: 0,
            height: 120,
            fontWeight: 600,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            letterSpacing: 1.5,
            fontSize: 16,
            boxShadow: 2,
            '&:hover': { bgcolor: '#006C3B' },
          }}
          onClick={() => setOpen(true)}
        >
          Ask us
        </Button>
      </Box>

      {/* The modal can live anywhere in the component tree */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={SlideTransition}
        transitionDuration={350}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            position: "fixed",
            right: 0,
            top: 0,
            height: "100vh",
            margin: 0,
            borderRadius: 0,
          }
        }}
        hideBackdrop={false}
      >
        <DialogTitle sx={{ p: 2, pb: 0, fontWeight: 700, fontSize: 22 }}>
          Ask Us
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 12,
              top: 14,
              color: '#555',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 2 }}>
          <Home />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AskUsModalBoxed;
