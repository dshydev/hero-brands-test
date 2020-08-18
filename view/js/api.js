const api = 'api'

class Api {
    async getMedicalRecords(id) {
        try {
            const response = await fetch(`https://jsonmock.hackerrank.com/api/medical_records?userId=${id}`);
            return await response.json();
        } catch(err) {
            console.log('request error', err)
        }
    }
}

export default new Api(fetch);
