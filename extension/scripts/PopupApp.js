chrome.tabs.query({
active: true, // Select active tabs
lastFocusedWindow: true // In the current window
}, function(array_of_Tabs) {
var tab = array_of_Tabs[0];
chrome.extension.getBackgroundPage().console.log(tab);
chrome.tabs.executeScript(tab.id, {
    file: "assets/jquery-2.0.3.js"
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "assets/jquery.whencallsequentially.js"
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "assets/sugar-1.4.1.js"
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "assets/base64.js"
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/ElementQuery.js"
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Sitemap.js"
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector.js"
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorElement.js",
} , function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorGroup.js",
} , function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorLink.js",
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorPopupLink.js",
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorText.js",
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorImage.js",
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorHTML.js",
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorElementAttribute.js",
}, function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorTable.js",
},function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorElementScroll.js"
},function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/Selector/SelectorElementClick.js"
},function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/SelectorList.js"
},function(res) {
chrome.tabs.executeScript(tab.id, {
    file: "scripts/DataExtractor.js"
},function(res) {
chrome.tabs.executeScript(tab.id, {
    file: './content_script/content_script.js'
},function(res) {

	popup_main(tab);

})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})
})              
})              
})              
})              
});


function popup_selector_click(){
    selector_id = $(this).attr('rel');
    chrome.tabs.query({
        active: true, // Select active tabs
        lastFocusedWindow: true // In the current window
    }, function(array_of_Tabs) {
    var tab = array_of_Tabs[0];
    chrome.tabs.insertCSS(tab.id,{file:'./content_script/content_script.css'});
    chrome.tabs.executeScript(tab.id, {
        file: './scripts/BackgroundScript.js',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        file: './scripts/ContentScript.js',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        file: './scripts/ContentSelector.js',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        file: './assets/d3.v3.js',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        file: './scripts/Config.js',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        file: './scripts/SelectorGraph.js',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        file: './scripts/SelectorGraphv2.js',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        file: './scripts/StoreDevTools.js',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        file: './assets/css-selector/lib/CssSelector.js',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        code: 'selector_id="'+selector_id+'";',
    },function (res){ 
    chrome.tabs.executeScript(tab.id, {
        file: './scripts/PopupClickRow.js',
    },function (res){ 
       	window.close();
    });});});});});});});});});});});});
}

function popup_view_update(store,sitemap_exists,sitemap_id)
{
	if (!sitemap_exists) {
                $('#grab_site').css('display', 'block');
                $('#ungrab_site').css('display', 'none');
             	$('#selectors').html('');
		return;
	}
        $('#grab_site').css('display', 'none');
        $('#ungrab_site').css('display', 'block');
        store.findSitemap(sitemap_id, function(sitemap) {
                html = "<table>";
                for (i in sitemap.selectors) {
                      var selector = sitemap.selectors[i];
                      html += '<tr id="selector-' + i + '" class="selector" rel="' + selector['id'] + '">';
                      html += '<td valign="top"><b>' + selector['id'] + '</b><br/>';
                      html += '<div style="width:70px;overflow:text-ellipsis"><i>' + selector['selector'] + '</i></div></td>';
                      html += '<td id="sel_data_' + selector['id'] + '">...</td>';
                      html += '</tr>';
                }
                html += '</table>';
                $('#selectors').html(html);
                var selected = null;
                $('.selector').mouseover(function() {
                      $('.selector').css('background', 'white');
                      $(this).css('background', 'yellow');
                });
                $('.selector').click(popup_selector_click);
                for (i in sitemap.selectors) {
                      var selector = sitemap.selectors[i];
                      var f = function(selector) {
                             var request = {
                                   previewSelectorData: true,
                                   sitemap: JSON.parse(JSON.stringify(sitemap)),
                                   parentSelectorIds: ["_root"],
                                   selectorId: selector.id
                              };
                              chrome.runtime.sendMessage(request, function(response) {
                                   if (!response || response.length === 0) {
                                        return;
                                   }
                                   if (selector.type == 'SelectorImage') {
                                        $('#sel_data_' + selector.id).html('<img style="max-width:200px;height:100px;width:auto" src="' + response[0][selector.id + '-src'] + '"></img>');
                                   } else {
                                        html='';
					for(var i in response){ html+=response[i][selector.id]+' ';}
                                        $('#sel_data_' + selector.id).html(html);
                                   }
                              });
                      };
                      f(selector);
                }
        });
}

function popup_main(tab){
       config = new Config();
       config.loadConfiguration(function() {
              var store = new Store(config);
              var url = tab.url;
              var sitemap_id = url.replace(/https?:/, '').replace(/[^0123456789qwertyuiopljkjhgfdsazxcvbnm]+/ig, '_').replace(/^_+/, '').replace(/_+$/, '');
              $('#_id').val(sitemap_id);
              $('#_url').val(url);
              store.sitemapExists(sitemap_id, function(exists) {
                      popup_view_update(store,exists,sitemap_id);
              });
              $('#ungrab_site').click(function() {
                      store.deleteSitemap({
                         '_id': sitemap_id
                      }, function() {
                      	 popup_view_update(store,false,sitemap_id);
                      });
              });
              $('#grab_site').click(function() {
		     var _id=sitemap_id;
		     store.findSimilar(_id,function (s){ 
			if(s) 
		        	sitemap={selectors:s.selectors};
			else
				sitemap={selectors:JSON.parse(config.defaultSitemap).selectors}	
    		        sitemap['_id']=_id;
		        sitemap['startURL']=tab.url;
                        store.createSitemap(sitemap, function(s) {
                      	    popup_view_update(store,true,_id);
                        });
                     });	
              });
	});
}
