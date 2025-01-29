import axios from 'axios'

const url = "/api/persons"

const showAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = updatedPerson => {
    const request = axios.put(`${url}/${updatedPerson._id}`, updatedPerson)
    return request.then(response => response.data)
}

export default { showAll, create, remove, updateNumber }