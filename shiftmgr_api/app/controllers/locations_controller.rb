class LocationsController < ApplicationController
  before_action :require_manager!, only: %i[create update destroy]
  def index; render json: Location.all.order(:name); end
  def create
    loc = Location.new(params.require(:location).permit(:name))
    loc.save ? render(json: loc, status: :created) : render(json: { errors: loc.errors.full_messages }, status: :unprocessable_entity)
  end
  def update
    loc = Location.find(params[:id])
    loc.update(params.require(:location).permit(:name)) ? render(json: loc) : render(json: { errors: loc.errors.full_messages }, status: :unprocessable_entity)
  end
  def destroy
    Location.find(params[:id]).destroy
    head :no_content
  end
end
