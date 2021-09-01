import axios from 'axios';
var url = 'http://localhost:7070';
var user = JSON.parse(sessionStorage.getItem('authService'));
export var fetchImageUploaded = function () {
    if (user) {
        return axios.get(url + ("/uploads/" + user.id)).then(function (files) {
            return files.data;
        });
    }
};
export var deleteFile = function (fileUrl) {
    if (user) {
        return axios.delete(url + ("/uploads?userId=" + user.id + "&url=" + fileUrl)).then(function () {
            return 1;
        }).catch(function () { return 0; });
    }
};
export var deleteFileYoutube = function (fileUrl) {
    if (user) {
        return axios.delete(url + ("/uploads/youtube?userId=" + user.id + "&url=" + fileUrl)).then(function () {
            return 1;
        }).catch(function () { return 0; });
    }
};
export var uploadVideoYoutube = function (videoId) {
    var body = {
        userId: user.id,
        data: [{
                source: 'youtube',
                type: 'video',
                url: 'https://www.youtube.com/embed/' + videoId
            }]
    };
    var headers = new Headers();
    return axios.post(url + '/uploads/youtube', body, { headers: headers }).then(function () { return 1; }).catch(function () { return 0; });
};
export var getUser = function () {
    return axios.get(url + '/image/users/' + user.id).then(function (r) { return r.data; }).catch(function (e) { return e; });
};
export var updateData = function (data) {
    var body = {
        data: data,
        userId: user.id
    };
    return axios.patch(url + '/uploads', body).then(function (r) { return r.data; }).catch(function (e) { return e; });
};
//# sourceMappingURL=service.js.map