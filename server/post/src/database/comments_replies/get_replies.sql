CREATE PROCEDURE social.GetReplies
    @comment_id UNIQUEIDENTIFIER
AS
BEGIN
    SELECT
        r.reply_id,
        r.reply_txt,
        r.created_at,
        c.comment_id,
        c.comment_txt,
        c.created_at AS comment_created_at,
        u.user_id,
        u.full_name,
        u.username
    FROM
        social.replies AS r
        INNER JOIN social.comments AS c ON r.comment_id = c.comment_id
        INNER JOIN social.user_profile AS u ON r.user_id = u.user_id
    WHERE
        r.comment_id = @comment_id AND r.is_deleted = 0
    ORDER BY
        r.created_at ASC;
END;
GO