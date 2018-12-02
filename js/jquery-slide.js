(function($) {
	$.fn.slide = function(option) { //$.fn.abc(),��$.fn.abc()�Ƕ�jquery��չ��һ��abc����,��ô�������ÿһ��jqueryʵ���������������������.  �磺$("#div").abc();
		option = $.extend({
			title: '',
			stepId: 'step-play-list',
			stepTmpId: 'step-item-tmp',
			footerId: 'step-pager-list',
			footerTmpId: 'step-item',
			data: [{
				title: 'default',
				src: 'images/step_bg.png'
			}]
		}, option);

		return this.each(function() {
			var $slide = $(this); //thisָindex�е���slide��$('#slide_wrapper')����
			$slide.find('.header h1').text(option.title); //���ӱ���

			$slide.find('.step-container .left-cover, .step-container .right-cover').hover(function() {
				$(this).addClass('cover-hover');
			}, function() {
				$(this).removeClass('cover-hover');
			}); //�������������Ƭ����������ʽ

			$('#' + option.stepTmpId).find('.page-num').text(option.data.length);

			$.each(option.data, function(i, item) {
				var itemDetail = $('#' + option.stepTmpId).clone();
				itemDetail.find('.current-order-in-step').text(i+1);
				itemDetail.find('.step-text-container p').html(item.title);
				itemDetail.find('.step-img-container img').attr('src', item.src);
				itemDetail.css('display', 'inline-block');
				$('#' + option.stepId).append(itemDetail);

				var footerLi = $('#' + option.footerTmpId).clone();
				footerLi.find('a').text(i+1);
				
				if (i == 0) {
					footerLi.find('a').addClass('current');
				} else {
					footerLi.find('a').removeClass('current');
				}

				footerLi.find('a').click(function() {
					$('#' + option.footerId).find('a').removeClass('current');
					$(this).addClass('current');
					var currPageIndex = parseInt($(this).text()) - 1;
					$('#' + option.stepId).animate({left : (currPageIndex * -920 + 'px')});
				});

				footerLi.show();
				$('#' + option.footerId).append(footerLi);

				$slide.find('.left-cover').click(function() {
					var currPageIndex = parseInt($('#' + option.footerId).find('a.current').text()) - 1;

					if (currPageIndex == 0) return;
					currPageIndex--;
					var $prevA = $('#' + option.footerId).find('a.current').parent().prev().find('a');
					$('#' + option.footerId).find('a').removeClass('current');
					$prevA.addClass('current');
					$('#' + option.stepId).animate({left : (currPageIndex * -920 + 'px')});
				});

				$slide.find('.right-cover').click(function() {
					var currPageIndex = parseInt($('#' + option.footerId).find('a.current').text()) - 1;

					if (currPageIndex + 1 == option.data.length) return;
					currPageIndex++;
					var $nextA = $('#' + option.footerId).find('a.current').parent().next().find('a');
					$('#' + option.footerId).find('a').removeClass('current');
					$nextA.addClass('current');
					$('#' + option.stepId).animate({left : (currPageIndex * -920 + 'px')});
				});
			});
		});
	};
})(jQuery);