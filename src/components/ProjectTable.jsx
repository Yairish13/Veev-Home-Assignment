import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const ProjectTable = ({ projects }) => {
  const navigate = useNavigate();

  const handleRowClick = (projectId) => {
    navigate(`/${projectId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Project Name</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Estimated Completion Date</TableCell>
            <TableCell align="center">Current Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleRowClick(project.id)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell align="center">{project.projectName}</TableCell>
              <TableCell align="center">{project.startDate}</TableCell>
              <TableCell align="center">{project.estimatedEndDate}</TableCell>
              <TableCell align="center">{project.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
