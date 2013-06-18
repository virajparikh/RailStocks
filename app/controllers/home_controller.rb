class HomeController < ApplicationController

  def index
    if user_signed_in?
    # redirect_to :controller=>'dashboard', :action => 'index'
    redirect_to :controller=>'portfolios', :action => 'index'
    end
  end

end
