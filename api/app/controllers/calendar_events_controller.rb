class CalendarEventsController < ApplicationController
  before_action :authenticate_user!

  def index
    user_id = current_user.id
    calendar_events = CalendarEvent.where(user_id: user_id)
    render json: calendar_events
  end

  def create
    calendar_event = CalendarEvent.new(calendar_event_params)
    calendar_event.user_id = current_user.id
    calendar_event.save!
    render json: calendar_event
  end

  def update
    calendar_event = CalendarEvent.find(params[:id])
    calendar_event = calendar_event.update!(calendar_event_params)
    render json: calendar_event
  end

  private

  def calendar_event_params
    params.require(:calendar_event).permit(:title, :description, :start_date, :end_date)
  end
end
