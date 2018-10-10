require 'rails_helper'

RSpec.describe User, type: :model do
  before(:all) { FactoryBot.create(:user) }

  subject(:user) { FactoryBot.create(:user) }

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_presence_of(:session_token) }
  it { should validate_uniqueness_of(:email) }
  it { should validate_uniqueness_of(:session_token) }
  it { should validate_length_of(:password).is_at_least(10) }

  describe "#password=" do
    it "sets password_digest to the BCrypt hash of the passed in password" do
      user.password = "password123"
      expect(
        BCrypt::Password.new(user.password_digest).is_password?("password123")
      ).to be true
    end
  end

  describe "#reset_session_token" do
    it "changes the session_token and saves" do
      expect do
        user.reset_session_token
        user.reload
      end.to change { user.session_token }
    end

    it "returns the new session_token" do
      expect(user.reset_session_token).to eq(user.session_token)
    end
  end

  describe "#is_password?" do
    context "when given the user's password" do
      it "returns true" do
        expect(user.is_password?("starwarsiv")).to be true
      end
    end

    context "when given an incorrect password" do
      it "returns false" do
        expect(user.is_password?("startrekiv")).to be false
      end
    end
  end

  describe "::find_by_credentials" do
    subject(:jeremiah) { FactoryBot.create(:jeremiah) }

    before(:each) { jeremiah }

    context "when given the correct credentials" do
      it "returns the user with those credentials" do
        expect(User.find_by_credentials(
          "jeremiah@jeremiahkellick.com",
          "starwarsiv"
        ).id).to eq(jeremiah.id)
      end
    end

    context "when given an incorrect password" do
      it "returns nil" do
        expect(
          User.find_by_credentials("jeremiah@jeremiahkellick.com", "startrekiv")
        ).to be nil
      end
    end

    context "when given an incorrect email" do
      it "returns nil" do
        expect(
          User.find_by_credentials("jeremiah@kellick.com", "starwarsiv")
        ).to be nil
      end
    end
  end
end
