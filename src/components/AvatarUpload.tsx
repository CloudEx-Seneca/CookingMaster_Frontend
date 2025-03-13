import React, { useState } from 'react';
import { BlobServiceClient, AnonymousCredential } from '@azure/storage-blob';

// Interface for AvatarUpload props
interface AvatarUploadProps {
  avatarUrl: string;
  onAvatarUrlChange: (url: string) => void;
  containerName: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ avatarUrl, onAvatarUrlChange, containerName }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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

      // Hardcoded SAS Token (consider a more secure approach for production)
      const sasToken = 'YOUR_SAS_TOKEN';  // Replace with your actual SAS token
      const blobServiceClient = new BlobServiceClient(`https://${sasToken.split('?')[0]}`, new AnonymousCredential());
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
    } catch (error: any) {
      setUploadError('Failed to upload image. Please try again.');
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.avatarContainer}>
      <label htmlFor="avatar" style={styles.label}>Avatar Upload</label>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={(e) => uploadImage(e.target.files ? e.target.files[0] : null)}
        style={styles.fileInput}
      />
      {isUploading && <p>Uploading...</p>}
      {uploadError && <p style={styles.errorText}>{uploadError}</p>}
      <div style={styles.imagePreviewContainer}>
        <img src={avatarUrl || '/img/default-avatar.png'} alt="Default" style={styles.avatarImage} />
      </div>
    </div>
  );
};

const styles = {
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  fileInput: {
    padding: '10px',
    marginBottom: '10px',
  },
  avatarImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
  },
  errorText: {
    color: 'red',
  },
  imagePreviewContainer: {
    marginTop: '10px',
  },
};

export default AvatarUpload;
