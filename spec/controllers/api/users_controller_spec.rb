require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe "#create" do
    context "when given valid params" do
      let(:user) { FactoryBot.build(:user) }

      before(:each) do
        post :create, format: :json, params: {
          user: {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            password: user.password
          }
        }
      end

      it "creates a user" do
        expect(User.last.email).to eq(user.email)
      end

      it "renders the new user" do
        expect(response).to render_template(:show)
      end

      it "logs the client in as the new user" do
        expect(controller.current_user.email).to eq(user.email)
      end
    end

    context "when given invalid params" do
      before(:each) do
        user = FactoryBot.build(:user)
        post :create, format: :json, params: {
          user: {
            email: user.email,
            last_name: user.last_name,
            password: user.password
          }
        }
      end

      it "responds with 422" do
        expect(response.status).to eq(422)
      end

      it "renders errors" do
        expect(response.body).to match("First name can't be blank")
      end
    end
  end
end
