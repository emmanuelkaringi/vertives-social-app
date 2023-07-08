CREATE PROCEDURE social.DeleteAccount
    @user_id UNIQUEIDENTIFIER
AS
BEGIN

    -- Soft delete user profile
    UPDATE social.user_profile
    SET is_deleted = 1
    WHERE user_id = @user_id;

    -- Soft delete user's posts
    UPDATE social.posts
    SET is_deleted = 1
    WHERE user_id = @user_id;

    -- Soft delete user's comments
    UPDATE social.comments
    SET is_deleted = 1
    WHERE user_id = @user_id;

    -- Soft delete user's replies
    UPDATE social.replies
    SET is_deleted = 1
    WHERE user_id = @user_id;

    -- delete user's likes
    DELETE FROM social.likes
    WHERE sender_id = @user_id OR recipient_id = @user_id;

    -- delete user's notifications
    DELETE FROM social.notifications
    WHERE recipient_id = @user_id OR sender_id = @user_id;

    -- Delete user's friendships
    DELETE FROM social.friendship
    WHERE follower_id = @user_id OR following_id = @user_id;
END
GO



EXEC social.DeleteAccount @user_id = 1;