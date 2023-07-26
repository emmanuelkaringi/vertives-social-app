CREATE OR ALTER PROCEDURE social.GetUserStats
    @user_id UNIQUEIDENTIFIER
AS
BEGIN
    -- Get the number of followings
    DECLARE @followings_count INT;
    SELECT @followings_count = COUNT(*) FROM social.friendship WHERE follower_id = @user_id;

    -- Get the number of followers
    DECLARE @followers_count INT;
    SELECT @followers_count = COUNT(*) FROM social.friendship WHERE following_id = @user_id;

    -- Get the number of posts
    DECLARE @post_count INT;
    SELECT @post_count = COUNT(*) FROM social.posts WHERE user_id = @user_id AND is_deleted = 0;

    -- Get profile pic, username, and full name
    DECLARE @profilepic_url VARCHAR(MAX);
    DECLARE @username VARCHAR(50);
    DECLARE @full_name VARCHAR(255);

    SELECT @profilepic_url = profilepic_url, @username = username, @full_name = full_name
    FROM social.user_profile
    WHERE user_id = @user_id;

    -- Return the results
    SELECT @followings_count AS followings_count,
           @followers_count AS followers_count,
           @post_count AS post_count,
           @profilepic_url AS profilepic_url,
           @username AS username,
           @full_name AS full_name;
END