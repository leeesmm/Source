
var restGit = (function(namespace, $, undefined){

    this.isDebug = true;    

    function log(log) {
        if (this.isDebug) console.log(log);
    };

    function ajaxCall(api, requestData, callback, isAuth, accept, isJSONParam) {
        var restApi = getRestApi(api);
        var responseData;
        var dataType;
        var data = requestData;

        log('isAuth : ' + isAuth);
        log('accept : ' + accept);
        log('url    : ' + restApi.url);
        log('method : ' + restApi.method);
        
        if ( isJSONParam ) {
            dataType = "application/json";
            data = JSON.stringify(requestData);
        }

        $.ajax({
          type: restApi.method,
          dataType: dataType,
          async: false,
          url: 'https://api.github.com' + restApi.url,
          data : data,
          beforeSend: function(request) {
               if ( isAuth ) {
                   request.setRequestHeader("Authorization", 'token 61c6773f49a97201b6b81c2ba55bd9ef15a852d3');
               }

               if ( accept != undefined && accept != null ) {
                   request.setRequestHeader("Accept", accept);
               }
          },
          
          success: function(response) {
              log('##########################################################');
              log(response);
              log('##########################################################');
              responseData = response;
              if (callback != null) callback(response);
          }
        });

        return responseData;
    }

    function getRestApi(api) {
        var url = '';
        var method = '';
        var testRepo = 'openobjectlab/code-mobile';

        switch ( api ) {
            //Dashboard
            case 'getDashboardSearchRepo':
                url = '/search/repositories';
                method = 'GET';
                break;
            case 'getDashboardSearchCommit':
                url = '/search/commits';
                method = 'GET';
                break;
            case 'getDashboardSearchIssue':
                url = '/search/issues';
                method = 'GET';
                break;
            case 'getDashboardSearchUser':
                url = '/search/users';
                method = 'GET';
                break;
            case 'getDashboardMyContributeRepoList':
                url = '/user/repos';
                method = 'GET';
                break;
            case 'getDashboardMyStarrdRepoList':
                url = '/user/starred';
                method = 'GET';
                break;

            //Pull Request
            case 'getPRMyCreatedList':
                url = '/search/issues?q=is:open+is:pr+author:leeesmm';
                method = 'GET';
                break;
            case 'getPRMyAssignedList':
                url = '/search/issues?q=is:open+is:pr+assignee:leeesmm';
                method = 'GET';
                break;
            case 'getPRMyMentionedList':
                url = '/search/issues?q=is:open+is:pr+mentions:leeesmm';
                method = 'GET';
                break;
            case 'getPRDetailConversationPRDetail':
                url = '/repos/leeesmm/TestSource/pulls/8';
                method = 'GET';
                break;
            case 'getPRDetailConversationCommitList':
                url = '/repos/leeesmm/TestSource/pulls/6/commits';
                method = 'GET';
                break;
            case 'getPRDetailConversationReviewList':
                url = '/repos/leeesmm/TestSource/pulls/6/reviews';
                method = 'GET';
                break;
            case 'getPRDetailConversationCommentList':
                url = '/repos/leeesmm/TestSource/issues/6/comments';
                method = 'GET';
                break;
            case 'updatePRDetailConversationComment':
                url = '/repos/leeesmm/TestSource/issues/comments/405491592';
                method = 'PATCH';
                break;
            case 'addPRDetailConversationComment':
                url = '/repos/leeesmm/TestSource/issues/6/comments';
                method = 'POST';
                break;
            case 'closePRDetailConversationComment':
                url = '/repos/leeesmm/TestSource/issues/comments/405491592';
                method = 'DELETE';
                break;



            //Repository Detail
            case 'getRepoDetailInfo':
                url = '/repos/' + testRepo;
                method = 'GET';
            case 'getRepoDetailCommit':
                url = '/repos/' + testRepo + '/commits';
                method = 'GET';
            default:
                break;
        }
        
        var restApi = {"url" : url , "method" : method};
        return restApi;
    }
    
    // Dashboard

    /** Dashboard > search > repository 
     *  method : GET
     *  parameter : {"q" : "검색어"}
     * */
    namespace.getDashboardSearchRepo = function(requestData, callback, errorCallback) {
        var data = {"q" : requestData};
        ajaxCall('getDashboardSearchRepo', data, callback, false);
    };
    
    /** Dashboard > search > commit 
     *  method : GET
     *  parameter : {"q" : "검색어"}
     * */
    namespace.getDashboardSearchCommit = function(requestData, callback, errorCallback) {
        var data = {"q" : requestData};
        ajaxCall('getDashboardSearchCommit', data, callback, false, 'application/vnd.github.cloak-preview');
    };
    
    /** Dashboard > search > issue 
     *  method : GET
     *  parameter : {"q" : "검색어"} 
     * */
    namespace.getDashboardSearchIssue = function(requestData, callback, errorCallback) {
        var data = {"q" : requestData};
        ajaxCall('getDashboardSearchIssue', data, callback, false);
    };
    
    /** Dashboard > search > user 
     *  method : GET
     *  parameter : {"q" : "검색어"} 
     * */
    namespace.getDashboardSearchUser = function(requestData, callback, errorCallback) {
        var data = {"q" : requestData};
        ajaxCall('getDashboardSearchUser', data, callback, false);
    };

    /** Dashboard > Recent activity List
     *  method : GET
     *  parameter : 
     * */

    /** Dashboard > Repositories you contribute to List
     *  method : GET
     *  parameter : {"affiliation":"owner"}
     * */
    namespace.getDashboardMyContributeRepoList = function(requestData, callback, errorCallback) {
        var data = {"affiliation":"owner"};
        ajaxCall('getDashboardMyContributeRepoList', data, callback, true);
    };

    /** Dashboard > Starred repository List
     *  method : GET
     *  parameter : 
     * */
    namespace.getDashboardMyStarrdRepoList = function(requestData, callback, errorCallback) {
        ajaxCall('getDashboardMyStarrdRepoList', null, callback, true);
    };



    // Pull Request
    /** Pull Request > Created List
     *  method : GET
     *  parameter : {"q":"is:pr+author:사용자ID"}
     * */
    namespace.getPRMyCreatedList = function(requestData, successCallback, errorCallback) {
        //ajaxCall('getPRMyCreatedList', null, callback, true);

        var form = $.extend(true, {}, MDHBasic.form);
        form.contextUrl = 'https://api.github.com' + getRestApi('getPRMyCreatedList').url;
        form.parameter = requestData;

        MDHBasic.SEMP.request(
            function (response) {
                if (successCallback != null) successCallback(response);
            }, 
            function (response) {
                 if (errorCallback != null) errorCallback(response);
            }, 
            form
        );
    };

     /** Pull Request > Assigned List
     *  method : GET
     *  parameter : {"q":"is:pr+assignee:사용자ID"}
     * */
    namespace.getPRMyAssignedList = function(requestData, callback, errorCallback) {
        ajaxCall('getPRMyAssignedList', null, callback, true);
    };

    /** Pull Request > Mentioned List
     *  method : GET
     *  parameter : {"q":"is:pr+mentions:사용자ID"}
     * */
    namespace.getPRMyMentionedList = function(requestData, callback, errorCallback) {
        ajaxCall('getPRMyMentionedList', null, callback, true);
    };

    /** Pull Request > Pull Request Detail > Conversation > Pull Request Detail
     *  method : GET
     *  parameter : 
     * */
    namespace.getPRDetailConversationPRDetail = function(requestData, callback, errorCallback) {
        ajaxCall('getPRDetailConversationPRDetail', null, callback, true);
    };

    /** Pull Request > Pull Request Detail > Conversation > Commits List
     *  method : GET
     *  parameter : 
     * */
    namespace.getPRDetailConversationCommitList = function(requestData, callback, errorCallback) {
        ajaxCall('getPRDetailConversationCommitList', null, callback, true);
    };

    /** Pull Request > Pull Request Detail > Conversation > Review List
     *  method : GET
     *  parameter : 
     * */
    namespace.getPRDetailConversationReviewList = function(requestData, callback, errorCallback) {
        ajaxCall('getPRDetailConversationReviewList', null, callback, true);
    };

    /** Pull Request > Pull Request Detail > Conversation > Comment List
     *  method : GET
     *  parameter : 
     * */
    namespace.getPRDetailConversationCommentList = function(requestData, callback, errorCallback) {
        ajaxCall('getPRDetailConversationCommentList', null, callback, true);
    };

    /** Pull Request > Pull Request Detail > Conversation > Comment List
     *  method : GET
     *  parameter : 
     * */
    namespace.getPRDetailConversationCommentList = function(requestData, callback, errorCallback) {
        ajaxCall('getPRDetailConversationCommentList', null, callback, true);
    };

    /** Pull Request > Pull Request Detail > Conversation > Comment 수정
     *  method : PATCH
     *  parameter : { "body": "update comment" }
     * */
    namespace.updatePRDetailConversationComment = function(requestData, callback, errorCallback) {
        var data = { "body" : requestData };
        ajaxCall('updatePRDetailConversationComment', data, callback, true, null, true);
    };

    /** Pull Request > Pull Request Detail > Conversation > Comment 등록
     *  method : POST
     *  parameter : { "body": "insert comment" }
     * */
    namespace.addPRDetailConversationComment = function(requestData, callback, errorCallback) {
        var data = { "body" : requestData };
        ajaxCall('addPRDetailConversationComment', data, callback, true, null, true);
    };

    /** Pull Request > Pull Request Detail > Conversation > Comment close
     *  method : POST
     *  parameter : { "body": "insert comment" }
     * */
    namespace.closePRDetailConversationComment = function(requestData, callback, errorCallback) {
        ajaxCall('closePRDetailConversationComment', null, callback, true, null, null);
    };
    




    // Repository
    
    /** Repositorys > detail
     *  method : GET
     *  parameter : 
     * */
    namespace.getRepoDetailInfo = function(requestData, callback, errorCallback) {
         ajaxCall('getRepoDetailInfo', null, callback, true);
    };

    /** Repositorys > last commits Info
     *  method : GET
     *  parameter : 
     * */
    namespace.getRepoDetailCommit = function(requestData, callback, errorCallback) {
         var responseData = ajaxCall('getRepoDetailCommit', null, callback, true);
         log(responseData[0]);
    };


    return namespace;
    
})(window.namespace || {}, jQuery);

// ##Dashboard
// - search 
// restGit.getDashboardSearchRepo('test');
// restGit.getDashboardSearchCommit('test');
// restGit.getDashboardSearchIssue('test');
// restGit.getDashboardSearchUser('test');

// - 가장 최근에 한 활동 조회

// - 내가 contribute 하고 있는 repository 목록 조회
// restGit.getDashboardMyContributeRepoList();

// - 내가 star한 repository 목록 조회
// restGit.getDashboardMyStarrdRepoList();

// ##Pull Request
// - 내가 created list 
// restGit.getPRMyCreatedList();

// - 내가 Assigned List
// restGit.getPRMyAssignedList();

// - 내가 mentioned List
// restGit.getPRMyMentionedList();

// - Detail > conversation > Pull Request 상세정보
// restGit.getPRDetailConversationPRDetail();

// - Detail > conversation > 커밋 List
// restGit.getPRDetailConversationCommitList();

// - Detail > conversation > 리뷰 List
// restGit.getPRDetailConversationReviewList();

// - Detail > conversation > 커멘트 List
// restGit.getPRDetailConversationCommentList();

// - Detail > conversation > 커멘트 수정
// restGit.updatePRDetailConversationComment('네네 커멘드 등록해요~ ##update(05:12)(4)');

// - Detail > conversation > 커멘트 추가
// restGit.addPRDetailConversationComment('커멘트 insert TEST');

// - Detail > conversation > 커멘트 닫기
// restGit.closePRDetailConversationComment();





// ##Repository
// - 상세정보
// restGit.getRepoDetailInfo();

// - last commit 정보
// restGit.getRepoDetailCommit();
