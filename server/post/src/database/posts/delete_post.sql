CREATE OR ALTER PROCEDURE social.DeletePost
    @post_id UNIQUEIDENTIFIER
AS
BEGIN
 UPDATE social.posts
    SET is_deleted = 1
    WHERE post_id = @post_id;
END;
GO