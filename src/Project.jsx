import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, FormControl, Select, MenuItem } from '@mui/material';
import projectStore from './stores/projects.store';

const Detail = ({ title, detail, onChange }) => (
    <div style={{ marginBottom: '10px' }}>
        <Typography component="span" fontWeight="bold">{title}: </Typography>
        {onChange ? (
            <TextField
                defaultValue={detail}
                onBlur={(e) => onChange(e.target.value)}
                size="small"
                variant="outlined"
            />
        ) : (
            <Typography component="span">{detail}</Typography>
        )}
    </div>
);

const ProjectDetails = observer(() => {
    const { id } = useParams();
    useEffect(() => {
        projectStore.fetchProjectDetails(id);
    }, [id]);

    const project = projectStore.projectDetails;
    if (!project) {
        return <Typography>Loading...</Typography>;
    }

    const handleStatusChange = (newStatus) => {
        projectStore.updateProject(id, { ...project, status: newStatus });
    };

    const handleCostChange = (newCost) => {
        projectStore.updateProject(id, { ...project, currentCost: parseFloat(newCost) });
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Project Details</Typography>
            <Detail title="Project Name" detail={project.projectName} />
            <Detail title="Start Date" detail={project.startDate} />
            <Detail title="Estimated Completion Date" detail={project.estimatedEndDate} />
            <Detail title="Completion Date" detail={project.endDate} />
            <Detail title="Description" detail={project.description} />
            <Detail title="Starting Budget" detail={project.startingBudget} />
            <Detail title="Current Cost" detail={project.currentCost} onChange={handleCostChange} />
            {(Number(project.currentCost) > Number(project.startingBudget)) && "There is an exception in expenses"}
            <FormControl fullWidth margin="normal">
                <Detail title="Current Status" />
                <Select
                    value={project.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    <MenuItem value="Planning">Planning</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Forced Closed">Forced Closed</MenuItem>
                </Select>
            </FormControl>            <Button variant="contained" color="primary" onClick={() => projectStore.calculateCost(id)}>
                Calculate Daily Costs
            </Button>
        </div>
    );
});

export default ProjectDetails;
