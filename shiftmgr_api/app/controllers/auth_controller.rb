class AuthController < ActionController::API
  include JsonWebToken

  def register
    user = User.new(params.permit(:email, :password, :role))
    if user.save
      token = jwt_encode({ user_id: user.id })
      render json: { token:, user: user.slice(:id, :email, :role) }
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = jwt_encode({ user_id: user.id })
      render json: { token:, user: user.slice(:id, :email, :role) }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end
