import axios from 'axios';

const apiReceptionist = `https://stagingapi.trangbeautycenter.com/api/bookings/get-data-with-filter`
const apiCounselors = `https://stagingapi.trangbeautycenter.com/api/queue-consultation/get-data-with-filter`
const apiTechnicians = `https://stagingapi.trangbeautycenter.com/api/treatment-queue`
const branch = `https://stagingapi.trangbeautycenter.com/api/branch/all`

// const apiReceptionist = `https://api.trangbeautycenter.com/api/bookings/get-data-with-filter`
// const apiCounselors = `https://api.trangbeautycenter.com/api/queue-consultation/get-data-with-filter`
// const apiTechnicians = `https://api.trangbeautycenter.com/api/treatment-queue`
// const branch = `https://api.trangbeautycenter.com/api/branch/all`

export {apiReceptionist,apiCounselors,apiTechnicians,branch}