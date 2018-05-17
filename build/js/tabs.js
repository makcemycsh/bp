// $( function() {
//     $( "#tabs" ).tabs();
//   } );


$(document).ready(function() {
	console.log(123);
	$('.js-labels label').click(function() {
		$('.js-labels label').removeClass('mod-active');
		$(this).addClass('mod-active');
	});

	// //Отступ для первого выводимого блока b-task-content
	// var cur_height = $('.b-task-tabs input:checked+label+.b-task-content').outerHeight(true);
	// $('.b-task-tabs__inner').css('padding-bottom',cur_height + 160);

	// //Отступ для остальных блоков b-task-content при их переключении
	// $('.b-task-tabs input').change(function(){
	// 	cur_height = $('.b-task-tabs input:checked+label+.b-task-content');
	// 	$('.b-task-tabs__inner').css('padding-bottom',cur_height.outerHeight(true));

	// });	

	// //Скролл Label .task при наведении на кнопки
	// function loopl(){
	// 	$('.b-task-tabs__inner').animate(
	// 		{scrollLeft: '-=120'},
	// 		"500",
	// 		'linear',
	// 		loopl
	// 		);
	// }        
	// function loopr(){
	// 	$('.b-task-tabs__inner').animate(
	// 		{scrollLeft: '+=120'},
	// 		"500",
	// 		'linear',
	// 		loopr  
	// 		);
	// }

	// function stop(){
	// 	$('.b-task-tabs__inner').stop();
	// }

	// $( ".js-arrow.left" ).hover(loopl, stop);
	// $( ".js-arrow.right" ).hover(loopr, stop);

	// //скрытие кнопки вправо, если блоков меньше ширины обертки 
	// function right_nav(){
	// 	var inner_width = 0;
	// 	var wrap_width = $('.b-task-tabs__inner').width();

	// 	$('.b-task-tabs__inner label:not(.js-arrow)').each(function(i) {

	// 		if($(this).width()  < 100){
	// 			inner_width += 100;
	// 		} else {
	// 			inner_width += $(this).width();
	// 		}
	// 	});

	// 	if (wrap_width > inner_width) {
	// 		$( ".js-arrow.right" ).hide();
	// 	} else {
	// 		$( ".js-arrow.right" ).show();
	// 	}
	// }

	// right_nav();
	// $(window).resize(function() {
	// 	right_nav();
	// });

	// //Отображение и скрытие кнопок навигации .js-arrow 
	// $('.b-task-tabs__inner').scroll( function() {

	// 	var $width = $(this).outerWidth();
	// 	var $scrollWidth = $(this)[0].scrollWidth; 
	// 	var $scrollLeft = $(this).scrollLeft();

	// 	if ($scrollLeft != 0) {
	// 		$( ".js-arrow.left" ).show();
	// 	};

	// 	if ($scrollWidth - $width === $scrollLeft){
	// 		$( ".js-arrow.right" ).hide();
	// 	} else if ($scrollLeft===0){
	// 		$( ".js-arrow.left" ).hide();
	// 	}
	// 	else{
	// 		$( ".js-arrow.right" ).show();
	// 		$( ".js-arrow.left" ).show();
	// 	}
	// });
});
