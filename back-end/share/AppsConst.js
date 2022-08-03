const  AppsConst = {

    userType: {
        user:"USER",
        admin: "ADMIN"
    },

    RequestType:{

    CODE_200 : 200,   // request ok
     CODE_201 : 201,   // created

     CODE_204 : 204,   // no content dont use
     CODE_400 : 400,	// Bad request (something wrong with URL or parameters)
     CODE_401 : 401,	// Not authorized (not logged in)
     CODE_403 : 403,	// Logged in but access to requested area is forbidden
     CODE_404 : 404,	// Not Found (page or other resource doesn’t exist)
     CODE_405 : 405,   // The request type is not allowed
     CODE_422 : 422,	// Unprocessable Entity (validation failed)
     CODE_429 : 429,   // Too many attempts
     CODE_500 : 500,   // General server error
     CODE_503 : 503,   // On maintenance mode

     ACTION_TYPE_NEW : 'new',
     ACTION_TYPE_EDIT : 'edit',
     ACTION_TYPE_DELETE : 'delete',
    }
}

module.exports = {
    AppsConst: AppsConst
}

    
