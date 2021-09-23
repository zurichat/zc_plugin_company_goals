import axios from 'axios'

export async function getUserToken(){
    return axios
    .post('https://api.zuri.chat/auth/login', {
        email: 'creator@goals.com',
        password: 'Password123##',
    })
    .then((res) => res.data.data.user.token)
    .catch((error) => console.log(error));
}

export async function setNewMission(){
    const token = await getUserToken();
    const orgId = '6145d099285e4a184020742e';
    const mission = 'some mission right here';
    const headers = {
        'Authorization' : `Bearer ${token} ${orgId}`
    }

    console.log(token);

    return await axios
    .patch(`http://localhost:4000/api/v1/mission/update/${orgId}` , mission , { headers })
    .then(response => response)
    .catch(error => console.log(error))
}

export async function getMission(){
    console.log("I dey here o")
    return await axios 
    .get('http://localhost:4000/api/v1/mission/1')
    .then(response => response)
    .catch(error => console.log(error))
}