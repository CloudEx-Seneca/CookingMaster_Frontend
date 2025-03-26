import React, { useState } from 'react';
import { BlobServiceClient, AnonymousCredential } from '@azure/storage-blob';
import { Snackbar, Alert, CircularProgress, TextField, Box } from '@mui/material';
import { styled } from '@mui/system';

interface RecipeImgUploadProps {
  image: string;
  onRecipeImgUrlChange: (url: string) => void;
}

const RecipeImgUpload: React.FC<RecipeImgUploadProps> = ({ image, onRecipeImgUrlChange }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);  // Success message state
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Hardcoded container name
  const containerName = 'recipes'; // Replace with your actual container name

  // Validate the file before uploading
  const validateFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Please upload an image (JPG, PNG, GIF).');
      return false;
    }

    if (file.size > 5 * 1024 * 1024) { // Limit file size to 5MB
      setUploadError('File size is too large. Please upload a file smaller than 5MB.');
      return false;
    }

    return true;
  };

  const uploadImage = async (file: File | null) => {
    if (!file) {
      setUploadError('No file selected');
      return;
    }

    if (!validateFile(file)) return;

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(null);  // Reset success message before uploading

      // Ensure SAS token is correctly appended to the URL
      const sasToken = 'sv=2022-11-02&ss=b&srt=sco&sp=rwtf&se=2025-04-30T05:18:29Z&st=2025-03-13T21:18:29Z&spr=https&sig=SqlH%2F7ZJ2sl9UuA9Qp0VbGQgJRqrCDBAA4VgQUkS5EE%3D';  // Replace with your actual SAS token
      const accountName = 'cookingmastercapstone'; // Replace with your Azure Blob Storage account name
      const blobServiceUrl = `https://${accountName}.blob.core.windows.net?${sasToken}`;
      const blobServiceClient = new BlobServiceClient(blobServiceUrl, new AnonymousCredential());
      const containerClient = blobServiceClient.getContainerClient(containerName);

      // Create a unique blob name
      const blobName = `${Date.now()}_${file.name}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Use the uploadData method instead of uploadBrowserData (as uploadBrowserData is deprecated)
      await blockBlobClient.uploadData(file);

      // Once uploaded, update image URL in the parent component
      const uploadedUrl = blockBlobClient.url;
      onRecipeImgUrlChange(uploadedUrl);

      setIsUploading(false);
      setUploadSuccess('File uploaded successfully!');
      setSnackbarMessage('File uploaded successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);  // Open the success Snackbar
    } catch (error: any) {
      setUploadError('Failed to upload image. Please try again.');
      console.error('Error uploading image:', error);
      setIsUploading(false);
      setSnackbarMessage('Failed to upload image. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);  // Open the error Snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <ImageUploadField
        id="image"
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={(e) => uploadImage(e.target.files ? e.target.files[0] : null)}
        fullWidth
        variant="outlined"
      />
      {isUploading && <CircularProgress />}
      {uploadError && <Alert severity="error">{uploadError}</Alert>}
      {uploadSuccess && <Alert severity="success">{uploadSuccess}</Alert>}
      <ImagePreview>
        <img src={image || '/chstock2.ico'} alt="Default" />
      </ImagePreview>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
});

const ImageUploadField = styled(TextField)({
  marginBottom: '16px',
});

const ImagePreview = styled(Box)({
  marginTop: '16px',
  img: {
    width: '400px',
    height: 'auto',
    borderRadius: '5%',
  },
});

export default RecipeImgUpload;
