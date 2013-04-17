(function(window, $){
    $(function(){
        var url = window.location.href;
        var hl_pattern = new RegExp(/&e=(\d+)/);
        var target_id = hl_pattern.exec(url);
        if(!target_id) return;

        var $row = $('a[href="' + target_id[1] + '/"]').parent().parent();
        $row.css('background-color', '#6994DA');
        $('html').scrollTo($row, 500);
    });
})(window, django.jQuery);
