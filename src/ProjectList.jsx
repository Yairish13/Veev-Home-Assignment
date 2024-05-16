import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Box, Typography } from '@mui/material';
import projectStore from './stores/projects.store';
import ProjectFilter from './components/ProjectFilter';
import ProjectTable from './components/ProjectTable';
import ProjectForm from './Form';

const ProjectList = observer(() => {
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    projectStore.fetchProjects();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredProjects = filter
    ? Object.values(projectStore.projects).filter(project => project.status === filter)
    : Object.values(projectStore.projects);

  return (
    <>
      <h1>Projects</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Project
      </Button>
      <ProjectFilter filter={filter} setFilter={setFilter} />
      <ProjectTable projects={filteredProjects} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography variant="h6" component="h2">
            New Project Form
          </Typography>
          <ProjectForm onClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default ProjectList;
