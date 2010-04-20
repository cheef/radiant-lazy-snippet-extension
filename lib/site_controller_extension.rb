module SiteControllerExtension
  def show_snippet
    url = get_url

    if @page = find_page(url)
      response = @page.render_snippet Snippet.find_by_name(params[:snippet])
      render :text => response
    else
      render :template => 'site/not_found', :status => 404
    end
  end

  protected

    def get_url
      url = params[:url]
      if Array === url
        url = url.join('/')
      else
        url = url.to_s
      end
      url
    end
end