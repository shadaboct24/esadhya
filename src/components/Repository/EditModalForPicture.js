import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";

const EditItemModal = ({ open, onClose, item, onSubmit }) => {
  // State for the form
  const [editData, setEditData] = useState({
    description: "",
    filename: "",
  });

  // State for preview image
  const [imagePreview, setImagePreview] = useState(null);

  // Update state when item changes or modal opens
  useEffect(() => {
    if (item && open) {
      setEditData({
        description: item.description || "",
        filename: item.filename || "",
      });

      setImagePreview(item.filename ? `LearningImages/${item.filename}` : null);
    }
  }, [item, open]);

  // State for loading
  const [isUploading, setIsUploading] = useState(false);

  // Ref for the file input
  const fileInputRef = useRef(null);

  // Handle description change
  const handleDescriptionChange = (e) => {
    setEditData({ ...editData, description: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Extract just the filename
    setEditData({ ...editData, filename: file.name });
  };

  // Trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!editData.description.trim()) {
      alert("Please enter a description");
      return;
    }

    if (!editData.filename) {
      alert("Please select an image");
      return;
    }

    // Mock the upload process
    setIsUploading(true);

    // Here you would typically handle actual file upload
    // But as requested, we're just passing the filename

    // Simulate process completion after 1 second
    setTimeout(() => {
      setIsUploading(false);

      // Call the provided onSubmit with the edit data
      onSubmit({
        id: item.id, // Keep the original properties like id
        description: editData.description,
        filename: editData.filename,
      });

      // Close the modal
      onClose();
    }, 1000);
  };

  // Reset form when modal closes
  const handleClose = () => {
    setEditData({
      description: item?.description || "",
      filename: item?.filename || "",
    });
    setImagePreview(item?.filename ? `LearningImages/${item.filename}` : null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Item
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Description field */}
          <TextField
            label="Description"
            fullWidth
            value={editData.description}
            onChange={handleDescriptionChange}
            variant="outlined"
            disabled={isUploading}
          />

          {/* Image upload section */}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Current Image
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px dashed #ccc",
                borderRadius: 1,
                p: 2,
                mb: 2,
                minHeight: 200,
                justifyContent: "center",
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Item preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 200,
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ImageIcon sx={{ fontSize: 60, color: "#aaa" }} />
                  <Typography variant="body2" color="textSecondary">
                    No image selected
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                component="span"
                onClick={handleBrowseClick}
                disabled={isUploading}
              >
                Browse Image
              </Button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />

              {editData.filename && (
                <Typography variant="body2" color="textSecondary">
                  {editData.filename}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit" disabled={isUploading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isUploading}
          startIcon={isUploading ? <CircularProgress size={20} /> : null}
        >
          {isUploading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemModal;
