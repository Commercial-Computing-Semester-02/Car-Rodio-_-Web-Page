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
        RESET_PASSWORD: "/user/reset-user-password/:id" 
    },

    ADVERTISTMENT: {
        PREFIX: '/advertistments',
        SINGLE_ITEM: "/advertistment/:id",
        UPLOAD: "/upload/:adId",
        SEARCH: "/search",
        GET_IMAGES: "/get-images/:adId",
        GET_ADS_WITH_SINGLE_IMAGE: "/get-ads-image",
        GET_SEARCH_ADS_WITH_SINGLE_IMAGE: "/search/get-ads-image"
    },

    BRAND: {
        PREFIX: '/brands',
        SINGLE_ITEM: "/brand/:id",
    },

    COMMENT: {
        PREFIX: '/comments',
        SINGLE_ITEM: "/comment/:id",
        GET_BY_POSTID: "/get-for-post/:id"
    },

    RATING: {
        PREFIX: '/ratings',
        SINGLE_ITEM: "/rating/:id",
        SEARCH: "/search"
    },

}
