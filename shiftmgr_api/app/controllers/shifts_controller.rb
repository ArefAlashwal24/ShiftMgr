class ShiftsController < ApplicationController
  before_action :set_shift, only: %i[show update destroy]
  before_action :require_manager!, only: %i[create update destroy]

  def index
    scope = Shift.includes(:user, :location).order(starts_at: :asc)
    scope = scope.where(user_id: params[:user_id]) if params[:user_id]
    scope = scope.where(location_id: params[:location_id]) if params[:location_id]
    render json: scope.as_json(include: { user: { only: %i[id email role] }, location: { only: %i[id name] } })
  end

  def show
    render json: @shift.as_json(include: [:user, :location])
  end

  def create
    shift = Shift.new(params.require(:shift).permit(:user_id, :location_id, :starts_at, :ends_at, :notes))
    shift.save ? render(json: shift, status: :created) : render(json: { errors: shift.errors.full_messages }, status: :unprocessable_entity)
  end

  def update
    if @shift.update(params.require(:shift).permit(:user_id, :location_id, :starts_at, :ends_at, :notes))
      render json: @shift
    else
      render json: { errors: @shift.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @shift.destroy
    head :no_content
  end

  private
  def set_shift; @shift = Shift.find(params[:id]); end
end
