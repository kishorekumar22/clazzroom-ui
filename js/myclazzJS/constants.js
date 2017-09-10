'use strict';
myclazzApp.constant('CONSTANTS', (function() {
  var MAIN_URL = 'http://localhost:8090/myclazzApi';
  return {
    REST_URL: MAIN_URL,
    LOGIN_API: 'http://localhost:8090/login',
    GET_USER_API: MAIN_URL + '/get_student',
    CREATE_USER: MAIN_URL + '/create_student',
    UPDATE_USER: MAIN_URL + '/update_student',
    CREATE_CLAZZ: MAIN_URL + '/create_clazz',
    ADD_CLAZZ_MEMBER : MAIN_URL + '/add_clazz_member',
    REMOVE_CLAZZ_MEMBER : MAIN_URL +'/remove_clazz_member',
    GET_CLAZZ_INFO : MAIN_URL + "/get_clazz_info",
    ADD_CLAZZ_ASSIGNMENT : MAIN_URL + "/add_clazz_assignment",
    GET_CLAZZ_ASSIGNMENTS : MAIN_URL + "/get_clazz_assignments",
    REMOVE_CLAZZ_ASSIGNMENT : MAIN_URL + "/remove_clazz_assignment",
    GET_STUDENT_INFO : MAIN_URL + "/get_student_info",
    UPLOAD_DOCUMENT : MAIN_URL + "/upload_document",
    GET_UPLOADED_DOCUMENTS : MAIN_URL + "/get_uploaded_documents",
    DELETE_UPLOADED_DOCUMENTS : MAIN_URL + "/delete_uploaded_document",
    DOWNLOAD_UPLOADED_DOCUMENTS : MAIN_URL + "/download_uploaded_document",
    GET_LOGGEDIN_STUDENT_URL : MAIN_URL + "/get_loggedin_stu",
    SAVE_DISCUSSIONS_API : MAIN_URL + "/add_post",
    GET_DISCUSSIONS_API : MAIN_URL + "/get_clazz_posts/",
    DELETE_DISCUSSION_API : MAIN_URL + "/delete_post",
    SAVE_DISCUSSION_COMMEMT_API : MAIN_URL + "/add_post_comment/",
    DELETE_DISCUSSION_COMMEMT_API  : MAIN_URL + "/delete_post_comment/",
    LOGOUT_URL : MAIN_URL + "/logout",
    MAX_UPLOAD_SIZE: 10000000,//10MB
    MAX_UPLOAD_COUNT: 8,
    MAX_IMAGE_SIZE : 4000000//4MB
  }
})());
