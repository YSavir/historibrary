json.array!(@events) do |event|
  json.extract! event, :id, :name, :start_date, :end_date, :summary

  json.resources event.resources do |resource|
    json.extract! resource, :id, :name, :summary, :source_url
  end
end
