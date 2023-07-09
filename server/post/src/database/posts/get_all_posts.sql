CREATE PROCEDURE social.GetPosts
AS
BEGIN
    SELECT P.post_id, P.user_id, U.username, U.profilepic_url, P.content_txt, P.media_url, P.created_at
    FROM social.posts AS P
    JOIN social.user_profile AS U ON P.user_id = U.user_id
    WHERE P.is_deleted = 0
    ORDER BY P.created_at DESC;
END;

EXEC social.GetPosts;