Radiant Lazy Snippet Extension
===

This feature allows to keep same interface for snippets managment, but at the same
time allows you to adjust the logic of their load to user.

How it works
---

'lazy_snippet' radiant tag renders javascript object and create replacement with spinner.
When document is ready it calls for snippet by ajax and render result.

Requirements
---

* Prototype 1.6+
* Radiant 0.9 edge (may be will work on early versions, but not tested)

Installation
---

    git clone git://github.com/cheef/radiant-lazy-snippet-extension.git vendor/extensions/lazy_snippet

Then update assets

    rake radiant:extensions:lazy_snippet:update

Usage
---

* place <r:lazy_snippet name="%test%" /> tag to page/snippet/layout content,
where %test% - name of your snippet
* include on page prototype and lazy_snippets scripts, something like
    <script src="/javascripts/prototype.js" type="text/javascript></script>
    <script src="/javascripts/extensions/lazy_snippet/lazy_snippet.js" type="text/javascript></script>

Contributors
---

* Ivan Garmatenko





