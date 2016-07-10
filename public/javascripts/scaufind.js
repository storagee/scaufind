$(function () {
    $('#submit-comment').click(function (event) {
        var comment = $('#comment-area').val();
        var postId = $('#submit-post-id').val();
        if(comment.trim().length != 0){
            $.ajax({
                url: 'http://localhost:3000/comment',
                type: 'POST',
                dataType: 'json',
                data: {
                    comment: comment,
                    postId: postId
                },
                success: function (data) {
                    if(data.success == true){
                        console.log(data);
                        $('#comment-bottom').before('<a href="#" class="list-group-item"><h5>from ' + $('#user-info').data('user-info') + '</h5><p>'+ comment +'</p><p class="text-right">刚刚</p></a>')
                    }else if(!data.isLogin){
                        bootbox.alert('还没有登录哦!');
                    }
                },
                error: function (error) {
                    bootbox.alert('网络错误');
                }
            })
        }else{
            bootbox.alert('请输入评论内容!');
        }
    })
});