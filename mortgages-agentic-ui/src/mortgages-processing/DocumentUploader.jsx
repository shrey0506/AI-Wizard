import FileUpload from '../components/FileUpload'; 
import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { CheckCircle, Delete, UploadFile, ArrowBack, ArrowForward, InputOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { getDefaultStore, useAtomValue } from 'jotai';
import { userStateAtom } from '../stores/atom'; 
import { requests } from '../utils/requests';
import { useNavigate } from 'react-router-dom';
import { userProfileAtom } from '../stores/atom';
import { useToast } from "./ToastContext";

const DOCUMENTS = [
  { key: 'passport', label: 'Passport' },
  { key: 'dl', label: 'DL' },
  { key: 'utility', label: 'Utility Bill' },
  { key: 'p60', label: 'P60 TaxForm' },
  { key: 'salary', label: 'Salary' },
  {key: 'bank', label: 'Bank Statement'},
  { key: 'property', label: 'Property Data' },

];

const DocumentUploader = () => {
    const {showToast} = useToast();
  const { register } = useForm();
  const [uploads, setUploads] = useState({});
  const [progress, setProgress] = useState(0);
  const store = getDefaultStore();
  const user = store.get(userStateAtom);
  const userState = useAtomValue(userProfileAtom); // Get full user object

  const userId = user?.acountId ?? localStorage.getItem("acountId");
  const navigate = useNavigate();

  const handleFileChange = (key, file) => {
    setUploads((prev) => ({
      ...prev,
      [key]: {
        file,
        saved: false,
      },
    }));
  };

  const handleRemove = (key) => {
    setUploads((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleSave = async (key) => {
    const fileData = uploads[key]?.file;
    if (!fileData) return;

    const formData = new FormData();
    formData.append('files', fileData);

    const requestObject = {
      documentName: fileData.name,
      applicationId: userId,
      userName: userState.userName,
      documentType: key,
      fileType: fileData.type
    };

    formData.append(
      'request',
      new Blob([JSON.stringify(requestObject)], { type: 'application/json' })
    );

    try {
      const res = await requests({
        url: 'http://localhost:8081/api/v1/user/upload',
        method: 'POST',
        data: formData,
      });

       showToast(res.data.documentType + " "+res.data.status, "Success")


      if (true) {
        setUploads((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            saved: true,
          },
        }));
        const completed = Object.values(uploads).filter((d) => d.saved).length + 1;
        setProgress((completed / DOCUMENTS.length) * 100);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleBack = () => {
    navigate('/userprofile')
  };

  const handleSubmit = async () => {

    console.log( userState?.userId)
    const userId = userState?.userId;
    
     const profileRes = await requests({
                url: 'http://localhost:8081/api/v1/mortgage/submit',
                method: 'get',
                params: { userId },
              });

              
  // Navigate to result page, pass result via state
      navigate('/result', { state: profileRes.data });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 4, px: 6 }}>
      {/* Top Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3, ml: '15%' }}>
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{
            borderRadius: 3,
            px: 4,
            fontSize: 20,
            fontWeight: 700,
            boxShadow: 'none',
          }}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
      </Box>

      {/* Main Upload + Progress Area */}
      <Box sx={{ display: 'flex', width: '100%' }}>
        {/* LEFT SECTION - Starts at 25% */}
        <Box sx={{ width: '75%' }}>
          {DOCUMENTS.map((doc) => {
            const uploaded = uploads[doc.key];
            const isSaved = uploaded?.saved;

            return (
              <Box
                key={doc.key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  mb: 4,
                  ml: '25%',
                }}
              >
                <Typography sx={{ width: 140 }}>{doc.label}</Typography>

                {!uploaded && (
                  <FileUpload
                    label="Upload"
                    name={doc.key}
                    id={doc.key}
                    register={register}
                    accept="image/png"
                    onChange={(e) => handleFileChange(doc.key, e.target.files[0])}
                  />
                )}

                {uploaded && !isSaved && (
                  <>
                    <UploadFile sx={{ color: '#888', mx: 1 }} />
                    <IconButton onClick={() => handleSave(doc.key)}>
                      <CheckCircle color="success" />
                    </IconButton>
                    <IconButton onClick={() => handleRemove(doc.key)}>
                      <Delete color="error" />
                    </IconButton>
                  </>
                )}

                {isSaved && (
                  <>
                    <UploadFile sx={{ color: 'green', mx: 1 }} />
                    <Typography variant="body2" sx={{ color: 'green' }}>
                      Uploaded
                    </Typography>
                  </>
                )}
              </Box>
            );
          })}
        </Box>

        {/* RIGHT SECTION - Progress Line */}
        <Box sx={{ width: '25%', position: 'relative' }}>
          {DOCUMENTS.map((doc, i) => {
            const isActive = uploads[doc.key]?.saved;
            return (
              <Box
                key={doc.key}
                sx={{
                  position: 'absolute',
                  top: i * 80,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 2,
                  height: 80,
                  bgcolor: isActive ? 'green' : 'black',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: isActive ? 'green' : 'black',
                    position: 'absolute',
                    left: '-3px',
                    top: '0',
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Bottom Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 6 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: 3,
            px: 4,
            fontSize: 20,
            fontWeight: 700,
            boxShadow: 'none',
          }}
          endIcon={<ArrowForward />}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentUploader;
