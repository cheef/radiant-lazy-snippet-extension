module LazySnippetTags
  include Radiant::Taggable

  tag "lazy_snippet" do |tag|
    raise TagError.new("`lazy_snippet' tag must contain `name' attribute") unless name = tag.attr['name']
    html =  %{<script type="text/javascript">}
    html << %{LazySnippet.Registry.add('#{name.strip}', '#{tag.globals.page.url}');}
    html << %{</script>}
  end

end