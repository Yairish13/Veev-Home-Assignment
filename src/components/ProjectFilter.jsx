import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ProjectFilter = ({ filter, setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="status-filter-label">Status Filter</InputLabel>
      <Select
        labelId="status-filter-label"
        value={filter}
        label="Status Filter"
        onChange={handleChange}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Planning">Planning</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ProjectFilter;
