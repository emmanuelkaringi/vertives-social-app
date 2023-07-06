CREATE PROCEDURE social.DeleteAccount
    @user_id UNIQUEIDENTIFIER
AS
BEGIN
    
    BEGIN TRANSACTION;
    
    -- Delete likes associated with the user
    DELETE FROM social.likes
    WHERE sender_id = @user_id OR recipient_id = @user_id;
    
    -- Delete notifications associated with the user
    DELETE FROM social.notifications
    WHERE recipient_id = @user_id OR sender_id = @user_id;
    
    -- Delete friendships associated with the user
    DELETE FROM social.friendship
    WHERE follower_id = @user_id OR following_id = @user_id;
    
    -- Delete replies associated with comments of the user
    DELETE FROM social.replies
    WHERE comment_id IN (
        SELECT comment_id
        FROM social.comments
        WHERE user_id = @user_id
    );
    
    -- Delete comments associated with the user
    DELETE FROM social.comments
    WHERE user_id = @user_id;
    
    -- Delete posts associated with the user
    DELETE FROM social.posts
    WHERE user_id = @user_id;
    
    -- Finally, delete the user_profile
    DELETE FROM social.user_profile
    WHERE user_id = @user_id;
    
    COMMIT;
END;
GO



EXEC social.DeleteAccount @user_id = 1;