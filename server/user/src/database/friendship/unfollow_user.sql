CREATE PROCEDURE social.UnfollowUser
    @followerId UNIQUEIDENTIFIER,
    @followingId UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the follower is following the following user
    IF EXISTS (
        SELECT 1
        FROM social.friendship
        WHERE follower_id = @followerId AND following_id = @followingId
    )
    BEGIN
        -- Delete the relationship from the friendship table
        DELETE FROM social.friendship
        WHERE follower_id = @followerId AND following_id = @followingId;
    END
END
