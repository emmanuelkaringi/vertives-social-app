CREATE PROCEDURE social.AddComment
    @user_id UNIQUEIDENTIFIER,
    @post_id UNIQUEIDENTIFIER,
    @comment_txt TEXT
AS
BEGIN
    INSERT INTO social.comments (user_id, post_id, comment_txt)
    VALUES (@user_id, @post_id, @comment_txt);

END;