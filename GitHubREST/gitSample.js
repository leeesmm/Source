$( document ).ready(function() {

    //Pull Request
    //Created List
    $('#getPRMyCreatedList').on('click', function() {
         restGit.getPRMyCreatedList({}, function (response) {
            $view = $('#getPRMyCreatedListView');
            $view.html(JSON.stringify(response, null, 4));

            table.getPullRequestMyListTbody($view, response);
            
         }, function() {
             $('#getPRMyCreatedListView').html('fail!!');
         });
    });

    //Assigned List
    $('#getPRMyAssignedList').on('click', function() {
         restGit.getPRMyAssignedList({}, function (response) {
            $view = $('#getPRMyAssignedListView');
            $view.html(JSON.stringify(response, null, 4));

            table.getPullRequestMyListTbody($view, response);
            
         }, function() {
             $('#getPRMyAssignedListView').html('fail!!');
         });
    });

    //Mentioned List
    $('#getPRMyMentionedList').on('click', function() {
         restGit.getPRMyMentionedList({}, function (response) {
            $view = $('#getPRMyMentionedListView');
            $view.html(JSON.stringify(response, null, 4));

            table.getPullRequestMyListTbody($view, response);
            
         }, function() {
             $('#getPRMyMentionedListView').html('fail!!');
         });
    });

    $('#getPRDetailConversationPRDetail').on('click', function() {
         restGit.getPRDetailConversationPRDetail({}, function (response) {
            $view = $('#getPRDetailConversationPRDetailView');
            $view.html(JSON.stringify(response, null, 4));

            
            
         }, function() {
             $('#getPRDetailConversationPRDetailView').html('fail!!');
         });
    });

    




    $(document).on('mouseover', '.well tr', function() {
        var viewClass = $(this).attr('id');
        
        if ( viewClass == undefined ) return;

        $(this).closest('.well').next().find('.'+viewClass).addClass('info')
    });

     $(document).on('mouseout', '.well tr', function() {
        $(this).closest('.well').next().find('.info').removeClass('info');
    });

});

table = {
    //Pull Requet > List 공통
    getPullRequestMyListTbody : function($view, response) {
        tbody = $view.closest('div').next().find('tbody');
        tbody.find('.cloneTr').remove();
        $sampleInfo = tbody.clone();

        count = response.total_count;   //목록 개수

        if ( count == 0 ) {
            tbody.append('<tr class="cloneTr"><td colspan = "3">No pull requests to show</td></tr>');
            return false;
        }

        for ( var i in response.items ) {
            pr = response.items[i];                                         
            
            state = pr.state;                                               // 상태
            title = pr.title;                                               // 제목
            repoSp = pr.repository_url.split('/');
            repo = repoSp[repoSp.length-2] + '/' + repoSp[repoSp.length-1]; // owner/Repository
            number = pr.number;                                             // 번호
            createDate = pr.created_at;                                     // 생성일
            creator = pr.user.login                                         // 생성자

            $sampleInfo.find('.table-state').text(state);
            $sampleInfo.find('.table-repo').text(repo);
            
            $sampleInfo.find('.table-title').text(title);
            $sampleInfo.find('.table-number').text('#' + number);
            $sampleInfo.find('.table-created').text('opened by ' + creator + ' ' + createDate); // date는 2 day ago 형식으로 가공되어야함..

            $sampleInfo.find('tr').addClass('cloneTr');
            tbody.append($sampleInfo.html());
        }
    }

}

