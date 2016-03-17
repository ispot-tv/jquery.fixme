/**
 * Created by adamyoungers on 5/3/15.
 * From: http://codepen.io/jgx/pen/wiIGc
 * A jquery plugin for fixing table headers on scroll.
 */
;(function ($) {
    $.fn.fixMe = function () {
        return this.each(function () {
            var $this = $(this),
                $t_fixed;
            function init() {
                $this.wrap('<div class="fixme" />');
                $t_fixed = $this.clone();
                $t_fixed.find("tbody").remove().end().addClass("table-fixme-fixed").insertBefore($this);
                resizeFixed();
            }
            function resizeFixed() {
                $t_fixed.find("th").each(function (index) {
                    $(this).css("width", $this.find("th").eq(index).outerWidth() + "px");
                });
            }
            function scrollFixed() {
                var offset = $(this).scrollTop(),
                    tableOffsetTop = $this.offset().top,
                    tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
                if (offset < tableOffsetTop || offset > tableOffsetBottom)
                    $t_fixed.hide();
                else if(offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden")){
                    $t_fixed.show();
	                $(window).resize();
                }
            }
            $(window).resize(resizeFixed);
            $(window).scroll(scrollFixed);
            init();
        });
    };
})(jQuery);
