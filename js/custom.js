
$.get( base_url+"kioskPod/product_api_test.php?proId="+pId, function( response ) {
	$podProductImageBox = $(response).find(".pod__lightbox-place");
	$podProductFormBox = $(response).find(".pod__options");
	$('#podProductImageBox').html($podProductImageBox);
	$('#podProductFormBox').html($podProductFormBox);
	if($podProductImageBox.length > 0 && $podProductFormBox.length > 0){
		$('#img_loader').hide();
		loadDetails();
	}else{
		alert("Invalid Product Details Provided");
	}
});
// add to cart functionality
function addToCart(){
	var imgId = sku;
	var skuID = $('#selSku').val();
	
	var qty = $(".pod__quantity-input select").val();
	var selFrmText ='';
	var selSizeText = '';
	$("input[name=pod-frame]").each(function(){
	  if($(this).prop('checked')===true){
		  if($(this).val() !='unframed'){
			  selFrmText = $(this).val()+' Box Frame';
		  }else{
			  selFrmText = 'No Frame';
		  }
		  
	  }
	});

	$("input[name=pod-size]").each(function(){
	  if($(this).prop('checked')===true){
		  selSizeText = jQuery(this).val()+' Art Print';
	  }
	});
	
	 // cartAdd
	 
	 jQuery.ajax({
		url: base_url+'kioskPod/ajax/cartAdd.php',
		type: "POST",
		data : 'sku='+skuID+'&qty='+qty+'&isPod=1'+'&podsku='+imgId+'&selSizeText='+selSizeText+'&selFrmText='+selFrmText+'&pod_img_url='+pod_img_url+'&pod_title='+pod_title,
		dataType: 'json',
		success : function(result) {
		
			if(result.status == 1){
				//window.location.href = base_url+'kioskPod/cart.php?quote_id='+result.quoteId+'&pId='+pId;
				
			}else{
				alert("product not available");
			}
		}
	});
	
}
// load details used for getting sku details with price
function loadDetails(){
	
	var podLightbox = document.querySelector('.js-pod__lightbox');
	if (!!podLightbox) {

	  var podOptionsToggle = document.querySelectorAll('.js-pod__pane--collapse');
	  var podOptionsSize = document.querySelectorAll('.js-pod__options-size');
	  var podOptionsFrame = document.querySelectorAll('.js-pod__options-frame');
	  var podNavs = document.querySelectorAll('.js-pod__lightbox-nav');
	  var podThumbs = document.querySelectorAll('.js-pod__lightbox-thumb');
	  var podFrameImages = document.querySelectorAll('.js-pod__lightbox-img-frame');
	  var podImages = podLightbox.querySelectorAll('.js-pod__lightbox-img');
	  var podLightboxList = podLightbox.querySelector('.js-pod__lightbox-cells');
	  var podLightboxCells = podLightboxList.querySelectorAll('li');
	  var podHeightPx = parseInt(podImages[0].offsetHeight);
	  var podLightboxCount = podLightboxCells.length;
	  var podDetailFramed = document.querySelectorAll('.js-pod__detail-framed');
	  var podDetailUnframed = document.querySelectorAll('.js-pod__detail-unframed');
	  var podDetailFrameInfo = document.querySelector('.js-pod__detail-frame-info');
	  var podDetailPadding = document.querySelector('.js-pod__detail-padding');
	  var podDetailSize = document.querySelector('.js-pod__detail-size');
	  var podDetailSizeTotal = document.querySelector('.js-pod__detail-size-total');
	  var podDetailSizeTotalFramed = document.querySelector('.js-pod__detail-size-total-framed');
	  var podDetailPriceUnframed = document.querySelectorAll('.js-pod__detail-price-unframed');
	  var podDetailPriceFramed = document.querySelectorAll('.js-pod__detail-price-framed');
	  var podIsFramed = true;
	  var podFrameCm = 1.5;
	  
	  podLightbox.index = 0;
	  podLightbox.focus = function(cell) {
		if (cell === 'prev') { --this.index }
		else if (cell === 'next') { ++this.index }
		else this.index = parseInt(cell); 
		this.index = ((this.index % podLightboxCount) + podLightboxCount) % podLightboxCount;
		//podLightboxList.style.transform = 'translate(-' + (this.index * 100 / podLightboxCount) + '%)';
		var transform = 'translate(-' + (this.index * 100 / podLightboxCount) + '%)';
		podLightboxList.style.transform = transform;
		podLightboxList.style.msTransform = transform;
		Array.from(podThumbs, function(thmb) {
		  thmb.classList.remove('pod__lightbox_thumb--active');
		});
		jQuery('.js-pod__lightbox-thumb').removeClass('pod__lightbox_thumb--active');
		//jQuery(this).addClass('pod__lightbox_thumb--active');
		
		jQuery( ".pod__lightbox_thumbs li" ).eq( this.index ).addClass('pod__lightbox_thumb--active');
		//console.log(jQuery( ".pod__lightbox_thumbs li:" ).eq( this.index ).html());
		//podThumbs[this.index].classList.add('pod__lightbox_thumb--active');
	  }

	  podLightboxList.style.width = (podLightboxCount * 100) + '%';
	  Array.from(podLightboxCells, function(el) {
		el.style.width = (100 / podLightboxCount) + '%';
	  });
	 
	  Array.from(podOptionsToggle, function(el) {
		el.addEventListener('click', function(e) {
		  el.classList.toggle('pod__pane--collapse-open');
		  el.classList.toggle('pod__pane--collapse-shut');
		});
	  });
		var i =1;
	
		jQuery("input[name=pod-size]").each(function(){
				
				if(jQuery(this).prop('checked')===true){
					var selSize = jQuery(this).val();			
					var podWidthCm = parseInt(jQuery(this).parent().find('.js-pod__options-size').attr('data-width'));
					var podHeightCm = parseInt(jQuery(this).parent().find('.js-pod__options-size').attr('data-height'));
				
					if(jQuery(this).parent().find('.js-pod__options-size').attr('data-iswidth-flag')==1){
						var podSizeCm = podHeightCm + ' x ' + podWidthCm;
					}else{
						var podSizeCm = podWidthCm + ' x ' + podHeightCm;
					}
					
					var podPaddingCm = parseInt(jQuery(this).parent().find('.js-pod__options-size').attr('data-padding'));
					var podScalerRoom = 0.012;
					var podPriceUnframed = parseInt(jQuery(this).parent().find('.js-pod__options-size').attr('data-price-unframed'));
					var podPriceFramed = parseInt(jQuery(this).parent().find('.js-pod__options-size').attr('data-price-framed'));	
					
					var showpodPriceUnframed = jQuery(this).parent().find('.js-pod__options-size').attr('data-price-unframed');
					var showpodPriceFramed = jQuery(this).parent().find('.js-pod__options-size').attr('data-price-framed');	
					
					var podPaddingTotalCm = podPaddingCm * 2;
					var podPaddingTotalFramedCm = podPaddingTotalCm + (podFrameCm * 2);
					var podScaler = podHeightPx / (podHeightCm + (podPaddingCm * 2) + (podFrameCm * 2));
					  
					  jQuery('.js-pod__lightbox-img').each(function(){
						  var style = 'border:' + (podScaler * podFrameCm) + 'px solid; border-image: 30 stretch; padding:' + (podScaler * podPaddingCm) + 'px;';
						  if(jQuery(this).hasClass('js-pod__lightbox-img-in-room')){
							  style += '-ms-transform: scale(' + (podScalerRoom * podHeightCm) + ') translate(0, -' + 20000 / (podHeightCm * podHeightCm) + '%)';
							   style += ';transform: scale(' + (podScalerRoom * podHeightCm) + ') translate(0, -' + 20000 / (podHeightCm * podHeightCm) + '%)';
							   
						  }
						  jQuery(this).attr('style', style);
					  });
					 
					  podDetailPadding.innerHTML = podPaddingCm;
					  podDetailSize.innerHTML = podSizeCm;
					  podDetailSizeTotal.innerHTML = (podWidthCm + podPaddingTotalCm) + ' x ' + (podHeightCm + podPaddingTotalCm);
					  podDetailSizeTotalFramed.innerHTML = (podWidthCm + podPaddingTotalFramedCm) + ' x ' + (podHeightCm + podPaddingTotalFramedCm);
					 
					
					  var selFrame ='';
					 jQuery("input[name=pod-frame]").each(function(){
						  if(jQuery(this).prop('checked')===true){
							  selFrame = jQuery(this).val();
							  if(jQuery(this).val() == 'unframed'){
								jQuery('.pod__lightbox_thumb').eq(2).hide();
								
							  }else{ 
								selFrame = jQuery(this).val();
								  jQuery('.pod__lightbox_thumb').eq(2).show();	
								 
							  }
							 
							  if(selFrame !='unframed'){
								  podDetailFrameInfo.innerHTML = jQuery(this).parent().find('.pod__options-frame').attr('data-frame-info');
								
								  if(jQuery('.js-pod__detail-framed').hasClass('display-none')){
									  jQuery('.js-pod__detail-framed').removeClass('display-none');
									  jQuery('.js-pod__detail-unframed').addClass('display-none');
								  }
								   //jQuery('.podPrice').html(showpodPriceFramed);
							  }else{
								  
								 if(jQuery('.js-pod__detail-unframed').hasClass('display-none')){
									  jQuery('.js-pod__detail-framed').addClass('display-none');
									  jQuery('.js-pod__detail-unframed').removeClass('display-none');
								  }
								  //jQuery('.podPrice').html(showpodPriceUnframed);
							  }
							 
						  }
					  });
						
					  var paperSize = parseInt(jQuery(this).parent().find('.js-pod__options-size').attr('data-paper-size'));
						
						if(jQuery(this).parent().find('.js-pod__options-size').attr('data-iswidth-flag')==1){
							var totalFrmaeSize = jQuery(this).parent().find('.js-pod__options-size').attr('data-total-fameheight') + ' x ' + jQuery(this).parent().find('.js-pod__options-size').attr('data-total-famesize');
			 
							jQuery('#pod__detail_size_total .js-pod__detail-size-total-framed').html(' '+totalFrmaeSize);
						}else{
							var totalFrmaeSize = jQuery(this).parent().find('.js-pod__options-size').attr('data-total-famesize') + ' x ' + jQuery(this).parent().find('.js-pod__options-size').attr('data-total-fameheight');
			 
							jQuery('#pod__detail_size_total .js-pod__detail-size-total-framed').html(' '+totalFrmaeSize);
						}
						
							
						//var selSize = jQuery(this).find('.pod__options-size-title').html();		

						var paperSize =  parseInt(jQuery(this).attr('data-paper-size'));
						var papaersizeid =  jQuery('#papaersizeid').val();
						if(selSize == 'X-large'){
							selSize = 'Special';
						}
						
						var selFrame = '';
						  jQuery("input[name=pod-frame]").each(function(){
							  if(jQuery(this).prop('checked')===true){
								 selFrame = jQuery(this).val();
								  if(jQuery(this).val() == 'unframed'){
									  jQuery('.pod__lightbox_thumb').eq(2).hide();
									 
								  }else{ 
										jQuery('.pod__lightbox_thumb').eq(2).show();	
										
								  }
							  }
						  });
						// getPodDetails
						$('#img_loader').show();
						jQuery.ajax({
							url: base_url+'kioskPod/ajax/getPodDetails.php',
							type: "POST",
							data : 'selFrmText='+selFrame+'&papaersizeid='+papaersizeid+'&selSizeText='+selSize+'&paperSize='+paperSize+'&sku='+sku,
							dataType: 'json',
							success : function(result) {
								$('#img_loader').hide();
								jQuery('.podPrice').html(result.price);								
								var optHtml = '';
								if(result.qty <10){
									for(var i =1; i<=10; i++){
										optHtml += '<option value="'+i+'">'+i+'</option>';
									}	
									jQuery('.pod__quantity-input select').html(optHtml);
								}
								
								jQuery('#selSku').val(result.magento_SKU);
								
							}
						});
						
				}
		});
	
		jQuery('.js-pod__options-size').on('click',function(){
		
			var podWidthCm = parseInt(jQuery(this).attr('data-width'));
			var podHeightCm = parseInt(jQuery(this).attr('data-height'));
			
			if(jQuery(this).attr('data-iswidth-flag')==1){
				var podSizeCm = podHeightCm + ' x ' + podWidthCm;
			}else{
				var podSizeCm = podWidthCm + ' x ' + podHeightCm;
			}
			var podPaddingCm = parseInt(jQuery(this).attr('data-padding'));
			var podScalerRoom = 0.012;
			var podPriceUnframed = parseInt(jQuery(this).attr('data-price-unframed'));
			var podPriceFramed = parseInt(jQuery(this).attr('data-price-framed'));	
			
			var showpodPriceUnframed = jQuery(this).attr('data-price-unframed');
			var showpodPriceFramed = jQuery(this).attr('data-price-framed');	

			var podPaddingTotalCm = podPaddingCm * 2;
			var podPaddingTotalFramedCm = podPaddingTotalCm + (podFrameCm * 2);
			var podScaler = podHeightPx / (podHeightCm + (podPaddingCm * 2) + (podFrameCm * 2));
			  
			  jQuery('.js-pod__lightbox-img').each(function(){
				  var style = 'border:' + (podScaler * podFrameCm) + 'px solid; border-image: 30 stretch; padding:' + (podScaler * podPaddingCm) + 'px;';
				  if(jQuery(this).hasClass('js-pod__lightbox-img-in-room')){
					  style += '-ms-transform: scale(' + (podScalerRoom * podHeightCm) + ') translate(0, -' + 20000 / (podHeightCm * podHeightCm) + '%)';
					   style += ';transform: scale(' + (podScalerRoom * podHeightCm) + ') translate(0, -' + 20000 / (podHeightCm * podHeightCm) + '%)';
					  
				  }
				  jQuery(this).attr('style', style);
			  });
			 
			  	
			 jQuery('.js-pod__detail-padding').html(podPaddingCm);
			  podDetailPadding.innerHTML = podPaddingCm;
			  podDetailSize.innerHTML = podSizeCm;
			  podDetailSizeTotal.innerHTML = (podWidthCm + podPaddingTotalCm) + ' x ' + (podHeightCm + podPaddingTotalCm);
			  podDetailSizeTotalFramed.innerHTML = (podWidthCm + podPaddingTotalFramedCm) + ' x ' + (podHeightCm + podPaddingTotalFramedCm);
			  var selFrame = '';
			  jQuery("input[name=pod-frame]").each(function(){
				  if(jQuery(this).prop('checked')===true){
					 selFrame = jQuery(this).val();
					  if(jQuery(this).val() == 'unframed'){
						  jQuery('.pod__lightbox_thumb').eq(2).hide(); 
						  //jQuery('.podPrice').html(showpodPriceUnframed);
						 
					  }else{ 
							jQuery('.pod__lightbox_thumb').eq(2).show();	
							//jQuery('.podPrice').html(showpodPriceFramed);
							
					  }
				  }
			  });
			  var selSize = jQuery(this).find('.pod__options-size-title').html();		
		  
			  var paperSize =  parseInt(jQuery(this).attr('data-paper-size'));
			

			
			 if(jQuery(this).attr('data-iswidth-flag')=='0'){
				 var totalFrmaeSize = jQuery(this).attr('data-total-famesize') + ' x ' + jQuery(this).attr('data-total-fameheight');
				 jQuery('#pod__detail_size_total .js-pod__detail-size-total-framed').html(' '+totalFrmaeSize);
			 }else{
				 
				  var totalFrmaeSize = jQuery(this).attr('data-total-fameheight') + ' x ' + jQuery(this).attr('data-total-famesize');
				  jQuery('#pod__detail_size_total .js-pod__detail-size-total-framed').html(' '+totalFrmaeSize); 
				  
			 }
			
			 var selSize = jQuery(this).find('.pod__options-size-title').html();		
		  
			  var paperSize =  parseInt(jQuery(this).attr('data-paper-size'));
			  var papaersizeid =  jQuery('#papaersizeid').val();
			
				if(selSize == 'X-large'){
					selSize = 'Special';
				}
			   //getPodDetails 		
				$('#img_loader').show();
				jQuery.ajax({
					url: base_url+'kioskPod/ajax/getPodDetails.php',
					type: "POST",
					data : 'selFrmText='+selFrame+'&papaersizeid='+papaersizeid+'&selSizeText='+selSize+'&paperSize='+paperSize+'&sku='+sku,
					dataType: 'json',
					success : function(result) {
						$('#img_loader').hide();
						jQuery('.podPrice').html(result.price);
						/* 
						
						jQuery('.js-pod__detail-size').html(result.printImgSizeHtml);
						jQuery('.js-pod__detail-size-total-framed').html(result.printImgHtml); */
						
						var optHtml = '';
						if(result.qty <10){
							for(var i =1; i<=10; i++){
								optHtml += '<option value="'+i+'">'+i+'</option>';
							}	
							jQuery('.pod__quantity-input select').html(optHtml);
						}
						
						jQuery('#selSku').val(result.magento_SKU);
						
						
					}
				});
		});
		
		jQuery('.js-pod__pane--collapse').on('click',function(){ 
			if(jQuery(this).hasClass('pod__pane--collapse-shut')){
				jQuery(this).removeClass('pod__pane--collapse-shut');
				jQuery(this).addClass('pod__pane--collapse-open');
			}else{
				jQuery(this).removeClass('pod__pane--collapse-open');
				jQuery(this).addClass('pod__pane--collapse-shut');
			}
		});
		var podOptionDefault = '';
	
		jQuery('.js-pod__options-frame').on('click',function(){ 
			var frameCls = jQuery(this).attr('data-frame-class');
			var selFrame = jQuery(this).parent().parent().find('input[name=pod-frame]').val();
			podDetailFrameInfo.innerHTML = jQuery(this).attr('data-frame-info');
			var selSize = '';
			if(frameCls == 'pod__lightbox-img--unframed'){
				jQuery('.pod__lightbox_thumb').eq(2).hide();
				jQuery('.pod__lightbox-cell--frame').hide();
				
			}else{
				jQuery('.pod__lightbox_thumb').eq(2).show();
				jQuery('.pod__lightbox-cell--frame').show();
			}
			
			jQuery("input[name=pod-frame]").each(function(){ 
				if(jQuery(this).prop('checked')===true){ 
					var podOptionDefault = '';
					var frameImg = jQuery(this).parent().find('.pod__options-frame');
					podIsFramed = true;
					
					jQuery('.pod__lightbox-cell img').removeClass('pod__lightbox-img--black');
					jQuery('.pod__lightbox-cell img').removeClass('pod__lightbox-img--white');
					jQuery('.pod__lightbox-cell img').removeClass('pod__lightbox-img--natural');
					jQuery('.pod__lightbox-cell img').removeClass('pod__lightbox-img--limed');
					jQuery('.pod__lightbox-cell img').removeClass('pod__lightbox-img--unframed');
				
				}
			});
			
			if(selFrame !='unframed'){
				podDetailFrameInfo.innerHTML = jQuery(this).attr('data-frame-info');
				if(jQuery('.js-pod__detail-framed').hasClass('display-none')){
					  jQuery('.js-pod__detail-framed').removeClass('display-none');
					  jQuery('.js-pod__detail-unframed').addClass('display-none');
					  jQuery('#mount_tag').removeClass('display-none');
					  jQuery('#pod__detail_size_total').removeClass('display-none');
					  
					  
				  }
				
			}else{
				if(jQuery('.js-pod__detail-unframed').hasClass('display-none')){
					  jQuery('.js-pod__detail-framed').addClass('display-none');
					  jQuery('.js-pod__detail-unframed').removeClass('display-none');
					  jQuery('#mount_tag').addClass('display-none');
					   jQuery('#pod__detail_size_total').addClass('display-none');
				  }
				  
			}
			var totalFrmaeSize =  '';
			jQuery("input[name=pod-size]").each(function(){
				if(jQuery(this).prop('checked')===true){
					if(frameCls != 'pod__lightbox-img--unframed'){
						
						totalFrmaeSize = jQuery(this).parent().find('.js-pod__options-size').attr('data-total-famesize') + ' x ' + jQuery(this).parent().find('.js-pod__options-size').attr('data-total-fameheight');
						jQuery('.js-pod__detail-size-total-framed').html(' '+totalFrmaeSize);
						//jQuery('.podPrice').html(jQuery(this).parent().find('.js-pod__options-size').attr('data-price-framed'));
						jQuery('#pod__detail_unframed_total').hide();
					}else{
						totalFrmaeSize = jQuery(this).parent().find('.js-pod__options-size').attr('data-total-famesize') + ' x ' + jQuery(this).parent().find('.js-pod__options-size').attr('data-total-fameheight');
						jQuery('.js-pod__detail-size-total-framed').html(' '+totalFrmaeSize);
						//jQuery('.podPrice').html(jQuery(this).parent().find('.js-pod__options-size').attr('data-price-unframed'));
						jQuery('#pod__detail_unframed_total').show();
					}
					
				}
			});
				

			//jQuery('.js-pod__lightbox-img-frame').attr('src',jQuery(this).find('img').attr('src'));
				
			jQuery('.pod__lightbox-cell img').addClass(frameCls);
			
			jQuery('.pod__lightbox-cell img').each(function(){ 
				jQuery(this).addClass(frameCls);
			});
			
			var papaersizeid =  jQuery('#papaersizeid').val();
			var paperSize = '';
			if(selSize = 'small'){
				paperSize = 13;
			}else if(selSize = 'medium'){
				paperSize = 12;
			}else if(selSize = 'large'){
				paperSize = 11;
			}else if(selSize = 'x-large'){
				paperSize = 10;
			} 
			if(selSize == 'X-large'){
				selSize = 'Special';
			}
			jQuery("input[name=pod-size]").each(function(){
					if(jQuery(this).prop('checked')===true){
						selSize = jQuery(this).val();
					}
				});
			
			 // getPodDetails 
				$('#img_loader').show();
				jQuery.ajax({
				url: base_url+'kioskPod/ajax/getPodDetails.php',
				type: "POST",
				data : 'selFrmText='+selFrame+'&papaersizeid='+papaersizeid+'&selSizeText='+selSize+'&paperSize='+paperSize+'&sku='+sku,
				dataType: 'json',
				success : function(result) {
					$('#img_loader').hide();
					jQuery('.podPrice').html(result.price);
					/* 
					jQuery('.js-pod__detail-size').html(result.printImgSizeHtml);
					jQuery('.js-pod__detail-size-total-framed').html(result.printImgHtml); */
					var optHtml = '';
					if(result.qty <10){
						for(var i =1; i<=10; i++){
							optHtml += '<option value="'+i+'">'+i+'</option>';
						}	
						jQuery('.pod__quantity-input select').html(optHtml);
					}
					jQuery('#selSku').val(result.magento_SKU);
				}
			});
			//if (!!podOptionDefault) el.click();
		
		});
		  
		jQuery('.js-pod__lightbox-nav').on('click',function(){
			var controlTxt = jQuery(this).attr('data-focus');
			podLightbox.focus(controlTxt);
		});

		window.addEventListener('resize', function(e) {
			podHeightPx = parseInt(podImages[0].offsetHeight);
			Array.from(document.querySelectorAll('input:checked'), function(el) {
			  var size = el.parentElement.querySelector('.js-pod__options-size');
			  if (!!size) size.click();
			  var frame = el.parentElement.querySelector('.js-pod__options-frame');
			  if (!!frame) frame.click();
			});
		});
	}
}
