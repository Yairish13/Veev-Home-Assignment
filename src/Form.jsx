import React, { useState } from 'react';
import { FormControl, Input, InputLabel, Button, Grid } from '@mui/material';
import projectStore from './stores/projects.store';

export default function ProjectForm({ onClose }) {
    const [formData, setFormData] = useState({
        projectName: '',
        startDate: '',
        estimatedEndDate: '',
        description: '',
        startingBudget: '',
        currentCost: '',
        status: 'Planning'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await projectStore.createProject(formData);
        onClose();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="projectName">Project Name</InputLabel>
                            <Input
                                id="projectName"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="startDate">Start Date</InputLabel>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="estimatedEndDate">Estimated End Date</InputLabel>
                            <Input
                                id="estimatedEndDate"
                                name="estimatedEndDate"
                                type="date"
                                value={formData.estimatedEndDate}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="startingBudget">Starting Budget</InputLabel>
                            <Input
                                id="startingBudget"
                                name="startingBudget"
                                value={formData.startingBudget}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
