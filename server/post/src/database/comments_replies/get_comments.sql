CREATE PROCEDURE social.GetPostComments
    @postID UNIQUEIDENTIFIER
AS
BEGIN
    SELECT
        c.comment_id,
        c.comment_txt,
        c.created_at,
        u.user_id,
        u.username,
        u.profilepic_url,
        p.content_txt,
        p.media_url
    FROM
        social.comments c
    INNER JOIN
        social.user_profile u ON c.user_id = u.user_id
    INNER JOIN
        social.posts p ON c.post_id = p.post_id
    WHERE
        c.post_id = @postID AND c.is_deleted = 0
    ORDER BY
        c.created_at DESC;
END;