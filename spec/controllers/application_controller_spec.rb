require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  let(:user) { FactoryBot.build(:user) }

  describe "#log_in" do
    it "sets the session[:session_token] to match the user's session_token" do
      controller.log_in(user)
      expect(session[:session_token]).to eq(user.session_token)
    end

    it "resets the user's session_token" do
      expect { controller.log_in(user) }.to change { user.session_token }
    end
  end

  describe "#current_user" do
    context "when logged in" do
      it "returns the logged in user" do
        controller.log_in(user)
        expect(controller.current_user.id).to eq(user.id)
      end
    end

    context "when not logged in" do
      it "returns nil" do
        expect(controller.current_user).to be nil
      end
    end
  end

  describe "#log_out" do
    before(:each) { controller.log_in(user) }

    it "resets the user's session_token" do
      expect do
        controller.log_out
        user.reload
      end.to change { user.session_token }
    end

    it "sets session[:session_token] to nil" do
      expect(session[:session_token]).not_to be nil
      controller.log_out
      expect(session[:session_token]).to be nil
    end

    it "sets current_user to nil" do
      expect(controller.current_user).not_to be nil
      controller.log_out
      expect(controller.current_user).to be nil
    end
  end

  describe "#logged_in?" do
    context "when the client is logged in" do
      it "returns true" do
        controller.log_in(user)
        expect(controller.logged_in?).to be true
      end
    end

    context "when the client is not logged in" do
      it "returns false" do
        expect(controller.logged_in?).to be false
      end
    end
  end

  describe "#require_log_in" do
    controller do
      before_action :require_log_in

      def action_requiring_log_in
        render plain: "Made it to the action"
      end
    end

    before(:each) do
      routes.draw do
        get 'action_requiring_log_in' => 'anonymous#action_requiring_log_in'
      end
    end

    context "when the client is not logged in" do
      before(:each) { get :action_requiring_log_in }

      it "responds with 401" do
        expect(response.status).to eq(401)
      end

      it "renders an error" do
        expect(response.body).to match("Must be logged in")
        expect(response.body).not_to match("Made it to the action")
      end
    end

    context "when the client is logged in" do
      it "continues to the action" do
        controller.log_in(user)
        get :action_requiring_log_in
        expect(response.status).to eq(200)
        expect(response.body).to match("Made it to the action")
      end
    end
  end
end
