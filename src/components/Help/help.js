import React from 'react';
import { Box, Typography, Card, Paper } from '@mui/material';

const Help = () => {
  return (
    <>
       <Paper elevation={5} sx={{width:'80vw', marginTop:'10vh', backgroundColor:'transparent', marginLeft:'12vw'}}>

       <Box sx={{ padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
      {/* Help Title Section */}
      <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Help & Support
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We're here to assist you. Find answers to your questions and resources to help you navigate our services.
        </Typography>
      </Box>

      {/* Common Issues Section */}
      <Box sx={{ marginBottom: '40px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
          Common Issues
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: '20px' }}>
          {/* Issue 1 */}
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Account Access
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Having trouble logging in? Make sure you're using the correct email and password, or reset your password if needed.
            </Typography>
          </Card>

          {/* Issue 2 */}
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Updating Profile Information
            </Typography>
            <Typography variant="body2" color="textSecondary">
              To update your profile details, navigate to the account settings page, where you can change your information.
            </Typography>
          </Card>

          {/* Issue 3 */}
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Payment Issues
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Encountering issues with payments? Ensure your payment details are correct or contact our support team for help.
            </Typography>
          </Card>
        </Box>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ marginBottom: '40px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
          Frequently Asked Questions (FAQs)
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: '20px' }}>
          {/* FAQ 1 */}
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              How do I reset my password?
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Click on the "Forgot Password" link on the login page and follow the instructions to reset your password.
            </Typography>
          </Card>

          {/* FAQ 2 */}
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              How can I contact support?
            </Typography>
            <Typography variant="body2" color="textSecondary">
              You can reach our support team by emailing support@yourcompany.com or by calling our support hotline.
            </Typography>
          </Card>

          {/* FAQ 3 */}
          <Card sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Where can I update my payment method?
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Go to the "Billing" section under your account settings to update or change your payment details.
            </Typography>
          </Card>
        </Box>
      </Box>

      {/* Contact Us Section */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Need Further Assistance?
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '20px' }}>
          If you couldn't find the answer you were looking for, feel free to reach out to our support team. We're here to help!
        </Typography>
        <Typography variant="h6" color="primary">
          Email: support@yourcompany.com
        </Typography>
        <Typography variant="h6" color="primary">
          Phone: +1 (123) 456-7890
        </Typography>
      </Box>
    </Box>

       </Paper>
    </>
  );
};

export default Help;
