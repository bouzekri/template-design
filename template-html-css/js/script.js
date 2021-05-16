$(function() {
	"use strict";

	AOS.init();

	$(".testimonials .slider").bxSlider({infiniteLoop: true , responsive: true , touchEnabled: true});

	$.fn.digits = function(){ 
	    return this.each(function(){ 
	        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
	    })
	}			

	$("nav ul li a").on('click' , function(event) {
			event.preventDefault();

			const anchorData = `.${$(this).data("scroll")}`;

			const offsetTopElement = typeof $(anchorData).offset() == "undefined" ? 0 : $(anchorData).offset().top;

			$("html , body").animate({
				scrollTop: offsetTopElement
			} , 1500);	

			$("nav ul li a").removeClass("active");

			$(this).addClass('active');
	});	

	let count = 0;	

	$(".form i").on('click' , function(event) {
		event.preventDefault();
			
		if(count == 0) {

			$("nav ul").hide();	

			const inputSearch = $("<input/>" , {"class" : "input-search" , "placeholder": "Search for a product ..."});

			$("nav").prepend(inputSearch);

			$(".input-search").animate({width: '+=80%'} , 700);

			$(".input-search").trigger('focus');

			$(".input-search:before").animate({
				width: "+=80%"
			} , 700);

			if (window.matchMedia('(max-width: 767px)').matches) { 
				$("nav i.toggle-menu").hide();
			}
				
			count++;
				
		} else {

			$(".input-search").animate({
				width: '-=80%'
			} , 700 , function() {
				if (window.matchMedia('(min-width: 768px)').matches) {
					$("nav ul").show();	
				} else {
					$("nav i.toggle-menu").show();
				}
				$(".input-search").remove();
				count = 0;
			});



		}	

	});

	$("body").on('keyup' , '.input-search' ,  function(event) {
			event.preventDefault();
			event.stopPropagation();

			if($(this).val() != "") {
				
			}
	});

	// dedicated for scrolling to up btn
	// creating button dynamically
	const btnScrollTop = $("<button />" , {"class" : "button-scroll-top" , "html": "<i class='fas fa-arrow-up'></i>"});
	$("body").append(btnScrollTop);

	$(document).on('scroll' , function() {

		if($("html , body").scrollTop() >= $(".services").offset().top) {
			btnScrollTop.css("opacity" , "1");
		} else {
			btnScrollTop.css("opacity" , "0");
		}		
	});

	$(".button-scroll-top").click(function() {
		$("html , body").animate({ 
			scrollTop: 0
		} , 1000);
	});

	/* Portfolio item */
	$(".portfolio ul li").on('click' , function(event) {
		event.preventDefault();

		$(this).siblings().removeClass("active");
		$(this).addClass("active");

		const value = $(this).attr("id").toLowerCase();

		$(".portfolio .box").filter(function() {
			if(value != "all") {
				$(this).toggle($(this).attr("id").toLowerCase() == value);
			} else {
				$(this).show();
			}
		});
	});

	let isExecutedNumbers = false;

	let isExecutedSkills = false;

	// counting numbers
	$(document).on('scroll' , function() {

		if($("html , body").scrollTop() >= ($(".about").offset().top + 120)) {
			if(isExecutedNumbers == false) {
				$('.number').each(function () {
				  var $this = $(this);
				  jQuery({ Counter: 0 }).animate({ Counter: $this.attr('data-stop') }, {
				    duration: 1000,
				    easing: 'swing',
				    step: function (now) {
				      $this.text(Math.ceil(now)).digits();
				    }
				  });
				});
			}

			isExecutedNumbers = true;
		}

		if($("html , body").scrollTop() >= 4800) { 
			if(isExecutedSkills == false) {

				$('.progress > span').each(function () {
				  var $this = $(this);
				  jQuery({ Counter: 0 }).animate({ Counter: $this.attr('data-progress') }, {
				    duration: 1500,
				    easing: 'swing',
				    step: function (now) {
				      $this.css("width" ,  `${Math.ceil(now)}%`);
				      $this.attr('data-progress', Math.ceil(now) + '%');
				    }
				  });
				});

				isExecutedSkills = true;
			}
		}
	});  
});