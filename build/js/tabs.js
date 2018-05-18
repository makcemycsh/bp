
$(document).ready(function () {

    $('.b-tabs label:not(.b-tabs__js-arrow)').click(function () {
        $('.b-tabs label:not(.b-tabs__js-arrow)').removeClass('mod-active');
        $(this).addClass('mod-active');
    });

    //Скролл b-tabs__labels при наведении на кнопки
    var leftArrow = $(".b-tabs__js-arrow_left");
    var rightArrow = $(".b-tabs__js-arrow_right");
    var labelsWrap = $('.b-tabs__labels');

    function scrollLeft() {
        labelsWrap.animate(
            {scrollLeft: '-=250'},
            "500",
            'linear',
            scrollLeft
        );
    }

    function scrollRight() {
        labelsWrap.animate(
            {scrollLeft: '+=250'},
            "500",
            'linear',
            scrollRight
        );
    }

    function stop() {
        labelsWrap.stop();
    }

    leftArrow.hover(scrollLeft, stop);
    rightArrow.hover(scrollRight, stop);

    //скрытие кнопки вправо, если блоков меньше ширины обертки
    function right_nav() {

        var innerWidth = 0;
        var wrapWidth = $('.b-task-tabs__inner').width();

        $('.b-tabs__labels span').each(function (i) {
            innerWidth += $(this).outerWidth(true);
        });

        if (wrapWidth > innerWidth) {
            rightArrow.hide();
        } else {
            rightArrow.show();
        }
    }

    //Отображение и скрытие кнопок навигации .js-arrow
    labelsWrap.scroll(function () {

        var $width = $(this).outerWidth();
        var $scrollWidth = $(this)[0].scrollWidth;
        var $scrollLeft = $(this).scrollLeft();

        if ($scrollLeft != 0) {
            leftArrow.show();
        };

        if ($scrollWidth - $width <= $scrollLeft) {
            rightArrow.hide();
        } else if ($scrollLeft === 0) {
            leftArrow.hide();
        }
        else {
            rightArrow.show();
            leftArrow.show();
        }
    });

    right_nav();
    $(window).resize(function () {
        right_nav();
    });

});
