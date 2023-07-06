CREATE PROCEDURE social.UnfollowUser
    @follower_id UNIQUEIDENTIFIER,
    @following_id UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM social.friendship
    WHERE follower_id = @follower_id AND following_id = @following_id;
END