module LazySnippetTags
  include Radiant::Taggable
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::JavaScriptHelper  

  tag "lazy_snippet" do |tag|
    raise TagError.new("`lazy_snippet' tag must contain `name' attribute") unless name = tag.attr['name']
    javascript_tag <<-JS
      LazySnippet.Registry.add('#{name.strip}', '#{tag.globals.page.url}');
    JS
  end

end