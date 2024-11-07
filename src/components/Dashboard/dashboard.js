import React from 'react';
import { Box, Grid, Card, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Nursery', boys: 15, girls: 20 },
  { name: 'LKG', boys: 12, girls: 18 },
  { name: 'UKG', boys: 10, girls: 15 },
  { name: 'Class 1', boys: 20, girls: 25 },
  { name: 'Class 2', boys: 18, girls: 22 },
  { name: 'Class 3', boys: 10, girls: 12 },
  { name: 'Class 4', boys: 15, girls: 18 },
  { name: 'Class 5', boys: 14, girls: 16 },
];

const Dashboard = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      {/* Top section with Student Strength, No. of Girls, No. of Boys */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">Student Strength</Typography>
            <Typography variant="h3">114</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">No. of Girls</Typography>
            <Typography variant="h3">54</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">No. of Boys</Typography>
            <Typography variant="h3">60</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Class-wise Student Distribution */}
      <Card sx={{ padding: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: '20px' }}>Class-wise student distribution</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="boys" fill="#0088FE" />
            <Bar dataKey="girls" fill="#FF00FF" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
};

export default Dashboard;
