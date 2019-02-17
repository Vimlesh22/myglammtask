function successResponse(status,message,data) {
    var response = {
        status : status,
        message : message,
        user : data
    }
    return response
}

function errorResponse(status,message,error)
{
    var response = {
        status : status,
        message : message,
        eroor : error
    }
    return response
}

module.exports = {
    successResponse ,errorResponse
}