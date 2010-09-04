ActionController::Routing::Routes.draw do |map|
  map.with_options :controller => 'site' do |site|
   site.connect 'snippet', :action => 'show_snippet'
  end
end