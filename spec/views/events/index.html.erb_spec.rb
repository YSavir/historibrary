require 'rails_helper'

RSpec.describe "events/index.html.erb", type: :view do
  it 'should render an events content div' do
    render

    expect(rendered).to match('<div class="events content"></div>')
  end
end
