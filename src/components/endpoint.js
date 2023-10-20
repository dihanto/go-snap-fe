const host = {
    baseUrl: 'http://localhost:8000',
    commentEndpoint : {
        writeComment: () => {
            return `${host.baseUrl}/comments`;
        },
        getComment: () => {
            return `${host.baseUrl}/comments`;
        },
    },
    photoEndpoint : {
        getPhoto : () => {
            return `${host.baseUrl}/photos`;
        },
        likePhoto : (photoId) => {
            return `${host.baseUrl}/photos/${photoId}/likes`;
        },
        postPhoto:() => {
            return `${host.baseUrl}/photos`;
        }
    },
    followEndpoint : {
        follow: (username) => {
            return `${host.baseUrl}/follows/${username}`;
        },
        getFollowing: () => {
            return `${host.baseUrl}/follows/following`;
        }
    },
    likeEndpoint : {
        like: (photoId) => {
            return `${host.baseUrl}/photos/${photoId}/likes`;
        },
        unlike: (photoId) => {
            return `${host.baseUrl}/photos/${photoId}/unlikes`;
        }
    },
    UserEndpoint : {
        login: () => {
            return `${host.baseUrl}/users/login`;
        },
        register : () => {
            return `${host.baseUrl}/users/register`;
        },
        getUserLogin : () => {
            return `${host.baseUrl}/users`;
        },
        getAllUser : () => {
            return `${host.baseUrl}/users/all`;
        }
    }
}

export { host };
