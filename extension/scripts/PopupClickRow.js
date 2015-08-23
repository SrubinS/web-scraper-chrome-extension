$(function (){

    url=window.location.href;
    var sitemap_id=url.replace(/https?:/,'').replace(/[^0123456789qwertyuiopljkjhgfdsazxcvbnm]+/ig,'_').replace(/^_+/,'').replace(/_+$/,'');
    store=new StoreDevtools();
    store.findSitemap(sitemap_id,function (sitemap){
  	if(sitemap===false){
		alert('Could not find site... maybe grab first');
		return;
	}
	var selectorList=new SelectorList();
	var aselector=null;
	for(i in sitemap.selectors){
		var selector=sitemap.selectors[i];
		aselector=new Selector(selector);
		selectorList.push(aselector);
		console.log(selector.id);
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
    });

});
