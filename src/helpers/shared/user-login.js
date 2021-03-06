import axios from 'axios';

import { APPROVAL_API_BASE, RBAC_API_BASE } from '../../utilities/constants';
import { GroupApi, PrincipalApi, AccessApi } from '@redhat-cloud-services/rbac-client';
import { WorkflowApi, ActionApi, RequestApi, TemplateApi } from '@redhat-cloud-services/approval-client';

const axiosInstance = axios.create();

const resolveInterceptor = response => response.data || response;

axiosInstance.interceptors.response.use(resolveInterceptor);

const workflowApi = new WorkflowApi(undefined, APPROVAL_API_BASE, axiosInstance);
const actionApi = new ActionApi(undefined, APPROVAL_API_BASE, axiosInstance);
const requestApi = new RequestApi(undefined, APPROVAL_API_BASE, axiosInstance);
const templateApi = new TemplateApi(undefined, APPROVAL_API_BASE, axiosInstance);

const rbacAccessApi = new AccessApi(undefined, RBAC_API_BASE, axiosInstance);
const rbacPrincipalApi = new PrincipalApi(undefined, RBAC_API_BASE, axiosInstance);
const rbacGroupApi = new GroupApi(undefined, RBAC_API_BASE, axiosInstance);

export function getRequestApi() {
  return requestApi;
}

export function getTemplateApi() {
  return templateApi;
}

export function getWorkflowApi() {
  return workflowApi;
}

export function getActionApi() {
  return actionApi;
}

export function getRbacAccessApi() {
  return rbacAccessApi;
}

export function getRbacPrincipalApi() {
  return rbacPrincipalApi;
}

export function getRbacGroupApi() {
  return rbacGroupApi;
}

