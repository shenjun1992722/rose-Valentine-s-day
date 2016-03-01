// window.b =77 ;

window.onload = function () {
	//获取页面可视区域的高度和宽度
	var sWidth = window.innerWidth,
		sHeight = window.innerHeight;

	// var	eventName = "ontouchstart" in document.documentElement ? "touchend" : "click"; //绑定点击事件
	var eventName = "click";

	var	header = $("header"),
		top = $("#top"),
		oFocus = $("#top .focus"),
		oFriend = $("#top .friend"),
		topBtn = $("#top button"),
		//countTotalAmount = $("#top #totalAmount"),

		con = $("#content"),
		conImg = $("#content img"),
		conFir = $("#content .first"),
		conFir1 = $("#content .first #searchPotions"),
		conSec = $("#content .second"),
		conSec1 = $("#content .second #searchRose"),
		conBtn = $("#content button"),
		oSearch1 = $("#content #searchPotions"),
		oSearch2 = $("#content #searchRose"),
		oSearch3 = $("#content #searchMagicWand"),
		oSearch4 = $("#content #searchGift"),

		footer = $("footer"),
		oExchange1 = $("footer #exchange1"),
		oExchanges = $("footer #exchanges"),
		star = $("footer #star");
		footerLi = $("footer #count li"),
		footerSpan = $("footer #count span"),
		countPotion = $("footer #potion"),
		countRose = $("footer #rose"),
		countMagicWand= $("footer #magicWand"),
		countGift = $("footer #gift"),

		timer1 = null,timer2 = null,timer3=null,timer4=null;

	var oMask =$(".mask");
		oMask.height(sHeight);			
		oMask.width(sWidth);

	var oSearchView = $("#searchView"),
		oSearchViewLoading = $("#searchView .loading");
		// 设置搜索界面的高,宽
		oSearchView.width(sWidth*0.96);
		oSearchView.css("left",sWidth*0.04/2+"px"); 
		oSearchView.height(sHeight*0.306);
		oSearchView.css("top",sHeight*0.694/2+"px");

	var	searchImg = $("#searchView .loading1");
	var oSearchViewGet1 = $("#searchView .get1"),
		oSearchViewGet2 = $("#searchView .get2"),
		oSearchViewGet3 = $("#searchView .get3"),
		oSearchViewGet4 = $("#searchView .get4"),
		oSearchViewGet5 = $("#searchView .get5"),
		oSearchViewNot = $("#searchView .not"),
		searchBtn = $("#searchView button");

	var audio = document.createElement('audio');
	var source = document.createElement('source');

		source.type = "audio/mpeg";
		source.src = "lucky.mp3";
		source.autoplay = "autoplay";
		source.controls = "controls";
		audio.appendChild(source);

		audio.play();

    var view = {   
            //渲染主界面宽高,并绑定事件
            renderUI:function() {        
            	//header           	
 				header.height(sHeight*0.178);
 				header.css("line-height",sHeight*0.178+"px");

            	//top
            	top.width(sWidth);
            	top.height(sHeight*0.0435);
            	top.css("line-height",sHeight*0.0435+"px");
            	top.css("font-size",sWidth*0.032+"px");
            	oFocus.width(sWidth*0.245);oFocus.height(sHeight*0.0299);
            	oFriend.width(sWidth*0.333);oFriend.height(sHeight*0.0299);
            	topBtn.css("margin-right",sWidth*0.0467+"px"); 
            	topBtn.css("margin-top",(sHeight*0.0136)/2+"px"); 
            	//content
	            con.width(sWidth);
	            var a = sHeight*(1-0.178-0.0435)-sWidth*0.245;
	            con.height(a); //1-header-top-footer&pic)
				conImg.width(sWidth*0.339); 
            	conImg.height(sWidth*0.339);
            	conImg.css("margin-bottom",sHeight*0.015+"px");
            	conBtn.width(sWidth*0.136);
            	conBtn.height(sHeight*0.0577);

            	var ab = (a-sWidth*0.339*2-sHeight*0.0577*2-sHeight*0.015*2)/3;
            	conFir.css("margin-top",ab+"px");
            	conSec.css("margin-top",ab+"px"); 	
            	conFir1.css("margin-bottom",ab+"px");
            	conSec1.css("margin-bottom",ab+"px"); 

            	//footer
            	footer.height(sWidth*0.17);
            	footerLi.width(sWidth*0.17);
            	footerLi.height(sWidth*0.17);
            	footerLi.css("margin-left",sWidth*(1-0.17*4-0.245)/6+"px"); 
            	oExchange1.width(sWidth*0.245); 
            	oExchange1.height(sWidth*0.245);
            	oExchanges.width(sWidth*0.245); 
            	oExchanges.height(sWidth*0.245);
            	star.width(0);
            	star.height(0);
            	footer.css("font-size",sHeight*0.02552+"px"); 

            	footerSpan.css("top",+sWidth*0.17*0.369+"px");
            	countPotion.css("left",sWidth*0.17*0.64+sWidth*(1-0.17*4-0.245)/6+"px");
            	countRose.css("left",sWidth*0.17*(1+0.65)+sWidth*(1-0.17*4-0.245)/6*2+"px");
            	countMagicWand.css("left",sWidth*0.17*(2+0.63)+sWidth*(1-0.17*4-0.245)/6*3+"px");
            	countGift.css("left",sWidth*0.17*(3+0.7)+sWidth*(1-0.17*4-0.245)/6*4+"px");

            	//绑定事件
            	// 关注
            	oFocus.on(eventName, function() {
		   			view.openFocusView();
				});

            	// 邀请好友
            	oFriend.on(eventName, function() {
		   			view.openFriendView();
				});

            	//搜索
            	oSearch1.on(eventName, function() {
            		if( window.totalAmount < 300 ) //魔石不够
		   				view.openSearch0View();
		   			else //搜索魔药
		   				view.openSearch1View();
				});
				oSearch2.on(eventName, function() {
            		if( window.totalAmount < 300 ) 
		   				view.openSearch0View();
		   			else //搜索玫瑰花
		   				view.openSearch1View();
				});
				oSearch3.on(eventName, function() {
            		if( window.totalAmount < 300 )
		   				view.openSearch0View();
		   			else //搜索魔法棒
		   				view.openSearch3View();
				});
				oSearch4.on(eventName, function() {
            		if( window.totalAmount < 300 ) 
		   				view.openSearch0View();
		   			else //搜索礼盒
		   				view.openSearch4View();
				});

            	//兑换玫瑰
				oExchange1.on(eventName, function() {
					//兑换一束
					if(potion && rose && magicWand && gift){
						if(!parseInt(localStorage.getItem("submitOr"))){
							view.openExchangeView2();
						}
						else
							$("#submitView").show();				
					}
					
					//兑换一支
					else if(potion && rose && magicWand && (!gift)){
						if(!parseInt(localStorage.getItem("submitOr"))){	
							view.openExchangeRose1();
						}
						else
							$("#submitView").show();	
					}
						
					//不能兑换
		   			else
		   				view.openExchangeRule();
		   				// return false;
				});
				oExchanges.on(eventName, function() {
					//兑换一束
					if(potion && rose && magicWand && gift){
						if(!parseInt(localStorage.getItem("submitOr"))){	
							view.openExchangeView2();
						}
						else
							$("#submitView").show();	
					}
					
					//兑换一支
					else if(potion && rose && magicWand && (!gift)){
						if(!parseInt(localStorage.getItem("submitOr"))){	
							view.openExchangeRose1();
						}
						else
							$("#submitView").show();	
					}
						
					//不能兑换
		   			else
		   				view.openExchangeRule();
		   				// return false;
				});
            },

            // 闪烁
            flash: function(potion,rose,magicWand,gift) {
        		if(potion && rose && magicWand && gift){
					oExchange1.hide();
					oExchanges.show();
					star.show();
					timer4 = setInterval(function(){
			            star.animate({width:sWidth*0.1+"px"},100)//语句的顺序无影响
			            	.animate({width:sWidth*0.245+"px"},300);
			            star.animate({height:sWidth*0.1+"px"},100)//语句的顺序无影响
			            	.animate({height:sWidth*0.245+"px"},300);
			        },100); 
				}       
				else if(potion && rose && magicWand){
					oExchanges.hide();
					oExchange1.show();
					star.show();
					timer5 = setInterval(function(){
			            star.animate({width:sWidth*0.1+"px"},100)//语句的顺序无影响
			            	.animate({width:sWidth*0.245+"px"},300);
			            star.animate({height:sWidth*0.1+"px"},100)//语句的顺序无影响
			            	.animate({height:sWidth*0.245+"px"},300);
			        },100); 
				}    
            },

            //弹出框
            // 打开关注界面
            openFocusView: function() {
				var oFocusView = $("#focusView");
				// 设置关注界面的高,宽
				oFocusView.width(sWidth*0.96);
				oFocusView.css("left",sWidth*0.04/2+"px"); 
				oFocusView.height(sHeight*0.649); 
				oFocusView.css("top",sHeight*0.351/2+"px");
				oFocusView.css("font-size",sWidth*0.043+"px"); 
				oMask.show();
				oFocusView.show();

				//点击界面以外的区域也可以关闭界面
				oMask.on(eventName, function() {
					oFocusView.hide(); 
					oMask.hide();
				});
            },

            // 打开邀请好友界面
            openFriendView: function() { 
				var oFriendView = $("#friendView");
				oFriendView.width(sWidth);
				oFriendView.height(sHeight); 
				oMask.show();
				oFriendView.show();

				//点击任何区域都可关闭界面
				oFriendView.on(eventName, function() {
					oFriendView.hide(); 
					oMask.hide();
				});
				oMask.on(eventName, function() {
					oFriendView.hide(); 
					oMask.hide();
				});
            },

            // 打开搜索界面
            //魔石不够
            openSearch0View: function() {
				var oSearch0View = $("#search0View");				
				// 设置搜索界面的高,宽
				oSearch0View.width(sWidth*0.96);
				oSearch0View.css("left",sWidth*0.04/2+"px"); 
				oSearch0View.height(sHeight*0.306);
				oSearch0View.css("top",sHeight*0.694/2+"px"); 

				oMask.show();
				oSearch0View.show();

				//点击界面以外的区域也可以关闭界面
				oMask.on(eventName, function() {
					oSearch0View.hide(); 
					oMask.hide();
				});

				search0focus = $("#search0View .focus");
				search0friend = $("#search0View .friend");
				//关注
				search0focus.on(eventName, function() {
					oMask.hide();
					oSearch0View.hide(); 
		   			view.openFocusView();
				});

            	// 邀请好友
            	search0friend.on(eventName, function() {
            		oMask.hide();
            		oSearch0View.hide(); 
		   			view.openFriendView();
		   			
				});

            },

            
            //魔石足够，搜索魔药/玫瑰花
            openSearch1View: function() {
            	window.totalAmount-=300;        
            	view.saveStorage(5,window.totalAmount);
            	countTotalAmount.text(window.totalAmount);
				
				//loading界面
				oMask.show();
				oSearchView.show();
				oSearchViewLoading.show(); 

				//搜索界面的loading界面
				searchImg.width(0);	//第二次点搜索 依然从0开始变化

				timer1 = setTimeout(function(){
	                searchImg.animate({width:"0px"},100)//语句的顺序无影响
	                		 .animate({width:"86%"},1500);
		        },100); 

				timer2 = setTimeout(function(){
					oSearchViewLoading.hide();
					clearTimeout(timer1);
					clearTimeout(timer2);

					//搜索结果页面
					//生成0-1的随机数 Math.random() ???
					randA = Math.random()*100;
	                if( randA < 25 ){   
		                oSearchViewGet1.show();		 						
						//修改魔药数量
	                	potion++; 
	                	view.saveStorage(1,potion);
	                	countPotion.text(potion);

						//点确定关闭界面	
						searchBtn.on(eventName, function() {
							oMask.hide();
							oSearchView.hide();
							oSearchViewGet1.hide();	 
						});
		               
					}
					else if( 25<= randA&&randA < 50 ){
		                oSearchViewGet2.show();		 						
						//修改花瓣数量
	                	rose++;
	                	view.saveStorage(2,rose);
	                	countRose.text(rose);

						//点确定关闭界面
						searchBtn = $("#searchView button");	
						searchBtn.on(eventName, function() {
							oSearchView.hide();
							oSearchViewGet2.hide();	 
							oMask.hide();
						});		               
					}
	                else if(50<= randA&&randA < 75){
		                oSearchViewGet5.show();		 						
						//修改钻石
	                	window.totalAmount+=50;        
            			view.saveStorage(5,window.totalAmount);
            			countTotalAmount.text(window.totalAmount);

            			//点确定关闭界面
						searchBtn = $("#searchView button");	
						searchBtn.on(eventName, function() {
							oSearchView.hide();
							oSearchViewGet5.hide();	 
							oMask.hide();
						});		              
					}		      
					else{            
						oSearchViewNot.show();
						//点确定关闭界面
						searchBtn.on(eventName, function() {
							oSearchView.hide(); 
							oSearchViewNot.hide();
							oMask.hide();
						});
					}
				},2000); 
		       
            },

            
            //魔石足够，搜索魔法棒
			openSearch3View: function() {
            	window.totalAmount-=300;        
            	view.saveStorage(5,window.totalAmount);
            	countTotalAmount.text(window.totalAmount);
				
				//loading界面
				oMask.show();
				oSearchView.show();
				oSearchViewLoading.show(); 

				//搜索界面的loading界面
				searchImg.width(0);	//第二次点搜索 依然从0开始变化

				timer1 = setTimeout(function(){
	                searchImg.animate({width:"0px"},100)//语句的顺序无影响
	                		 .animate({width:"86%"},1500);
		        },100); 

				timer2 = setTimeout(function(){
					oSearchViewLoading.hide();
					clearTimeout(timer1);
					clearTimeout(timer2);

					//搜索结果页面
					//生成0-1的随机数 Math.random() ???
					randA = Math.random()*100;
					if( b%100 == 77){
						if( randA < 40 ){
			                oSearchViewGet3.show();		 						
							//修改魔法棒数量
		                	magicWand++; 
		                	view.saveStorage(3,magicWand);
		                	countMagicWand.text(magicWand);

							//点确定关闭界面
							searchBtn = $("#searchView button");	
							searchBtn.on(eventName, function() {
								oSearchView.hide();
								oSearchViewGet3.hide();	 
								oMask.hide();
							});
							view.flash(potion,rose,magicWand,gift);
						}		               	
						else if( 40<= randA&&randA < 55 ){
							oSearchViewGet1.show();		 						
							//修改魔药数量
		                	potion++; 
		                	view.saveStorage(1,potion);
		                	countPotion.text(potion);

							//点确定关闭界面	
							searchBtn.on(eventName, function() {
								oMask.hide();
								oSearchView.hide();
								oSearchViewGet1.hide();	 
							});
			               
						}
						else if( 55<= randA&&randA < 70 ){
			                oSearchViewGet2.show();		 						
							//修改花瓣数量
		                	rose++;
		                	view.saveStorage(2,rose);
		                	countRose.text(rose);

							//点确定关闭界面
							searchBtn = $("#searchView button");	
							searchBtn.on(eventName, function() {
								oSearchView.hide();
								oSearchViewGet2.hide();	 
								oMask.hide();
							});		               
						}
		                else if(70<= randA&&randA < 85){
			                oSearchViewGet5.show();		 						
							//修改钻石
		                	window.totalAmount+=50;        
	            			view.saveStorage(5,window.totalAmount);
	            			countTotalAmount.text(window.totalAmount);

	            			//点确定关闭界面
							searchBtn = $("#searchView button");	
							searchBtn.on(eventName, function() {
								oSearchView.hide();
								oSearchViewGet5.hide();	 
								oMask.hide();
							});		              
						}
						else{
							oSearchViewNot.show();
							//点确定关闭界面
							searchBtn.on(eventName, function() {
								oSearchView.hide(); 
								oSearchViewNot.hide();
								oMask.hide();
							});
						}              
	                }
	                else if( randA < 25 ){
		                oSearchViewGet1.show();		 						
						//修改魔药数量
	                	potion++; 
	                	view.saveStorage(1,potion);
	                	countPotion.text(potion);

						//点确定关闭界面	
						searchBtn.on(eventName, function() {
							oMask.hide();
							oSearchView.hide();
							oSearchViewGet1.hide();	 
						});
					}
					else if( 25<= randA&&randA < 50 ){
		                oSearchViewGet2.show();		 						
						//修改花瓣数量
	                	rose++;
	                	view.saveStorage(2,rose);
	                	countRose.text(rose);

						//点确定关闭界面
						searchBtn = $("#searchView button");	
						searchBtn.on(eventName, function() {
							oSearchView.hide();
							oSearchViewGet2.hide();	 
							oMask.hide();
						});		               
					}
	                else if(50<= randA&&randA < 75){
		                oSearchViewGet5.show();		 						
						//修改钻石
	                	window.totalAmount+=20;        
            			view.saveStorage(5,window.totalAmount);
            			countTotalAmount.text(window.totalAmount);

            			//点确定关闭界面
						searchBtn = $("#searchView button");	
						searchBtn.on(eventName, function() {
							oSearchView.hide();
							oSearchViewGet5.hide();	 
							oMask.hide();
						});		              
					}
					else{            
						oSearchViewNot.show();
						//点确定关闭界面
						searchBtn.on(eventName, function() {
							oSearchView.hide(); 
							oSearchViewNot.hide();
							oMask.hide();
						});
					}
				},2000); 
				
		       
            },
         
           //魔石足够，搜索礼盒
            openSearch4View: function() {
            	window.totalAmount-=300;        
            	view.saveStorage(5,window.totalAmount);
            	countTotalAmount.text(window.totalAmount);
				
				//loading界面
				oMask.show();
				oSearchView.show();
				oSearchViewLoading.show(); 

				//搜索界面的loading界面
				searchImg.width(0);	//第二次点搜索 依然从0开始变化

				timer1 = setTimeout(function(){
	                searchImg.animate({width:"0px"},100)//语句的顺序无影响
	                		 .animate({width:"86%"},1500);
		        },100); 

				timer2 = setTimeout(function(){
					oSearchViewLoading.hide();
					clearTimeout(timer1);
					clearTimeout(timer2);

					//搜索结果页面
					//生成0-1的随机数 Math.random() ???
					randA = Math.random()*100;
					if( b%1000 == 158){
						if( randA < 40 ){
			                oSearchViewGet4.show();		 						
							//修改礼物数量
		                	gift++; 
		                	view.saveStorage(4,gift);
		                	countGift.text(gift);

							//点确定关闭界面
							searchBtn = $("#searchView button");	
							searchBtn.on(eventName, function() {
								oSearchView.hide();
								oSearchViewGet4.hide();	 
								oMask.hide();
							});
							view.flash(potion,rose,magicWand,gift);
						}	
		                else if( 40<= randA&&randA < 55 ){
							oSearchViewGet1.show();		 						
							//修改魔药数量
		                	potion++; 
		                	view.saveStorage(1,potion);
		                	countPotion.text(potion);

							//点确定关闭界面	
							searchBtn.on(eventName, function() {
								oMask.hide();
								oSearchView.hide();
								oSearchViewGet1.hide();	 
							});
			               
						}
						else if( 55<= randA&&randA < 70 ){
			                oSearchViewGet2.show();		 						
							//修改花瓣数量
		                	rose++;
		                	view.saveStorage(2,rose);
		                	countRose.text(rose);

							//点确定关闭界面
							searchBtn = $("#searchView button");	
							searchBtn.on(eventName, function() {
								oSearchView.hide();
								oSearchViewGet2.hide();	 
								oMask.hide();
							});		               
						}
		                else if(70<= randA&&randA < 85){
			                oSearchViewGet5.show();		 						
							//修改钻石
		                	window.totalAmount+=50;        
	            			view.saveStorage(5,window.totalAmount);
	            			countTotalAmount.text(window.totalAmount);

	            			//点确定关闭界面
							searchBtn = $("#searchView button");	
							searchBtn.on(eventName, function() {
								oSearchView.hide();
								oSearchViewGet5.hide();	 
								oMask.hide();
							});		              
						}
						else{
							oSearchViewNot.show();
							//点确定关闭界面
							searchBtn.on(eventName, function() {
								oSearchView.hide(); 
								oSearchViewNot.hide();
								oMask.hide();
							});
						}              
	                }
	                else if( randA < 25 ){
		                oSearchViewGet1.show();		 						
						//修改魔药数量
	                	potion++; 
	                	view.saveStorage(1,potion);
	                	countPotion.text(potion);

						//点确定关闭界面	
						searchBtn.on(eventName, function() {
							oMask.hide();
							oSearchView.hide();
							oSearchViewGet1.hide();	 
						});		               
					}
					else if( 25<= randA&&randA < 50 ){
		                oSearchViewGet2.show();		 						
						//修改花瓣数量
	                	rose++;
	                	view.saveStorage(2,rose);
	                	countRose.text(rose);

						//点确定关闭界面
						searchBtn = $("#searchView button");	
						searchBtn.on(eventName, function() {
							oSearchView.hide();
							oSearchViewGet2.hide();	 
							oMask.hide();
						});		               
					}
	                else if(50<= randA&&randA < 75){
		                oSearchViewGet5.show();		 						
						//修改钻石
	                	window.totalAmount+=50;        
            			view.saveStorage(5,window.totalAmount);
            			countTotalAmount.text(window.totalAmount);

            			//点确定关闭界面
						searchBtn = $("#searchView button");	
						searchBtn.on(eventName, function() {
							oSearchView.hide();
							oSearchViewGet5.hide();	 
							oMask.hide();
						});		              
					}					
					else{            
						oSearchViewNot.show();
						//点确定关闭界面
						searchBtn.on(eventName, function() {
							oSearchView.hide(); 
							oSearchViewNot.hide();
							oMask.hide();
						});
					}
				},2000); 
		       
            },
					           
            //打开兑换玫瑰规则界面
            openExchangeRule: function() { 
				var oExchangeRule = $("#exchangeRule");

				// 设置兑换玫瑰规则界面的宽,高
				oExchangeRule.width(sWidth*0.96);
				oExchangeRule.height(sHeight*0.649); 
				oExchangeRule.css("top",sHeight*0.351/2+"px"); //oExchangeRule.style.top=sHeight/2-dHeight/2+"px";
				oExchangeRule.css("left",sWidth*0.04/2+"px"); 
				oExchangeRule.css("font-size",sWidth*0.0374+"px");

				var oExchangeRulePc = $("#exchangeRule .pCon");
				oExchangeRulePc.css("margin",sHeight*0.649*0.0179+"px"); //5个

				// var oExchangeRuleBtn = $("#exchangeRule button");
				// oExchangeRuleBtn.css("bottom",+"px");

				oMask.show();
				oExchangeRule.show();

			
				//点击界面以外的区域也可以关闭界面
				oMask.on(eventName, function() {
					oExchangeRule.hide(); //document.body.removeChild(oExchangeRule);
					oMask.hide();
				});
            },

            //打开兑换1支玫瑰界面
            openExchangeRose1: function() {
				var oExchangeRose1 = $("#exchangeRose1");

				// 设置兑换1支玫瑰界面的高,宽
				oExchangeRose1.width(sWidth*0.96);
				oExchangeRose1.height(sHeight*0.304);
				oExchangeRose1.css("left",sWidth*0.04/2+"px"); 
				oExchangeRose1.css("top",sHeight*0.696/2+"px"); 
				oMask.show();
				oExchangeRose1.show();
				
				exchangeRose1 = $("#exchangeRose1 .yes");
				exchangeNo = $("#exchangeRose1 .no");
				//确认兑换
				exchangeRose1.on(eventName, function() {
					clearInterval(timer3);
					clearInterval(timer4);
					star.hide();
		   			oExchangeRose1.hide(); 
					oMask.hide();
					view.openExchangeView1();
				});

            	//继续寻找
            	exchangeNo.on(eventName, function() {
		   			oExchangeRose1.hide(); 
					oMask.hide();
				});
            },

            //打开领取玫瑰界面
            openExchangeView1: function() {
            	clearInterval(timer3);
            	clearInterval(timer4);
            	star.hide(); 
				var oExchangeView = $("#exchangeView1");
				
				oExchangeView.show();
				// 设置领取玫瑰界面的高,宽
				oExchangeView.width(sWidth);
				oExchangeView.height(sHeight); 

				oExchangeView.css("font-size",sWidth*0.035+"px");
				oExchangeView.css("padding-top",sHeight*0.04198+"px");
				
				//领取内容界面
				exchangeForm= $("#exchangeView1 form");
				exchangeForm.css("width",sWidth*0.8667+"px");
				exchangeForm.css("margin-left",sWidth*0.06665+"px");

				exchangeFormSec= $("#exchangeView1 form section");
				exchangeFormSec.css("padding-top",sHeight*0.03598+"px"); /*改第一个和最后*/

				exchangeFormLeft= $("#exchangeView1 form section label");
				exchangeFormLeft.css("width",sWidth*0.2+"px");

				exchangeFormLeft.css("line-height",sWidth*0.035*1.067+sHeight*0.013*2+"px"); 
				exchangeFormRight= $("#exchangeView1 form section input");
				exchangeFormRight.css("width",sWidth*0.6+"px"); 
				exchangeFormRight.css("padding",sHeight*0.013+"px");

				exchangeFooter= $("#exchangeView1 div.bottom");
				exchangeFooter.css("width",sWidth+"px");
				exchangeFooter.css("height",sHeight*0.22+"px");
			
				exchangeLogo = $("#exchangeView1 img");
				exchangeLogo.css("height",sHeight*(0.22-0.09)+"px");
				exchangeLogo.css("width",sHeight*(0.22-0.09)+"px");
				exchangeLogo.css("margin-top",sHeight*0.04+"px");
				exchangeLogo.css("margin-left",sHeight*0.04+"px");
				
				exchangeP = $("#exchangeView1 div.download p");
				exchangeP.css("margin-top",sHeight*0.04+"px");

				exchangeSubmit= $("#exchangeView1 input[type='submit']");
				//与form宽度一致,还没设，改成原图了
				exchangeSubmit.css("width",sWidth*0.867+"px"); 
				exchangeSubmit.css("height",sHeight*0.05097+"px");
				exchangeSubmit.css("margin-bottom",sHeight*0.5-sWidth*0.7+"px");
				
				
				exchangeSubmit.bind("click",function(event){
				    var username = $("#exchangeView1 .user_name").val();  //获取元素的值
				    var phone = $("#exchangeView1 .phone").val();
				    var postcode = $("#exchangeView1 .postcode").val();
				    var address = $("#exchangeView1 .address").val();

			        if(username==""|| phone=="" || postcode=="" || address==""){     //判断值是否为空
				        $("#exchangeView1 .middle .show").html("<p>文本框的值不能为空！</p>"); 
				        alert("文本框的内容不能为空！");       //提示信息
				        event.preventDefault();            //阻止默认行为 ( 表单提交 )
				    }
				    else{
				    	submitOr=1;
					    view.saveStorage(6,submitOr); 		 //已经提交
					    potion--; 
			        	view.saveStorage(1,potion);
			        	countPotion.text(potion);
			        	rose--;
			        	view.saveStorage(2,rose);
			        	countRose.text(rose);
			        	magicWand--; 
			        	view.saveStorage(3,magicWand);
			        	countMagicWand.text(magicWand);
					    $("#exchangeView1 form").submit();
					}
			   	})
            },
            openExchangeView2: function() {
            	clearInterval(timer3);
            	clearInterval(timer4);
            	star.hide();
				var oExchangeView = $("#exchangeView2");
				
				oExchangeView.show();
				// 设置领取玫瑰界面的高,宽
				oExchangeView.width(sWidth);
				oExchangeView.height(sHeight); 

				oExchangeView.css("font-size",sWidth*0.035+"px");
				oExchangeView.css("padding-top",sHeight*0.04198+"px");
				
				//领取内容界面
				exchangeForm= $("#exchangeView2 form");
				exchangeForm.css("width",sWidth*0.8667+"px");
				exchangeForm.css("margin-left",sWidth*0.06665+"px");

				exchangeFormSec= $("#exchangeView2 form section");
				exchangeFormSec.css("padding-top",sHeight*0.03598+"px"); /*改第一个和最后*/

				exchangeFormLeft= $("#exchangeView2 form section label");
				exchangeFormLeft.css("width",sWidth*0.2+"px");

				exchangeFormLeft.css("line-height",sWidth*0.035*1.067+sHeight*0.013*2+"px"); 
				exchangeFormRight= $("#exchangeView2 form section input");
				exchangeFormRight.css("width",sWidth*0.6+"px"); 
				exchangeFormRight.css("padding",sHeight*0.013+"px");

				exchangeFooter= $("#exchangeView2 div.bottom");
				exchangeFooter.css("width",sWidth+"px");
				exchangeFooter.css("height",sHeight*0.22+"px");
			
				exchangeLogo = $("#exchangeView2 img");
				exchangeLogo.css("height",sHeight*(0.22-0.09)+"px");
				exchangeLogo.css("width",sHeight*(0.22-0.09)+"px");
				exchangeLogo.css("margin-top",sHeight*0.04+"px");
				exchangeLogo.css("margin-left",sHeight*0.04+"px");
				
				exchangeP = $("#exchangeView2 div.download p");
				exchangeP.css("margin-top",sHeight*0.04+"px");

				exchangeSubmit= $("#exchangeView2 input[type='submit']");
				//与form宽度一致,还没设，改成原图了
				exchangeSubmit.css("width",sWidth*0.867+"px"); 
				exchangeSubmit.css("height",sHeight*0.05097+"px");
				exchangeSubmit.css("margin-bottom",sHeight*0.5-sWidth*0.7+"px");

				exchangeSubmit.bind("click",function(event){
				    var username = $("#exchangeView2 .user_name").val();  //获取元素的值
				    var phone = $("#exchangeView2 .phone").val();
				    var postcode = $("#exchangeView2 .postcode").val();
				    var address = $("#exchangeView2 .address").val();

			        if(username==""|| phone=="" || postcode=="" || address==""){     //判断值是否为空
				        $("#exchangeView2 .middle .show").html("<p>文本框的值不能为空！</p>");        //提示信息
				        alert("文本框的内容不能为空！");
				        event.preventDefault();            //阻止默认行为 ( 表单提交 )
				    }
				    else{
				    	submitOr=1;
					    view.saveStorage(6,submitOr); 		 //已经提交
					    potion--; 
			        	view.saveStorage(1,potion);
			        	countPotion.text(potion);
			        	rose--;
			        	view.saveStorage(2,rose);
			        	countRose.text(rose);
			        	magicWand--; 
			        	view.saveStorage(3,magicWand);
			        	countMagicWand.text(magicWand);
			        	gift--; 
	                	view.saveStorage(4,gift);
	                	countGift.text(gift);
					    $("#exchangeView2 form").submit();
					}
			   	})
            },

            //保存用户数据
            saveStorage: function(d,value) { 
            	if(d==1) 
	                localStorage.setItem("potion",value);
	            else if(d==2) 
	                localStorage.setItem("rose",value);
	            else if(d==3)
	                localStorage.setItem("magicWand",value);
	            else if(d==4)
	            	localStorage.setItem("gift",value);
	            else if(d==5)
	            	localStorage.setItem("totalAmount",value);
	            else if(d==6)
	            	localStorage.setItem("submitOr",value);
            },

            //读取用户数据
            loadStorage: function(){
            	if(localStorage.getItem("submitOr") &&localStorage.getItem("potion") &&localStorage.getItem("rose")&&localStorage.getItem("magicWand") &&localStorage.getItem("gift")&&localStorage.getItem("totalAmount")){
	        		potion = localStorage.getItem("potion");
	        		countPotion.text(potion);
	                rose = localStorage.getItem("rose");
	                countRose.text(rose);
	                magicWand = localStorage.getItem("magicWand");
	                countMagicWand.text(magicWand);
	            	gift = localStorage.getItem("gift");
	            	countGift.text(gift);
	            	window.totalAmount = localStorage.getItem("totalAmount");
	            	countTotalAmount.text(totalAmount);
	            	submitOr = localStorage.getItem("submitOr");
            	}
            	else{
		            // 初始化
	    			potion = 0; 
	    			view.saveStorage(1,potion);
	                rose = 0;
	                view.saveStorage(2,rose);
		            magicWand = 0;
		            view.saveStorage(3,magicWand);
		            gift =0;
		            view.saveStorage(4,gift);
		            window.totalAmount = 1000; //
		            view.saveStorage(5,window.totalAmount);//
		            submitOr = 0; //初始为0，用户提交后为1
		            view.saveStorage(6,submitOr);
            	}
            }
    };

    window.View = view;

	window.totalAmount;
    window.countTotalAmount = $("#top #totalAmount");
    
    view.loadStorage();
    // alert(localStorage.getItem("submitOr"));
    // alert(window.totalAmount);

    potion = parseInt(potion); rose = parseInt(rose); magicWand = parseInt(magicWand); gift = parseInt(gift); window.totalAmount = parseInt(window.totalAmount);
    view.flash(potion,rose,magicWand,gift);
    view.renderUI();
} 
//$(document).ready(function(){});
//文件在加载之后能立即执行,所以把这个js放在最后,等所有元素加载后再执行




