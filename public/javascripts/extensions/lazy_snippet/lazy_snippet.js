var LazySnippet = Class.create({

	name: null, domId: null, page: null, spinner: null, replacement: null,

	initialize: function(name, options) {

		this.name = name;
		Element.fire(document, 'lazySnippet:identifier:generate', {snippet: this, prefix: this.name});

		this.spinner = new LazySnippet.Spinner(this.domId);

		Element.fire(document, 'lazySnippet:replacement:generate', {snippet: this});

		if (options && options.page) {
			this.page = options.page;
		}

		document.write(this.replacement);
	}

});

LazySnippet.Identifier = {
  generate: function(event) {
    event.memo.snippet.domId = event.memo.prefix + '_' + ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 18);
  }
};

LazySnippet.Replacement = {
	generate: function(event) {
    event.memo.snippet.replacement = '' +
			'<div id="' + event.memo.snippet.domId + '" style="position: relative; height: 100%; width: 100%; min-height: 32px; height: expression(this.scrollHeight < 32? \'32px\' : \'auto\');">' +
				'<div style="position: absolute; top:50%; right: 50%;">' +
					'<span id="' + event.memo.snippet.spinner.domId + '" style="display: block; width: 32px; height: 32px; margin: -16px -16px 0 0; background-image: url(/javascripts/extensions/lazy_snippet/images/ajax-loader.gif);">' + '</span>' +
				'</div>' +
			'</div>';
	}
};

LazySnippet.Spinner = Class.create({
	domId: null, object: null, containerId: null,

	initialize: function(id) {
		this.containerId = id;
		this.domId       = this.containerId + '_spinner';
	},

	show: function() {
	  this.object.setStyle({display: 'block'});
	},

	hide: function() {
		this.object.hide();
	}

});

LazySnippet.Registry = {

	snippets: [], page: null, config: null,

	add: function(name, page, options) {
		options = options || {};
		return this.snippets.push(new LazySnippet(name, Object.extend(options, {'page': page})));
	},

	setup: function() {
		this.config = LazySnippet.Configuration;

		Element.observe(document, 'lazySnippet:registry:run',         this.run.bind(this));
		Element.observe(document, 'lazySnippet:registry:request',     this.request.bind(this));
		Element.observe(document, 'lazySnippet:registry:onSuccess',   this.onSuccess.bind(this));
		Element.observe(document, 'lazySnippet:registry:onFailure',   this.onFailure.bind(this));
		Element.observe(document, 'lazySnippet:identifier:generate',  LazySnippet.Identifier.generate.bind(this));
		Element.observe(document, 'lazySnippet:replacement:generate', LazySnippet.Replacement.generate.bind(this));

		if (this.config.autorun) {
			Event.observe(window, 'load', function() {
				Element.fire(document, 'lazySnippet:registry:run');
			});
		}
	},

	// Evented functions

	onSuccess: function(event) {
    $(event.memo.snippet.domId).replace(event.memo.response.responseText);
	},

	onFailure: function(event) {
		if (window.console) {
			window.console.log('Error occured during requesting snippet', this, event);
		}
	},

	run: function(event) {
		this.snippets.each(function(snippet) {
			Element.fire(document, 'lazySnippet:registry:request', {'snippet': snippet});
	  }.bind(this));
	},

	request: function(event) {
		new Ajax.Request(this.config.url, {
			method     : 'post',
	    parameters : {'snippet': event.memo.snippet.name, 'url':  event.memo.snippet.page},
      onSuccess  : function(response) {
	      Element.fire(document, 'lazySnippet:registry:onSuccess', {
		      response : response,
		      snippet  : event.memo.snippet
	      });
      },
			onFailure : function(response) {
				Element.fire(document, 'lazySnippet:registry:onFailure', {
		      response : response,
		      snippet  : event.memo.snippet
	      });
			}
	  });
	}
};

LazySnippet.Configuration = {
	autorun : true,
  url     : '/snippet'
};

LazySnippet.Registry.setup();