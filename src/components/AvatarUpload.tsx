import React, { useState } from 'react';
import { BlobServiceClient, AnonymousCredential } from '@azure/storage-blob';
import { AddPhotoAlternate } from '@mui/icons-material'; // MUI Icon for upload
import { IconButton, Snackbar, Alert } from '@mui/material'; // MUI components for icon and Snackbar
import { styled } from '@mui/system'; // MUI styled API for custom styling

// Interface for AvatarUpload props
interface AvatarUploadProps {
  avatarUrl: string;
  onAvatarUrlChange: (url: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ avatarUrl, onAvatarUrlChange }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);  // Success message state
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);  // Snackbar visibility

  // Hardcoded container name
  const containerName = 'avatars'; // Replace with your actual container name

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

      // Once uploaded, update avatar URL in the parent component
      const uploadedUrl = blockBlobClient.url;
      onAvatarUrlChange(uploadedUrl);

      setIsUploading(false);
      setUploadSuccess('File uploaded successfully!');  // Set success message after upload
      setOpenSnackbar(true);  // Show Snackbar with success message

    } catch (error: any) {
      setUploadError('Failed to upload image. Please try again.');
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  return (
    <AvatarContainer>
      <Label htmlFor="avatar">Avatar Upload</Label>
      {/* Upload icon triggers the file input */}
      <IconButton
        color="primary"
        aria-label="upload-avatar"
        onClick={() => document.getElementById('avatar')?.click()} // Directly trigger file input
        style={{ marginBottom: '10px' }}
      >
        <AddPhotoAlternate size={30} /> {/* MUI Upload Icon */}
      </IconButton>
      
      {/* Hidden file input */}
      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={(e) => uploadImage(e.target.files ? e.target.files[0] : null)}
        style={{ display: 'none' }}
      />
      
      {isUploading && <p>Uploading...</p>}
      
      {/* Display the success message with styling outside the Snackbar */}
      {uploadSuccess && <StyledAlert severity="success">{uploadSuccess}</StyledAlert>}
      
      {uploadError && <ErrorText>{uploadError}</ErrorText>}
      
      <ImagePreviewContainer>
        <AvatarImage src={avatarUrl || '/chstock2.ico'} alt="Default" />
      </ImagePreviewContainer>

      {/* Success Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <StyledAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {uploadSuccess}
        </StyledAlert>
      </Snackbar>
    </AvatarContainer>
  );
};

// Styled components using MUI's styled API
const AvatarContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
  backgroundColor: '#f8f9fa', // Light background for consistency
  padding: '20px',
  borderRadius: '8px',
  border: '1px solid #ccc',
});

const Label = styled('label')({
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#E73927', // Red color for label to match theme
});

const ErrorText = styled('p')({
  color: '#dc3545', // Red color for error message
  fontWeight: 'bold',
  marginTop: '10px',
});

const ImagePreviewContainer = styled('div')({
  marginTop: '10px',
});

const AvatarImage = styled('img')({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  border: '3px solid #E73927', // Red border for avatar to match theme
});

// Custom styled Alert for success inside the Snackbar
const StyledAlert = styled(Alert)(() => ({
  backgroundColor: '#d4edda',  // Light green background for success
  color: '#28a745',  // Green text color
  fontWeight: 'bold',
  borderRadius: '5px',
  border: '1px solid #28a745',  // Green border to match the success color
  padding: '8px 16px',  // Padding for better visual spacing
}));

export default AvatarUpload;
