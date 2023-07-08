CREATE PROCEDURE social.GetPostsByFollowing
    @user_id UNIQUEIDENTIFIER
AS
BEGIN
    SELECT
        p.post_id,
        u.user_id AS poster_user_id,
        u.username AS poster_username,
        u.profilepic_url AS poster_profilepic,
        p.content_txt,
        p.media_url
    FROM
        social.friendship AS f
        JOIN social.posts AS p ON f.following_id = p.user_id
        JOIN social.user_profile AS u ON p.user_id = u.user_id
    WHERE
        f.follower_id = @user_id
        AND p.is_deleted = 0
    ORDER BY
        p.created_at DESC;
END;
GO