(function(window, $){
    $(function(){
        var url = window.location.href;
        var hl_pattern = new RegExp(/&e=(\d+)/);
        var target_id = hl_pattern.exec(url);
        console.log(url);
        console.log(target_id);
        if(!target_id) return;

        console.log('ggg');
        var $row = $('a[href="' + target_id[1] + '/"]').parent().parent();
        console.log($row);
        $row.css('background-color', '#6994DA');
        $('html').scrollTo($row, 500);
    });
})(window, django.jQuery);
