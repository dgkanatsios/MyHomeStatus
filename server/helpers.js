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

//gets a string containing json objects separated by LF and makes it an array
function createJsonObjectsArrayFromString(jsonstring){
    const array = jsonstring.split('\n');
    return array;
}

//converts an array of json objects to string, separated by LF
function createStringFromJsonObjects(jsonarray){
    let jsonstring = '';
    jsonarray.forEach(x=>jsonstring+=`${x}\n`);
    return jsonstring;
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
    createJsonObjectsArrayFromString,
    createStringFromJsonObjects,
    NOT_AVAILABLE
}