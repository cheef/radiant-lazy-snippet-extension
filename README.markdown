Radiant Lazy Snippet Extension
==============================

This feature allows to load snippets via ajax as normal snippets

How it works
------------

'lazy_snippet' radiant tag renders javascript object, that after document ready creates replacement with spinner and load
snippet data via ajax call.

Requirements
------------

* Prototype 1.6+
* Radiant 0.9.1
* Rails 2.3.8

Installation
------------

* <code>git clone git://github.com/cheef/radiant-lazy-snippet-extension.git vendor/extensions/lazy_snippet</code>
* <code>rake radiant:extensions:lazy_snippet:update</code>

Usage
-----

* include required script like
<pre><code>
  <script type="text/javascript" src="/javascripts/prototype.js"></script>
  <script type="text/javascript" src="/javascripts/extensions/lazy_snippet/lazy_snippet.js"></script>
</code></pre>

*place <code><r:lazy_snippet name="%test%" /></code> tag to page/snippet/layout content,
where %test% - is name of your snippet

Contributors
------------

* Ivan Garmatenko





