import NetworkHelper from './helper/NetworkHelper'

export const getAll = (pageNo) => {
    return NetworkHelper.get(`/jobs?page=${pageNo}`, false);
}

export const getById = (id) => {
    return NetworkHelper.get(`/jobs/${id}`, false);
}

export const getApplied = () => {
    return NetworkHelper.get('/applied_jobs', true);
}

export const getApplicantStatus = (id) => {
    return NetworkHelper.get(`/jobs/${id}/applicant_status`, true);
}

export const applyJob = (id, data) => {
    return NetworkHelper.post(`/jobs/${id}/apply`, data, true);
}
