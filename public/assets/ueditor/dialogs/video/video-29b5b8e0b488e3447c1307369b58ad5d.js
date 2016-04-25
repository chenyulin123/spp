var video={};!function(){function addOkListener(){dialog.onok=function(){$G("preview").innerHTML="";var e=findFocus("tabHeads","tabSrc");switch(e){case"video":return insertSingle();case"videoSearch":return insertSearch("searchList")}},dialog.oncancel=function(){$G("preview").innerHTML=""}}function selectTxt(e){if(e.select)e.select();else{var t=e.createTextRange&&e.createTextRange();t.select()}}function updateAlignButton(e){for(var t,i=$G("videoFloat").children,r=0;t=i[r++];)t.getAttribute("name")==e?"focus"!=t.className&&(t.className="focus"):"focus"==t.className&&(t.className="")}function insertSingle(){var e=$G("videoWidth"),t=$G("videoHeight"),i=$G("videoUrl").value,r=findFocus("videoFloat","name");return i&&checkNum([e,t])?void editor.execCommand("insertvideo",{url:convert_url(i),width:e.value,height:t.value,align:r}):!1}function insertSearch(e){for(var t,i=domUtils.getElementsByTagName($G(e),"img"),r=[],o=0;t=i[o++];)t.getAttribute("selected")&&r.push({url:t.getAttribute("ue_video_url"),width:420,height:280,align:"none"});editor.execCommand("insertvideo",r)}function findFocus(e,t){for(var i,r,o=$G(e).children,a=0;r=o[a++];)if("focus"==r.className){i=r.getAttribute(t);break}return i}function convert_url(e){return e.replace(/http:\/\/www\.tudou\.com\/programs\/view\/([\w\-]+)\/?/i,"http://www.tudou.com/v/$1").replace(/http:\/\/www\.youtube\.com\/watch\?v=([\w\-]+)/i,"http://www.youtube.com/v/$1").replace(/http:\/\/v\.youku\.com\/v_show\/id_([\w\-=]+)\.html/i,"http://player.youku.com/player.php/sid/$1").replace(/http:\/\/www\.56\.com\/u\d+\/v_([\w\-]+)\.html/i,"http://player.56.com/v_$1.swf").replace(/http:\/\/www.56.com\/w\d+\/play_album\-aid\-\d+_vid\-([^.]+)\.html/i,"http://player.56.com/v_$1.swf").replace(/http:\/\/v\.ku6\.com\/.+\/([^.]+)\.html/i,"http://player.ku6.com/refer/$1/v.swf")}function checkNum(e){for(var t,i=0;t=e[i++];){var r=t.value;if(!isNumber(r)&&r)return alert(lang.numError),t.value="",t.focus(),!1}return!0}function isNumber(e){return/(0|^[1-9]\d*$)/.test(e)}function switchTab(e,t){for(var i=$G(e).children,r=i[0].children,o=i[1].children,a=0,c=r.length;c>a;a++){var n=r[a];domUtils.on(n,"click",function(){for(var e=0,i=r.length;i>e;e++)t||(r[e].className="");this.className="focus";for(var a=this.getAttribute("tabSrc"),c=0,n=o.length;n>c;c++){var l=o[c],s=l.getAttribute("id");s==a?(l.style.display="","videoSearch"==s&&selectTxt($G("videoSearchTxt")),"video"==s&&selectTxt($G("videoUrl"))):l.style.display="none"}})}}function createAlignButton(e){for(var t,i=0;t=e[i++];){var r=$G(t),o={none:lang["default"],left:lang.floatLeft,right:lang.floatRight,center:lang.block};for(var a in o){var c=document.createElement("div");c.setAttribute("name",a),"none"==a&&(c.className="focus"),c.style.cssText="background:url("+video.align_directions[a]+");",c.setAttribute("title",o[a]),r.appendChild(c)}switchSelect(t)}}function switchSelect(e){for(var t,i=$G(e).children,r=0;t=i[r++];)domUtils.on(t,"click",function(){for(var e,t=0;e=i[t++];)e.className="",e.removeAttribute&&e.removeAttribute("class");this.className="focus"})}function addUrlChangeListener(e){browser.ie?e.onpropertychange=function(){createPreviewVideo(this.value)}:e.addEventListener("input",function(){createPreviewVideo(this.value)},!1)}function createPreviewVideo(e){if(e){var t=e.match(/youtu.be\/(\w+)$/)||e.match(/youtube\.com\/watch\?v=(\w+)/)||e.match(/youtube.com\/v\/(\w+)/),i=e.match(/youku\.com\/v_show\/id_(\w+)/),r=/player\.youku\.com/gi.test(e);if(r)e=e.replace(/\?f=.*/,"");else if(t)e="https://www.youtube.com/v/"+t[1]+"?version=3&feature=player_embedded";else if(i)e="http://player.youku.com/player.php/sid/"+i[1]+"/v.swf";else if(!endWith(e,[".swf",".flv",".wmv"]))return void($G("preview").innerHTML=lang.urlError);$G("preview").innerHTML='<embed type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" src="'+e+'" width="420" height="280" wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" ></embed>'}}function endWith(e,t){for(var i=0,r=t.length;r>i;i++){var o=t[i];if(e.length-o.length<0)return!1;if(e.substring(e.length-o.length)==o)return!0}return!1}function getMovie(){var keywordInput=$G("videoSearchTxt");if(!keywordInput.getAttribute("hasClick")||!keywordInput.value)return void selectTxt(keywordInput);$G("searchList").innerHTML=lang.loading;var keyword=keywordInput.value,type=$G("videoType").value,str="";ajax.request(editor.options.getMovieUrl,{searchKey:keyword,videoType:type,onsuccess:function(xhr){try{var info=eval("("+xhr.responseText+")")}catch(e){return}for(var videos=info.multiPageResult.results,html=["<table width='530'>"],i=0,ci;ci=videos[i++];)html.push("<tr><td><img title='"+lang.clickToSelect+"' ue_video_url='"+ci.outerPlayerUrl+"' alt='"+ci.tags+"' width='106' height='80' src='"+ci.picUrl+"' /> </td><td><p><a target='_blank' title='"+lang.goToSource+"' href='"+ci.itemUrl+"'>"+ci.title.substr(0,30)+"</a></p><p style='height: 62px;line-height: 20px' title='"+ci.description+"'> "+ci.description.substr(0,95)+" </p></td></tr>");html.push("</table>"),$G("searchList").innerHTML=str=2==html.length?lang.noVideo:html.join("");var imgs=domUtils.getElementsByTagName($G("searchList"),"img");if(imgs)for(var i=0,img;img=imgs[i++];)domUtils.on(img,"click",function(){changeSelected(this)})}})}function changeSelected(e){e.getAttribute("selected")?(e.removeAttribute("selected"),e.style.cssText="filter:alpha(Opacity=100);-moz-opacity:1;opacity: 1;border: 2px solid #fff"):(e.setAttribute("selected","true"),e.style.cssText="filter:alpha(Opacity=50);-moz-opacity:0.5;opacity: 0.5;border:2px solid blue;")}function addSearchListener(){domUtils.on($G("videoSearchBtn"),"click",getMovie),domUtils.on($G("videoSearchTxt"),"click",function(){this.value==lang["static"].videoSearchTxt.value&&(this.value=""),this.setAttribute("hasClick","true"),selectTxt(this)}),$G("videoSearchTxt").onkeyup=function(){this.setAttribute("hasClick","true"),this.onkeyup=null},domUtils.on($G("videoSearchReset"),"click",function(){var e=$G("videoSearchTxt");e.value="",selectTxt(e),$G("searchList").innerHTML=""}),domUtils.on($G("videoType"),"change",getMovie),domUtils.on($G("videoSearchTxt"),"keyup",function(e){13==e.keyCode&&getMovie()})}video.align_directions={center:"/assets/ueditor/dialogs/video/images/center_focus-b65d1b1b0df059a91e8207db9ef1c29d.jpg",left:"/assets/ueditor/dialogs/video/images/left_focus-ab1dc141a09644dd56f83ef256b2c72e.jpg",none:"/assets/ueditor/dialogs/video/images/none_focus-b86dbc2fd57e6aad3cd845d167fa0028.jpg",right:"/assets/ueditor/dialogs/video/images/right_focus-102b3e996101c85242c0e2813bcc877c.jpg"},video.init=function(){switchTab("videoTab"),createAlignButton(["videoFloat"]),addUrlChangeListener($G("videoUrl")),addOkListener(),addSearchListener(),function(){var e,t=editor.selection.getRange().getClosedNode();if(t&&"edui-faked-video"==t.className){$G("videoUrl").value=e=t.getAttribute("_url"),$G("videoWidth").value=t.width,$G("videoHeight").value=t.height;var i=domUtils.getComputedStyle(t,"float"),r=domUtils.getComputedStyle(t.parentNode,"text-align");updateAlignButton("center"===r?"center":i)}createPreviewVideo(e)}()}}();