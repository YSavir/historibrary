json.array!(@events) do |event|
  json.extract! event

  json.resources do |json, resource|
    json.extract! resource
  end
end
