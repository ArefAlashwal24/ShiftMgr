class ApplicationController < ActionController::API
  include JsonWebToken
  before_action :authenticate_request
  attr_reader :current_user

  private
  def authenticate_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    decoded = jwt_decode(token)
    @current_user = User.find_by(id: decoded[:user_id]) if decoded
    render(json: { error: 'Unauthorized' }, status: :unauthorized) unless @current_user
  end

  def require_manager!
    render(json: { error: 'Forbidden' }, status: :forbidden) unless @current_user&.manager? || @current_user&.admin?
  end
end
