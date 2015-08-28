module SpecHelpers
  module AuthenticationHelpers

    def stub_user_signed_in(as: false)
      allow(view).to receive(:user_signed_in?).and_return(as)
    end

    def stub_user_signed_in_as_false
      stub_user_signed_in as: false
    end

    def stub_current_user(user: User.new)
      allow(controller).to receive(:current_user).and_return(user)
    end
  end
end

