import Axios from 'axios';

import { ENV } from '@waldur/configs/default';
import { deleteById, getById, getList, post } from '@waldur/core/api';
import { formatDate } from '@waldur/core/dateUtils';
import { Customer, Project } from '@waldur/workspace/types';

export const getProject = (projectId: string) =>
  getById<Project>('/projects/', projectId);

export const getCustomer = (customerId: string) =>
  getById<Customer>('/customers/', customerId);

export const getCustomersList = (params) =>
  getList<Customer>('/customers/', params);

export const createProject = (project) =>
  Axios.post(`${ENV.apiEndpoint}api/projects/`, {
    name: project.name,
    description: project.description,
    end_date: project.end_date ? formatDate(project.end_date) : undefined,
    customer: project.customer.url,
    type: project.type && project.type.url,
  });

export const updateProject = (project) =>
  Axios.patch(`${ENV.apiEndpoint}api/projects/${project.uuid}/`, {
    name: project.name,
    description: project.description,
    end_date: project.end_date ? formatDate(project.end_date) : undefined,
    backend_id: project.backend_id,
  });

export const moveProject = (data) =>
  post(`/projects/${data.project.uuid}/move_project/`, {
    customer: {
      url: data.organization.url,
    },
  });

export const deleteCustomer = (customerId: string) =>
  deleteById('/customers/', customerId);

export const deleteProject = (projectId: string) =>
  deleteById('/projects/', projectId);

export const loadProjectTypes = () =>
  Axios.get(`${ENV.apiEndpoint}api/project-types/`).then(
    (response) => response.data,
  );

export const dangerouslyUpdateProject = (cache, project) => {
  cache.name = project.name;
  cache.description = project.description;
};

export const dangerouslyUpdateCustomer = (customer, project) => {
  const item = customer.projects.find((p) => p.uuid === project.uuid);
  if (item) {
    item.name = project.name;
    item.description = project.description;
  }
};
