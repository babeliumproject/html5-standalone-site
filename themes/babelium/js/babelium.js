var BP={};var Sha1={};
Sha1.hash=function(a,b){(typeof b=="undefined"||b)&&(a=Utf8.encode(a));var d=[1518500249,1859775393,2400959708,3395469782];a+=String.fromCharCode(128);for(var c=Math.ceil((a.length/4+2)/16),g=Array(c),e=0;e<c;e++){g[e]=Array(16);for(var f=0;f<16;f++)g[e][f]=a.charCodeAt(e*64+f*4)<<24|a.charCodeAt(e*64+f*4+1)<<16|a.charCodeAt(e*64+f*4+2)<<8|a.charCodeAt(e*64+f*4+3)}g[c-1][14]=(a.length-1)*8/Math.pow(2,32);g[c-1][14]=Math.floor(g[c-1][14]);g[c-1][15]=(a.length-1)*8&4294967295;for(var f=1732584193,h=
4023233417,o=2562383102,q=271733878,p=3285377520,m=Array(80),k,i,l,r,n,e=0;e<c;e++){for(var j=0;j<16;j++)m[j]=g[e][j];for(j=16;j<80;j++)m[j]=Sha1.ROTL(m[j-3]^m[j-8]^m[j-14]^m[j-16],1);k=f;i=h;l=o;r=q;n=p;for(j=0;j<80;j++){var s=Math.floor(j/20),s=Sha1.ROTL(k,5)+Sha1.f(s,i,l,r)+n+d[s]+m[j]&4294967295;n=r;r=l;l=Sha1.ROTL(i,30);i=k;k=s}f=f+k&4294967295;h=h+i&4294967295;o=o+l&4294967295;q=q+r&4294967295;p=p+n&4294967295}return Sha1.toHexStr(f)+Sha1.toHexStr(h)+Sha1.toHexStr(o)+Sha1.toHexStr(q)+Sha1.toHexStr(p)};
Sha1.f=function(a,b,d,c){switch(a){case 0:return b&d^~b&c;case 1:return b^d^c;case 2:return b&d^b&c^d&c;case 3:return b^d^c}};Sha1.ROTL=function(a,b){return a<<b|a>>>32-b};Sha1.toHexStr=function(a){for(var b="",d,c=7;c>=0;c--)d=a>>>c*4&15,b+=d.toString(16);return b};
var Utf8={encode:function(a){a=a.replace(/[\u0080-\u07ff]/g,function(a){a=a.charCodeAt(0);return String.fromCharCode(192|a>>6,128|a&63)});return a=a.replace(/[\u0800-\uffff]/g,function(a){a=a.charCodeAt(0);return String.fromCharCode(224|a>>12,128|a>>6&63,128|a&63)})},decode:function(a){a=a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(a){a=(a.charCodeAt(0)&15)<<12|(a.charCodeAt(1)&63)<<6|a.charCodeAt(2)&63;return String.fromCharCode(a)});return a=a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,
function(a){a=(a.charCodeAt(0)&31)<<6|a.charCodeAt(1)&63;return String.fromCharCode(a)})}},Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){for(var b="",d,c,g,e,f,h,o=0,a=Base64._utf8_encode(a);o<a.length;)d=a.charCodeAt(o++),c=a.charCodeAt(o++),g=a.charCodeAt(o++),e=d>>2,d=(d&3)<<4|c>>4,f=(c&15)<<2|g>>6,h=g&63,isNaN(c)?f=h=64:isNaN(g)&&(h=64),b=b+this._keyStr.charAt(e)+this._keyStr.charAt(d)+this._keyStr.charAt(f)+this._keyStr.charAt(h);return b},
decode:function(a){for(var b="",d,c,g,e,f,h=0,a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");h<a.length;)d=this._keyStr.indexOf(a.charAt(h++)),c=this._keyStr.indexOf(a.charAt(h++)),e=this._keyStr.indexOf(a.charAt(h++)),f=this._keyStr.indexOf(a.charAt(h++)),d=d<<2|c>>4,c=(c&15)<<4|e>>2,g=(e&3)<<6|f,b+=String.fromCharCode(d),e!=64&&(b+=String.fromCharCode(c)),f!=64&&(b+=String.fromCharCode(g));return b=Base64._utf8_decode(b)},_utf8_encode:function(a){for(var a=a.replace(/\r\n/g,"\n"),b="",d=0;d<a.length;d++){var c=
a.charCodeAt(d);c<128?b+=String.fromCharCode(c):(c>127&&c<2048?b+=String.fromCharCode(c>>6|192):(b+=String.fromCharCode(c>>12|224),b+=String.fromCharCode(c>>6&63|128)),b+=String.fromCharCode(c&63|128))}return b},_utf8_decode:function(a){for(var b="",d=0,c=c1=c2=0;d<a.length;)c=a.charCodeAt(d),c<128?(b+=String.fromCharCode(c),d++):c>191&&c<224?(c2=a.charCodeAt(d+1),b+=String.fromCharCode((c&31)<<6|c2&63),d+=2):(c2=a.charCodeAt(d+1),c3=a.charCodeAt(d+2),b+=String.fromCharCode((c&15)<<12|(c2&63)<<6|
c3&63),d+=3);return b}};var Controller=Cairngorm.FrontController.extend({init:function(){this._super();this.addCommand(ViewChangeEvent.VIEW_HOME_MODULE,ViewHomeModuleCommand);this.addCommand(ViewChangeEvent.VIEW_EXERCISE_MODULE,ViewExerciseModuleCommand);this.addCommand(ViewChangeEvent.VIEW_EVALUATION_MODULE,ViewEvaluationModuleCommand);this.addCommand(ViewChangeEvent.VIEW_SUBTITLE_MODULE,ViewSubtitleModuleCommand);this.addCommand(ViewChangeEvent.VIEW_ABOUT_MODULE,ViewAboutModuleCommand);this.addCommand(ViewChangeEvent.VIEW_CONFIG_MODULE,
ViewConfigModuleCommand);this.addCommand(ViewChangeEvent.VIEW_LOGIN_POPUP,ToggleLoginPopupCommand);this.addCommand(ViewChangeEvent.VIEW_POPSTATE,ViewPopStateCommand);this.addCommand(LoginEvent.PROCESS_LOGIN,ProcessLoginCommand);this.addCommand(LoginEvent.SIGN_OUT,SignOutCommand);this.addCommand(HomepageEvent.LATEST_USER_UPLOADED_VIDEOS,LatestUploadedVideosCommand);this.addCommand(HomepageEvent.BEST_RATED_VIDEOS_SIGNED_IN,SignedBestVideosCommand);this.addCommand(HomepageEvent.LATEST_USER_ACTIVITY,
LatestUserActivityCommand);this.addCommand(ExerciseEvent.EXERCISE_SELECTED,ExerciseSelectedCommand);this.addCommand(ExerciseEvent.GET_RECORDABLE_EXERCISES,GetRecordableExercisesCommand)}});BP.EM=function(){var a=null,b=null;return{loadExercise:function(b,c){a=b;this.setupVideoPlayer();this.onExerciseSelected(c)},setupVideoPlayer:function(){},onExerciseSelected:function(a){b=a.name;this.prepareExercise()},prepareExercise:function(){a.stopVideo();a.state(0);a.videoSource(b)},resetComp:function(){a&&(a.endVideo(),a.setSubtitle(""),a.videoSource(""),a.state(0))}}}();BP.CMS=function(){function a(){p.find("ul > li > a").not(":last").hover(function(){$(this).parent().css("background","url(themes/babelium/images/separator.png) no-repeat center right, url(themes/babelium/images/button_nav_highlight_"+$(this).attr("class")+".png) no-repeat 50% 58%")},function(){$(this).parent().css("background","url(themes/babelium/images/separator.png) no-repeat center right")});p.find("ul > li > a:last").hover(function(){$(this).parent().css("background"," url(themes/babelium/images/button_nav_highlight_"+
$(this).attr("class")+".png) no-repeat 50% 58%")},function(){$(this).parent().css("background","none")})}function b(){var a=$("select#localebox").css("display","none");a.parent().append("<div class='localebox'></div>");var b=$(".localebox");b.append("<div class='selectBox'></div>");b.append("<ul class='dropDown'></ul>");var c=$(".selectBox"),d=$(".dropDown").hide();a.find("option").each(function(){var b=$(this),n=$(this).text(),n="<img src='"+$(this).data("icon")+"' width='16' height='16' align='left' hspace='3' vspace='3' alt='"+
n+"' />"+n;$(this).is(":selected")&&c.html(n+"<img src='themes/babelium/images/arrow-down.png'alignt='left' style='float:right; margin-right: 3px;' />");n=$("<li>",{html:n});d.append(n);n.click(function(){c.html($(this).html()+"<img src='themes/babelium/images/arrow-down.png'alignt='left' style='float:right; margin-right: 3px;' />");d.slideUp();a.val(b.val())})});c.click(function(){d.slideToggle()});$(document).click(function(){if(d.is(":animated"))return false;d.slideUp()})}function d(){BP.at("home")&&
!BP.action()&&q("#motdmessageshelper","#motdmessages")}function c(){BP.at("home")&&BP.action("activity")&&(h("#assesmentsReceived"),h("#assesmentsGiven"))}function g(){if(BP.at("practice")){var a=void 0;typeof a=="undefined"&&(a=10);$("section.exerciseList").jplist({filter:{title:".exerciseTitle",description:"p.exerciseDescription"},filter_path:".paginationFilter",pagingbox:".paginationButtons",pageinfo:".paginationInfo",paging_dd_path:".paginationPage-by",items_box:".exerciseContainer",item_path:".exercise",
items_on_page:a,redraw_callback:o})}}function e(){f(".raty")}function f(a,b){b==true?$(a).each(function(){$(this).raty({path:"themes/babelium/images/raty",readOnly:$(this).data("readonly"),half:true,start:$(this).data("rating")/2,size:24,starHalf:"star-half-big.png",starOff:"star-off-big.png",starOn:"star-on-big.png"})}):$(a).each(function(){$(this).raty({path:"themes/babelium/images/raty",readOnly:$(this).data("readonly"),half:true,start:$(this).data("rating")/2})})}function h(a){a=$(a).dataTable({bJQueryUI:true,
sPaginationType:"full_numbers"});f($(a.fnGetNodes()).find(".raty"))}function o(){e();var a=$("#exerciseVideoContainer");a.length!=0&&a.find("article").each(function(){var a=$(this);a.click(function(){(new ExerciseEvent(ExerciseEvent.EXERCISE_SELECTED,new ExerciseVO(a.data("id"),a.data("name"),a.data("title")))).dispatch()})})}function q(a,b){if(!($(a).length==0||$(b).length==0))return function(){function c(a){a<1||a>f||($(b+" > *:nth-child("+d+")").fadeOut(500,function(){$(b+" > *:nth-child("+a+")").fadeIn(500)}),
d=a)}var d=1,e=b,f=$(a+" > *").length;$(e+" > *").css("display","none");$(e+" > *:first-child").css("display","block");$(a+" > *").each(function(a){$(this).click(function(){c(a+1)})});return{next:function(){var a=d+1;a>f?c(1):c(a)},prev:function(){var a=d-1;a>1?c(f):c(a)},show:function(a){c(a)}}}()}var p,m,k,i=false,l=false;return{init:function(){i||($("#usernav"),p=$("#mainnav"),$("#searchnav"),m=$("section#maincontent"),k=$("aside#loader > div"),a(),b(),d(),c(),g(),BP.at("home")&&!BP.action("activity")&&
e(),BP.at("practice")&&BP.action("view")&&f(".ratyPreview",true),i=true)},prepareMainContent:function(a,b,c){if(!l&&i){l=true;var d=$("aside#motd"),f=m.find("header"),e=m.offset().top;k.css("top",e);k.find("p").html("Loading <strong>"+a+"</strong>");k.slideDown(500);$("html, body").scrollTop()>e&&$("html, body").animate({scrollTop:e},"slow");$("#maincontent > section").length>0?(d.length>0&&!c&&(d.fadeOut(500,function(){d.remove()}),f.slideDown(500)),c&&f.slideUp(500),$.when($("#maincontent > section").fadeOut(500)).done(function(){$("#maincontent > section").remove();
b()})):b()}},prepareExerciseView:function(a){if(!l&&i){l=true;var b=m.offset().top;k.css("top",b+m.find("header").outerHeight());k.find("p").text("Retrieving exercise information");k.slideDown(500);$("html, body").animate({scrollTop:b},"slow",function(){a()})}},viewStack:function(a,b){return!i?void 0:q(a,b)},reloadViewStacks:function(){i&&d()},reloadDataTables:function(){i&&c()},reloadPaginations:function(){i&&g()},reloadRatings:function(){i&&(e(),BP.at("home")&&!BP.action("activity")&&e(),BP.at("practice")&&
BP.action("view")&&f(".ratyPreview",true))},innerMainContent:function(a){l&&(a=$.parseJSON(a),$("#maincontent > header > h1").text(a.title),$(a.content).hide().appendTo("#maincontent").fadeIn(500),k.slideUp(500),this.reloadViewStacks(),this.reloadDataTables(),this.reloadPaginations(),l=false)},innerExerciseView:function(a){if(l){var a=$.parseJSON(a),b=$(a.content).hide();$("section.exerciseInfo").length>0?$("section.exerciseInfo").fadeOut("fast",function(){$("section.exerciseInfo").remove();b.insertAfter("aside#loader").fadeIn(500);
k.slideUp(500)}):(b.insertAfter("aside#loader").fadeIn(500),k.slideUp(500));l=false}},toggleLoginPopup:function(){i&&($("aside#popup").is(":visible")?this.hideLoginPopup():this.showLoginPopup())},hideLoginPopup:function(){i&&($("aside#popup").slideUp(500,function(){document.getElementById("loginForm").reset()}),$("div#logo").animate({top:"35px"},500))},showLoginPopup:function(){i&&($("aside#popup").slideDown(500),$("div#logo").animate({top:"65px"},500))}}}();var ExerciseEvent=Cairngorm.Event.extend({init:function(a,b,d,c){this._super(a,{exercise:b,report:d,score:c})}});ExerciseEvent.EXERCISE_SELECTED="exerciseSelected";ExerciseEvent.GET_RECORDABLE_EXERCISES="getRecordableExercises";var HomepageEvent=Cairngorm.Event.extend({init:function(a){this._super(a)}});HomepageEvent.BEST_RATED_VIDEOS_SIGNED_IN="bestRatedVideosSignedIn";HomepageEvent.LATEST_USER_UPLOADED_VIDEOS="latestUserUploadedVideos";HomepageEvent.LATEST_USER_ACTIVITY="latestUserActivity";var LoginEvent=Cairngorm.Event.extend({init:function(a,b){this._super(a,b)}});LoginEvent.PROCESS_LOGIN="processLogin";LoginEvent.SIGN_OUT="signOut";var ViewChangeEvent=Cairngorm.Event.extend({init:function(a,b){this._super(a,b)}});ViewChangeEvent.VIEW_HOME_MODULE="viewHomeModule";ViewChangeEvent.VIEW_EXERCISE_MODULE="viewExerciseModule";ViewChangeEvent.VIEW_EVALUATION_MODULE="viewEvaluationModule";ViewChangeEvent.VIEW_SUBTITLE_MODULE="viewSubtitleModule";ViewChangeEvent.VIEW_ABOUT_MODULE="viewAboutModule";ViewChangeEvent.VIEW_CONFIG_MODULE="viewConfigModule";ViewChangeEvent.VIEW_LOGIN_POPUP="viewLoginPopup";ViewChangeEvent.VIEW_POPSTATE="viewPopState";var ViewPopStateCommand=Cairngorm.Command.extend({execute:function(){var a=this,b=this.data.module,d=typeof this.data.action=="undefined"?"":this.data.action,c=typeof this.data.params=="undefined"?"":this.data.params,g=new Cairngorm.HTTPService({target:"modules/bridge.php?module=",method:"get"},b);BP.CMS.prepareMainContent(b,function(){g.call("action="+d+"&params="+c,a);BP.state=a.data},b=="home")},onResult:function(a){BP.CMS.innerMainContent(a)},onFault:function(){alert("Error loading last module")}});var ToggleLoginPopupCommand=Cairngorm.Command.extend({execute:function(){BP.CMS.toggleLoginPopup()}});var ViewHomeModuleCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.CMS.prepareMainContent("home",function(){BP.HomeDelegate.viewHomeModule(a,a.data===true)},true)},onResult:function(a){BP.pushState({module:"home"},"Home - Babelium Project","?module=home");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error loading home module")}});var LatestUploadedVideosCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.CMS.prepareMainContent("latest videos",function(){BP.HomeDelegate.latestAvailableVideos(a)},true)},onResult:function(a){BP.pushState({module:"home",action:"uploaded"},"Home :: Latest uploaded videos - Babelium Project","?module=about&action=uploaded");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error retrieving latest videos")}});var SignedBestVideosCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.CMS.prepareMainContent("best videos",function(){BP.HomeDelegate.topScoreMostViewedVideos(a)},true)},onResult:function(a){BP.pushState({module:"home",action:"rated"},"Home :: Best rated videos - Babelium Project","?module=home&action=rated");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error retrieving best rated videos")}});var LatestUserActivityCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.CMS.prepareMainContent("latest activity",function(){BP.HomeDelegate.latestUserActivity(a)},true)},onResult:function(a){BP.pushState({module:"home",action:"activity"},"Home :: Best rated videos - Babelium Project","?module=home&action=activity");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error retrieving latest user activity")}});var ExerciseSelectedCommand=Cairngorm.Command.extend({execute:function(){var a=this;if(this.data!=null)BP.selectedExercise=this.data.exercise,BP.CMS.prepareExerciseView(function(){BP.PracticeDelegate.viewExerciseByName(a,BP.selectedExercise.name)})},onResult:function(a){var b=BP.selectedExercise.name;BP.pushState({module:"practice",action:"view",params:b},BP.selectedExercise.title+" - Practice - Babelium Project","?module=practice&action=view&params="+b);BP.CMS.innerExerciseView(a)},onFault:function(){alert("Error loading exercise")}});var GetRecordableExercisesCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.CMS.prepareMainContent("practice module",function(){BP.PracticeDelegate.getRecordableExercises(a)})},onResult:function(a){BP.pushState({module:"practice"},"Practice - Babelium Project","?module=practice");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error loading practice module")}});var ViewExerciseModuleCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.selectedExercise=null;BP.CMS.prepareMainContent("practice module",function(){BP.PracticeDelegate.viewPracticeModule(a)})},onResult:function(a){BP.pushState({module:"practice"},"Practice - Babelium Project","?module=practice");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error loading practice module")}});var ViewEvaluationModuleCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.CMS.prepareMainContent("evaluation module",function(){BP.EvaluationDelegate.viewEvaluationModule(a)})},onResult:function(a){BP.pushState({module:"evaluation"},"Evaluation - Babelium Project","?module=evaluation");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error loading evaluation module")}});var ViewSubtitleModuleCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.CMS.prepareMainContent("subtitle module",function(){BP.SubtitleDelegate.viewSubtitleModule(a)})},onResult:function(a){BP.pushState({module:"subtitles"},"Subtitles - Babelium Project","?module=subtitles");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error loading subtitle module")}});var ViewConfigModuleCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.CMS.prepareMainContent("config module",function(){BP.ConfigDelegate.viewConfigModule(a)})},onResult:function(a){BP.pushState({module:"config"},"Configuration - Babelium Project","?module=config");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error loading config module")}});var ViewAboutModuleCommand=Cairngorm.Command.extend({execute:function(){var a=this;BP.CMS.prepareMainContent("about",function(){BP.AboutDelegate.viewAboutModule(a)})},onResult:function(a){BP.pushState({module:"about"},"About - Babelium Project","?module=about");BP.CMS.innerMainContent(a)},onFault:function(){alert("Error loading about module")}});var ProcessLoginCommand=Cairngorm.Command.extend({execute:function(){this.data!=null&&($("li#loginhelper").html("<img src='themes/babelium/images/loading.gif' alt='Loading..' width='16' height='16' />"),BP.AuthDelegate.processLogin(this,this.data))},onResult:function(a){a=$.parseJSON(a);a.content.indexOf("<li>")!=-1?($("li#loginhelper").html(""),$("ul#usernav").html(a.content),BP.CMS.hideLoginPopup(),BP.at("home")?($("aside#motd").fadeOut(500,function(){$(this).remove()}),(new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE,
true)).dispatch()):BP.at("practice")&&(new ExerciseEvent(ExerciseEvent.GET_RECORDABLE_EXERCISES)).dispatch()):$("li#loginhelper").html(a.content)},onFault:function(){alert("Error trying to connect to the login server")}});var SignOutCommand=Cairngorm.Command.extend({execute:function(){BP.AuthDelegate.signOut(this)},onResult:function(a){a=$.parseJSON(a);a.content.indexOf("<li>")!=-1&&($("li#loginhelper").html(""),$("ul#usernav").html(a.content),BP.at("home")?($("aside#motd").fadeOut(500,function(){$(this).remove()}),(new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE,true)).dispatch()):BP.at("practice")&&(new ViewChangeEvent(ViewChangeEvent.VIEW_EXERCISE_MODULE)).dispatch())},onFault:function(){alert("Error trying to connect to the login server")}});BP.HomeDelegate=function(){return{viewHomeModule:function(a,b){var d=Cairngorm.ServiceLocator.getHttpService("homeMOD"),c=!b&&BP.at("home")?"state=min":null;d.call(c,a)},latestAvailableVideos:function(a){Cairngorm.ServiceLocator.getHttpService("homeMOD").call("action=latest&state=min",a)},topScoreMostViewedVideos:function(a){Cairngorm.ServiceLocator.getHttpService("homeMOD").call("action=rated&state=min",a)},latestUserActivity:function(a){Cairngorm.ServiceLocator.getHttpService("homeMOD").call("action=activity&state=min",
a)}}}();BP.PracticeDelegate=function(){return{viewPracticeModule:function(a){Cairngorm.ServiceLocator.getHttpService("pracMOD").call(null,a)},getRecordableExercises:function(a){Cairngorm.ServiceLocator.getHttpService("pracMOD").call(null,a)},viewExerciseByName:function(a,b){b&&Cairngorm.ServiceLocator.getHttpService("pracMOD").call("action=view&state=min&params="+b,a)}}}();BP.EvaluationDelegate=function(){return{viewEvaluationModule:function(a){Cairngorm.ServiceLocator.getHttpService("evalMOD").call(null,a)}}}();BP.SubtitleDelegate=function(){return{viewSubtitleModule:function(a){Cairngorm.ServiceLocator.getHttpService("subsMOD").call(null,a)}}}();BP.ConfigDelegate=function(){return{viewConfigModule:function(a){Cairngorm.ServiceLocator.getHttpService("confMOD").call(null,a)}}}();BP.AboutDelegate=function(){return{viewAboutModule:function(a){Cairngorm.ServiceLocator.getHttpService("aboutMOD").call(null,a)}}}();BP.UserDelegate=function(){return{viewUserModule:function(){}}}();BP.AuthDelegate=function(){return{processLogin:function(a,b){if(b&&typeof b.toBase64=="function"){var d=Cairngorm.ServiceLocator.getHttpService("authMOD"),c="action=login&params="+b.toBase64();d.call(c,a)}},signOut:function(a){Cairngorm.ServiceLocator.getHttpService("authMOD").call("action=logout",a)}}}();var LoginVO=Cairngorm.VO.extend({init:function(a,b,d){this.name=a;this.pass=b;this.remember=d?1:0}});var ExerciseVO=Cairngorm.VO.extend({init:function(a,b,d){this.id=a;this.name=b;this.title=d}});BP.control=new Controller;BP.state={};BP.selectedExercise=null;BP.bpPlayer=null;BP.pushState=function(a,b,d){window.history.pushState(a,b,d);BP.state=a};BP.at=function(a){return typeof a=="undefined"?typeof BP.state.module=="undefined"?null:BP.state.module:typeof BP.state.module=="undefined"?false:BP.state.module==a};BP.action=function(a){return typeof a=="undefined"?typeof BP.state.action=="undefined"?null:BP.state.action:typeof BP.state.action=="undefined"?false:BP.state.action==a};
BP.params=function(a){return typeof actionName=="undefined"?typeof BP.state.params=="undefined"?null:BP.state.params:typeof BP.state.params=="undefined"?false:BP.state.params==a};BP.makeUUID=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=Math.random()*16|0;return(a=="x"?b:b&3|8).toString(16)}).toUpperCase()};BP.getSessionID=function(){var a=document.cookie.match("(^|;) ?PHPSESSID=([^;]*)(;|$)");return a?unescape(a[2]):null};
$.get("themes/babelium/js/services.xml",null,function(a){var b={};$(a).find("gateway").each(function(){var a=$(this);a.attr("type")=="http"&&(b[a.attr("id")]={target:a.attr("target"),method:a.attr("method")})});$(a).find("service").each(function(){var a=$(this),c=b[a.attr("destination")];c!=null&&(c=new Cairngorm.HTTPService(c,a.attr("class")),Cairngorm.ServiceLocator.registerHttpService(a.attr("id"),c))})});
$(document).ready(function(){var a=(/module=(.+?)(&|$)/.exec(location.search)||[,"home"])[1],b=(/action=(.+?)(&|$)/.exec(location.search)||[,void 0])[1],d=(/params=(.+?)(&|$)/.exec(location.search)||[,void 0])[1];BP.pushState({module:a,action:b,params:d},null,null);BP.CMS.init();window.onpopstate=function(a){if(!(typeof a.state=="undefined"||a.state==null)){a=a.state;if(a.module=="home"&&BP.at("home"))a.params="min";(new ViewChangeEvent(ViewChangeEvent.VIEW_POPSTATE,a)).dispatch()}}});
function onConnectionReady(a){var b=null;if(b=navigator.appName.indexOf("Microsoft")!=-1?window[a]:document[a])if(BP.bpPlayer=b,BP.selectedExercise)BP.EM.loadExercise(b,BP.selectedExercise);else{if(BP.params()!=null)BP.selectedExercise=new ExerciseVO("",BP.params(),""),BP.EM.loadExercise(b,BP.selectedExercise)}else alert("There was a problem while loading the video player.")};
