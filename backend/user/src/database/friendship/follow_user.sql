CREATE PROCEDURE social.FollowUser
    @follower_id UNIQUEIDENTIFIER,
    @following_id UNIQUEIDENTIFIER
AS
BEGIN
    INSERT INTO social.friendship (follower_id, following_id)
    VALUES (@follower_id, @following_id);
END