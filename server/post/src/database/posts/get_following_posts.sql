CREATE OR ALTER PROCEDURE social.GetPostsByFollowing
    @user_id UNIQUEIDENTIFIER
AS
BEGIN
    -- Fetch the user's own posts
    WITH UserPosts AS (
        SELECT P.post_id, P.user_id, U.username, U.profilepic_url, P.content_txt, P.media_url, P.like_count, P.comment_count, P.created_at
        FROM social.posts AS P
        JOIN social.user_profile AS U ON P.user_id = U.user_id
        WHERE P.user_id = @user_id AND P.is_deleted = 0
    ),
    
    -- Fetch the posts of those the user is following
    FollowingPosts AS (
        SELECT P.post_id, P.user_id, U.username, U.profilepic_url, P.content_txt, P.media_url, P.like_count, P.comment_count, P.created_at
        FROM social.posts AS P
        JOIN social.user_profile AS U ON P.user_id = U.user_id
        JOIN social.friendship AS F ON F.following_id = P.user_id
        WHERE F.follower_id = @user_id AND P.is_deleted = 0
    )

    -- Union the user's posts and the following posts
    SELECT * FROM UserPosts
    UNION
    SELECT * FROM FollowingPosts
    ORDER BY created_at DESC;
END;