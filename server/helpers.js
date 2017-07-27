function verifyRequestBody(body) {
    if (!body.humidity || !body.temperature)
        throw new Error('body must have humidity and temperature');
    if (!body.credential || body.credential !== process.env.DEVICE_CREDENTIAL)
        throw new Error('wrong device credential');
    if(body.humidity < -100 || body.humidity> 100)
        throw new Error('Invalid humidity');
    if(body.temperature < -100 || body.temperature > 100)
        throw new Error('Invalid temperature');
}

function deleteCredentialProperty(body) {
    Reflect.deleteProperty(body, 'credential');
}

function handleError(msg){
    console.log(msg);
}

const containerName = 'statuscontainer';
const latestBlob = 'latest';
const NOT_AVAILABLE = 'N/A';

module.exports = {
    verifyRequestBody,
    deleteCredentialProperty,
    handleError,
    containerName,
    latestBlob,
    NOT_AVAILABLE
}