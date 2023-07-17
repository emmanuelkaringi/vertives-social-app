CREATE PROCEDURE social.GetPostById
    @post_id UNIQUEIDENTIFIER
AS
BEGIN
    SELECT P.post_id, P.user_id, U.username, U.profilepic_url, P.content_txt, P.media_url, P.like_count, P.comment_count, P.created_at
    FROM social.posts AS P
    JOIN social.user_profile AS U ON P.user_id = U.user_id
    WHERE P.post_id = @post_id;
END;