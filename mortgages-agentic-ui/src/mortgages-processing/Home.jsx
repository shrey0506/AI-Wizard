import React, { useRef, useState, useEffect } from 'react';
import { Box, TextField, IconButton, InputAdornment, Tooltip, Fade } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { requests } from '../utils/requests';
import MarkDownRenderer from './MarkdownRenderer';

// Blinking dots for loader
function BlinkingDots() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 1, py: 1 }}>
      {[0, 1, 2].map(i => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            backgroundColor: "#00B06B",  // always green
            borderRadius: "50%",
            animation: `blink 1.2s infinite ${i * 0.2}s`,
            "@keyframes blink": {
              "0%": { opacity: 0.2 },
              "20%": { opacity: 1 },
              "100%": { opacity: 0.2 }
            }
          }}
        />
      ))}
    </Box>
  );
}


export const Home = () => {
  const fileInputRef = useRef();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]); // [{sender: 'user'|'ai', text}]
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  //Scroll to bottom when conversation changes
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [conversation, loading]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    alert(`File selected: ${file?.name}`);
  };

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    // Append user message
    setConversation(prev => [...prev, { sender: 'user', text: trimmed }]);
    setMessage('');
    setLoading(true);

    try {
      const response = await requests({
        url: 'http://localhost:8081/api/v1/mortgage/enquiry',
        method: 'post',
        data: { user_input: trimmed },
      });

      console.log("Main reponse "+response)

      console.log("Resp "+response.data.response)


      // Parse nested JSON string (AI response)
      const aiText = response?.data?.response ?? "Sorry, no reply from AI.";
      setConversation(prev => [...prev, { sender: 'ai', text: aiText }]);
    } catch (error) {
      setConversation(prev => [
        ...prev,
        { sender: 'ai', text: 'Failed to send message.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // For Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        p: 2,
        boxSizing: 'border-box',
      }}
    >
      {/* Chat history */}
      <Box
        ref={chatBoxRef}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >

      {conversation.map((msg, idx) => (
        msg.sender === "user" ? (
          // ...user message as before...
          <Box
            key={idx}
            sx={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              bgcolor: msg.sender === 'user' ? '#00B06B' : '#222',
              color: '#fff',
              borderRadius: 2,
              px: 2,
              py: 1,
              mb: 1,
              maxWidth: '75%',
              fontSize: 16,
              boxShadow: 1,
              textAlign: 'left',
              wordBreak: 'break-word',
            }}
          >
            {msg.text}
          </Box>
          ) : (
          // <Box
          //   key={idx}
          //   sx={{
          //     alignSelf: 'flex-start',
          //     bgcolor: 'transparent',
          //     borderRadius: 2,
          //     px: 0,
          //     py: 0,
          //     mb: 1,
          //     maxWidth: '75%',
          //   }}
          // >
          //   <Box
          //     sx={{
          //       border: '1px solid rgba(255, 255, 255, 0.2)', // light transparent border
          //       backgroundColor: 'rgba(255, 255, 255, 0.05)', // semi-transparent background
          //       borderRadius: 2,
          //       p: 2,
          //       fontSize: 16,
          //       color: '#fff',
          //       // whiteSpace: 'pre-wrap',
          //       wordBreak: 'break-word',
          //     }}
          //   >
          //     <MarkDownRenderer content={msg.text} messageId={`msg-${idx}`} />
          //   </Box>
          // </Box>

   <Box
  key={idx}
  sx={{
    alignSelf: 'flex-start',
    bgcolor: 'transparent',
    mb: 1,
    maxWidth: '75%',
  }}
>
  <Box
    sx={{
      border: '1px solid rgba(255,255,255,0.2)',  // ✅ light visible border
      backgroundColor: 'rgba(255,255,255,0.05)',  // ✅ transparent look
      borderRadius: 2,
      p: 2,
      fontSize: 16,
      wordBreak: 'break-word',
      color: '#fff',
    }}
  >
    <MarkDownRenderer content={msg.text} messageId={`msg-${idx}`} />
  </Box>
</Box>


          )
        ))}
        {/* Blinking dots while loading */}
        {loading && (
          <Fade in={loading} unmountOnExit>
            <Box
              sx={{
                alignSelf: "flex-start",
                bgcolor: "#222",
                bgcolor: "transparent",
                borderRadius: 2,
                px: 2,
                py: 1,
                mb: 1,
                maxWidth: "60%",
                boxShadow: 1,
                minHeight: 32,
                display: "flex",
                alignItems: "center"
              }}
            >
              <BlinkingDots />
            </Box>
          </Fade>
        )}
      </Box>

      {/* Text box + send + file */}
      <TextField
        placeholder="Start your enquiry…."
        fullWidth
        size="medium"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        sx={{
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#bdbdbd' },
            '&:hover fieldset': { borderColor: '#00B06B' },
            '&.Mui-focused fieldset': { borderColor: '#00B06B' },
          },
          '& label.Mui-focused': {
            color: '#00B06B',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="File Upload" arrow>
                  <IconButton
                    component="span"
                    onClick={() => fileInputRef.current.click()}
                    edge="end"
                    size="small"
                    aria-label="Upload file"
                  >
                    <AttachFileIcon />
                  </IconButton>
                </Tooltip>
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <Tooltip title="Send Enquiry" arrow>
                  <span>
                    <IconButton
                      onClick={handleSend}
                      edge="end"
                      size="small"
                      aria-label="Send message"
                      sx={{
                        color: '#00B06B',
                        '&:hover': { color: '#00844A' },
                      }}
                      disabled={!message.trim() || loading}
                    >
                      <SendIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
