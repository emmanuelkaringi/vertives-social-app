CREATE PROCEDURE social.FollowUser
    @followerId UNIQUEIDENTIFIER,
    @followingId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the follower is already following the following user
    IF NOT EXISTS (
        SELECT 1
        FROM social.friendship
        WHERE follower_id = @followerId AND following_id = @followingId
    )
    BEGIN
        -- Insert the new relationship in the friendship table
        INSERT INTO social.friendship (follower_id, following_id)
        VALUES (@followerId, @followingId);
    END
END

CREATE TRIGGER tr_FollowUser
ON social.friendship
AFTER INSERT, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if a new row is inserted
    IF EXISTS (SELECT 1 FROM inserted)
    BEGIN
        -- Inserted rows
        INSERT INTO social.notifications (recipient_id, sender_id, notification_type, timestamp)
        SELECT i.following_id, i.follower_id, 'followed', SYSDATETIME()
        FROM inserted AS i
        INNER JOIN social.user_profile AS up ON i.following_id = up.user_id
        WHERE up.is_deleted = 0;
    END
END



EXEC social.FollowUser @follower_id = "", @following_id = ""