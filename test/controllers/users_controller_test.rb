require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get follow" do
    get users_follow_url
    assert_response :success
  end

  test "should get unfollow" do
    get users_unfollow_url
    assert_response :success
  end

end
