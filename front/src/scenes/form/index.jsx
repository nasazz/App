import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { getUserById, registerUser, updateUser } from '../../Services/userService';

const Form = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Retrieve the userId from URL params
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    plant: '',
    department: '',
    team: '',
    role: '',
    password: '',
  });

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const user = await getUserById(userId);
          setUserData(user);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await updateUser(userId, userData);
      } else {
        await registerUser(userData);
      }
      navigate('/team');
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  return (
    <Box m="20px">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Plant"
          name="plant"
          value={userData.plant}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Department"
          name="department"
          value={userData.department}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Team"
          name="team"
          value={userData.team}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={userData.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {!userId && (
          <TextField
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}
        <Button type="submit" variant="contained" color="secondary">
          {userId ? 'Update User' : 'Register User'}
        </Button>
      </form>
    </Box>
  );
};

export default Form;
