import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import {
  Box,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { API_URL } from "../../Constants/api_url";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import EditItemModal from "./EditModalForPicture";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";

export default function PictureEditandUpdateUpload() {
  // State declarations
  const [allSubjects, setAllSubjects] = useState([]);
  const [subjectCategories, setSubjectCategories] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [newitemModalOpen, setNewItemModalOpen] = useState(false);

  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  // const [isUploading, setIsUploading] = useState(false); // Optional: for upload progress

  // Form state
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    filename: "",
    description: "",
    instructorId: "",
  });

  const handleEditClick = (item) => {
    setCurrentEditItem(item);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (updatedItem) => {
    console.log("Item updated:", updatedItem);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://localhost:8082/api/caisubjectcategoryitem/edit",
      headers: {
        "Content-Type": "application/json",
      },
      data: updatedItem,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        fetchCategoryItems(formData.category);
      })
      .catch((error) => {
        console.log(error);
      });

    // For now, just refresh the items list
  };
  // Initial data fetch on component mount
  useEffect(() => {
    fetchAllSubjects();
    getInstructorIdFromToken();
  }, []);

  // Fetch subjects when component loads
  const fetchAllSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/caisubjects/getall`);
      setAllSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setError("Failed to load subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get instructor ID from JWT token
  const getInstructorIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(JSON.parse(token));
        const instructorId = decoded?.user;
        if (instructorId) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            instructorId: instructorId,
          }));
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  // Fetch categories when subject changes
  const fetchSubjectCategories = async (subjectId) => {
    if (!subjectId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_URL}/api/caisubjectscategory/getbysubject/${subjectId}`
      );
      setSubjectCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again.");
      setSubjectCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch items when category changes
  const fetchCategoryItems = async (categoryId) => {
    if (!categoryId) return;

    setLoading(true);
    setError(null);
    // Reset selected items before new data comes
    // setFormData((prev) => ({ ...prev, }));

    try {
      const response = await axios.get(
        `${API_URL}/api/caisubjectcategoryitems/getall/${categoryId}`
      );
      setCategoryItems(response.data || []);
    } catch (error) {
      console.error("Error fetching category items:", error);
      setError("Failed to load items. Please try again.");
      setCategoryItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update form data first
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Then trigger appropriate data fetches
    if (name === "subject") {
      setFormData((prev) => ({ ...prev, category: "" }));
      setSubjectCategories([]);
      setCategoryItems([]);
      fetchSubjectCategories(value);
    } else if (name === "category") {
      setFormData((prev) => ({ ...prev }));
      setCategoryItems([]);
      fetchCategoryItems(value);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validation could be added here
    if (!formData.subject || !formData.category) {
      setError("Please select subject and category");
      return;
    }

    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8082/api/caisubjectcategorynewEntry",
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        fetchCategoryItems(formData.category);
      })
      .catch((error) => {
        console.log(error);
      });

    // Reset form after submission
    setFormData({
      subject: formData.subject,
      category: formData.category,
      filename: "",
      description: "",
      instructorId: formData.instructorId,
    });
    setPreviewUrl(null); // Reset preview URL
    setNewItemModalOpen(false); // Close the modal

    // Reset related states
    // setSubjectCategories([]);
    // setCategoryItems([]);
  };

  // Delete an item
  const deleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.delete(
        `${API_URL}/api/caisubjectcategoryitem/deletebyid/${itemId}`
      );
      // Refresh the items list after successful deletion
      fetchCategoryItems(formData.category);
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Save the filename
      setFormData((prev) => ({
        ...prev,
        filename: file.name,
      }));

      // Generate preview URL
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px",
        }}
      >
        <TextField
          select
          fullWidth
          name="subject"
          label="Select Subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={loading}
        >
          {allSubjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          name="category"
          label="Select Category"
          value={formData.category}
          onChange={handleChange}
          disabled={!formData.subject || loading}
        >
          {subjectCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>

      {formData.category && categoryItems.length > 0 && (
        <>
          <Sheet
            variant="outlined"
            sx={(theme) => ({
              "--TableCell-height": "40px",
              "--TableHeader-height": "calc(1 * var(--TableCell-height))",
              "--Table-firstColumnWidth": "80px",
              "--Table-lastColumnWidth": "144px",
              "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
              "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
              overflow: "auto",
              background: `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
              backgroundSize:
                "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "local, local, scroll, scroll",
              backgroundPosition:
                "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
              backgroundColor: "background.surface",
            })}
          >
            <Table
              borderAxis="bothBetween"
              stripe="odd"
              hoverRow
              sx={{
                "& tr > *:first-child": {
                  position: "sticky",
                  left: 0,
                  boxShadow: "1px 0 var(--TableCell-borderColor)",
                  bgcolor: "background.surface",
                },
                "& tr > *:last-child": {
                  position: "sticky",
                  right: 0,
                  bgcolor: "var(--TableCell-headBackground)",
                },
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: "var(--Table-firstColumnWidth)" }}>
                    Row
                  </th>
                  <th style={{ width: 100 }}>Item</th>
                  <th style={{ width: 100 }}>Image</th>
                  <th
                    aria-label="last"
                    style={{
                      width: "var(--Table-lastColumnWidth)",
                      textAlign: "center",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.description}</td>
                    <td>
                      <img
                        src={`LearningImages/${item.filename}`}
                        alt={item.description || "Item image"}
                        style={{
                          maxWidth: "50px",
                          height: "auto",
                          borderRadius: "8px",
                          display: "block",
                        }}
                      />
                    </td>
                    <td>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="sm"
                          variant="plain"
                          color="neutral"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="soft"
                          color="danger"
                          onClick={() => deleteItem(item.id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <Box sx={{ display: "flex", justifyContent: "center", p: 2, gap: 2 }}>
            <Typography>Add a New Item In This Category</Typography>
            <Button onClick={() => setNewItemModalOpen(true)}>ADD</Button>
          </Box>
        </>
      )}

      {formData.category && categoryItems.length === 0 && !loading && (
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography level="body-lg">
            No items found for this category.
          </Typography>
        </Box>
      )}
      <EditItemModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={currentEditItem}
        onSubmit={handleEditSubmit}
      />
      <Dialog
        open={newitemModalOpen}
        onClose={() => setNewItemModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add A New Item
          <IconButton
            aria-label="close"
            onClick={() => setNewItemModalOpen(false)}
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
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              // disabled={isUploading}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="soft"
                color="neutral"
                component="span"
                onClick={handleBrowseClick}
                // disabled={isUploading}
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

              {formData.filename && (
                <Typography variant="body2" color="textSecondary">
                  {formData.filename}
                </Typography>
              )}
            </Box>
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
              {previewUrl ? (
                <img
                  src={previewUrl}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setNewItemModalOpen(false)}
            variant="soft"
            color="primary"
            // disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="solid"
            color="primary"
            // disabled={isUploading}
            // startIcon={isUploading ? <CircularProgress size={20} /> : null}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
