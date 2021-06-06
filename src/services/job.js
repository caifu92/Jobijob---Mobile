import NetworkHelper from './helper/NetworkHelper'

export const getAll = (pageNo, query) => {
    return NetworkHelper.get(`/jobs?page=${pageNo}&${query}`, false);
}

export const getById = (id) => {
    return NetworkHelper.get(`/jobs/${id}`, false);
}

export const getApplied = (pageNo) => {
    return NetworkHelper.get(`/applied_jobs?page=${pageNo}`, true);
}

export const getApplicantStatus = (id) => {
    return NetworkHelper.get(`/jobs/${id}/applicant_status`, true);
}

export const applyJob = (id, data) => {
    return NetworkHelper.post(`/jobs/${id}/apply`, data, true);
}
