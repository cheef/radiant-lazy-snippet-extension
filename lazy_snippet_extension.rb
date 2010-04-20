# Uncomment this if you reference any of your controllers in activate
# require_dependency 'application_controller'

class LazySnippetExtension < Radiant::Extension
  version "1.0"
  description "This extension provides snippet's lazy loading via ajax after page loading"
  url "http://github.com/cheef/radiant-lazy-snippet-extension"
  
   define_routes do |map|
     map.with_options :controller => 'site' do |site|
       site.connect 'snippet', :action => 'show_snippet'
     end
   end



  def activate
    include_radius_tags
    extend_site_controller
  end

  protected

    def include_radius_tags
      Page.send :include, LazySnippetTags
    end

    def extend_site_controller
      SiteController.send :include, SiteControllerExtension
    end

end
