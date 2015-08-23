$(function (){

    var store=new StoreDevtools();
    var foundsitemap=function (sitemap){
  	if(sitemap===false){
		alert('Could not find site (id:'+sitemap_id+')... maybe grab first');
		return;
	}
	var selectorList=new SelectorList();
	var aselector=null;
	for(i in sitemap.selectors){
		var selector=sitemap.selectors[i];
		aselector=new Selector(selector);
		selectorList.push(aselector);
		if(selector.id==selector_id) break;
		aselector=null;
		
	}
	if(aselector){
		var currentStateParentSelectorIds = ['_root'];
		var parentCSSSelector = selectorList.getParentCSSSelectorWithinOnePage(['_root']);
		var contentScript=getContentScript('ContentScript');
		var deferredSelector = contentScript.selectSelector({
			parentCSSSelector: parentCSSSelector,
			allowedElements: aselector.getItemCSSSelector()
		});
	
		deferredSelector.done(function(result) {
			if(!result) return;
			selector['selector']=result.CSSSelector;
			store.saveSitemap(sitemap);
		}.bind(this));
	}
    };
    store.findSitemap(sitemap_id,function(sitemap){
	if(sitemap!==false){
		foundsitemap(sitemap);
	}else{
    		store.findSitemap('t'+sitemap_id,function(sitemap){
			if(sitemap!==false){
				foundsitemap(sitemap);
			}else{
		    		store.findSitemap('k'+sitemap_id,foundsitemap);
			}
	        });
        }
    });
});
