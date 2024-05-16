import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import projectStore from './stores/projects.store';
import ProjectFilter from './components/ProjectFilter';
import ProjectTable from './components/ProjectTable';

const ProjectList = observer(() => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    projectStore.fetchProjects();
  }, []);

  const filteredProjects = filter 
    ? Object.values(projectStore.projects).filter(project => project.status === filter)
    : Object.values(projectStore.projects);

  return (
    <>
      <h1>Projects</h1>
      <ProjectFilter filter={filter} setFilter={setFilter} />
      <ProjectTable projects={filteredProjects} />
    </>
  );
});

export default ProjectList;
