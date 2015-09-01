class Api::V1::ResourcesController < ApplicationController

  def create
    unless current_user
      render :json => {status: 403}
      return
    end

    resource = Resource.create resource_params
    resource.events << Event.find(params[:event_id])
    resource.creator = current_user
    resource.save!
    render :json => resource
  end

  private

  def resource_params
    params.require(:resource).permit(:summary, :name, :source_url)
  end

end
