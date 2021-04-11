module.exports = {

    COMMON: {
        PREFIX: '/common',
        SEARCH: "/search"
    },

    USER: {
        PREFIX: '/users',
        GET_USER: "/user/:id",
        PUT_USER: "/user/:id",
        DELETE_USER: "/user/:id",
        SIGNUP: "/signup",
        LOGIN: "/login",
    },

    ADVERTISTMENT: {
        PREFIX: '/advertistments',
        SINGLE_ITEM: "/advertistment/:id",
        UPLOAD: "/upload/:adId",
        SEARCH: "/search",
        GET_IMAGES: "/get-images/:adId",
        GET_ADS_WITH_SINGLE_IMAGE: "/get-ads-image"
    },

    BRAND: {
        PREFIX: '/brands',
        SINGLE_ITEM: "/brand/:id",
    },

}
