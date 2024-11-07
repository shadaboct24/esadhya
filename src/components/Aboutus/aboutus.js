import React from 'react';
import { Box, Typography, Card, Avatar, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Paper elevation={5} sx={{width:"80vw",marginTop:'10vh',backgroundColor:"transparent",marginLeft:"12vw"}}>
    <Box sx={{ padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
      {/* Introduction Section */}
      <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          About Us
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We are a company dedicated to providing the best services and solutions for our clients. Our team is committed to excellence and strives to achieve the best outcomes for every project.
        </Typography>
      </Box>

      {/* Mission and Vision Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap' }}>
        <Card sx={{ flex: '1 1 45%', margin: '10px', padding: '20px', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Our Mission
          </Typography>
          <Typography variant="body1" color="textSecondary">
            To deliver top-notch solutions that drive success for our clients and positively impact their businesses.
          </Typography>
        </Card>
        <Card sx={{ flex: '1 1 45%', margin: '10px', padding: '20px', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Our Vision
          </Typography>
          <Typography variant="body1" color="textSecondary">
            To be the leading provider of innovative services in our industry, shaping the future of technology and business.
          </Typography>
        </Card>
      </Box>

      {/* Our Team Section */}
      <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Meet Our Team
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Our dedicated team members are experts in their fields and work hard to bring you the best solutions.
        </Typography>
      </Box>

      {/* Responsive Team Members */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, // 1 column for xs, 2 columns for sm, 3 columns for md+
          gap: '20px', // Space between cards
        }}
      >
        {/* Team Member 1 */}
        <Card sx={{ textAlign: 'center', padding: '20px' }}>
          <Avatar
            alt="Team Member"
            src="\Images\shadab.png"
            sx={{ width: 150, height: 150, margin: 'auto', marginBottom: '20px' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Md Shadab
          </Typography>
          <Typography variant="body2" color="textSecondary">
            CEO & Founder
          </Typography>
        </Card>

        {/* Team Member 2 */}
        <Card sx={{ textAlign: 'center', padding: '20px' }}>
          <Avatar
            alt="Team Member"
            src="\Images\ranjan.png"
            sx={{ width: 150, height: 150, margin: 'auto', marginBottom: '20px' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Abhishek ranjan
          </Typography>
          <Typography variant="body2" color="textSecondary">
            CTO
          </Typography>
        </Card>

        {/* Team Member 3 */}
        <Card sx={{ textAlign: 'center', padding: '20px' }}>
          <Avatar
            alt="Team Member"
            src="\Images\mohit.png"
            sx={{ width: 150, height: 150, margin: 'auto', marginBottom: '20px' }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Mohit takzare
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Head of Operations
          </Typography>
        </Card>
      </Box>
    </Box>
    </Paper>
  );
};

export default AboutUs;
