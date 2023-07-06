CREATE PROCEDURE social.GetFollowing
    @user_id UNIQUEIDENTIFIER
AS
BEGIN
    SELECT u.user_id, u.full_name, u.username, u.city, u.profilepic_url
    FROM social.user_profile u
    INNER JOIN social.friendship f ON u.user_id = f.following_id
    WHERE f.follower_id = @user_id AND u.is_deleted = 0;
END