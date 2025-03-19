import React, { useState } from 'react';
import { BlobServiceClient, AnonymousCredential } from '@azure/storage-blob';

interface RecipeImgUploadProps {
  image: string;
  onRecipeImgUrlChange: (url: string) => void;
}

const RecipeImgUpload: React.FC<RecipeImgUploadProps> = ({ image, onRecipeImgUrlChange }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);  // Success message state

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
      setUploadSuccess('File uploaded successfully!');  // Set success message after upload
    } catch (error: any) {
      setUploadError('Failed to upload image. Please try again.');
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.imageContainer}>
      <label htmlFor="image" style={styles.label}>Upload Image</label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => uploadImage(e.target.files ? e.target.files[0] : null)}
        style={styles.fileInput}
      />
      {isUploading && <p>Uploading...</p>}
      {uploadError && <p style={styles.errorText}>{uploadError}</p>}
      {uploadSuccess && <p style={styles.successText}>{uploadSuccess}</p>} {/* Success message */}
      <div style={styles.imagePreviewContainer}>
        <img src={image || '/chstock.ico'} alt="Default" style={styles.imageImage} />
      </div>
    </div>
  );
};

const styles = {
  imageContainer: {
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
  imageImage: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
  },
  errorText: {
    color: 'red',
  },
  successText: {
    color: 'green',  // Green color for success message
  },
  imagePreviewContainer: {
    marginTop: '10px',
  },
};

export default RecipeImgUpload;
