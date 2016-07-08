$(function () {
    $('.panel-title').click(function (event) {
        $.ajax({
            url: 'http://localhost:3000/api/addPost/',
            type: 'POST',
            dataType: 'json',
            data: {
                title: "在华山西园二楼丢了一把紫色天堂伞",
                type: "lost",
                detail: "是昨天中午（星期3）丢的，希望好心的人能还回来，酸奶酬谢",
                userId: "1",
                categoryId: "1"
            },
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log('error: ', error);
            }
        })
    })
});