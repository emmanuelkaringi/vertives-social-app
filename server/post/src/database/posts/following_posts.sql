CREATE OR ALTER PROCEDURE social.FollowingUser
    @user_id UNIQUEIDENTIFIER
AS
BEGIN
    -- Fetch the posts of the user
    SELECT 
        p.user_id,
        u.full_name,
        u.username,
        u.profilepic_url,
        p.post_id,
        p.content_txt,
        p.media_url,
        p.like_count,
        p.comment_count,
        p.created_at
    FROM 
        social.posts p
    INNER JOIN
        social.user_profile u ON p.user_id = u.user_id
    WHERE
        p.user_id = @user_id
        AND p.is_deleted = 0

    UNION

    -- Fetch the posts of people the user is following
    SELECT 
        p.user_id,
        u.full_name,
        u.username,
        u.profilepic_url,
        p.post_id,
        p.content_txt,
        p.media_url,
        p.like_count,
        p.comment_count,
        p.created_at
    FROM 
        social.posts p
    INNER JOIN
        social.user_profile u ON p.user_id = u.user_id
    INNER JOIN
        social.friendship f ON p.user_id = f.following_id
    WHERE
        f.follower_id = @user_id
        AND p.is_deleted = 0;

END;
GO