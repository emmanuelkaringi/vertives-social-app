CREATE PROCEDURE social.AddReply
    @user_id UNIQUEIDENTIFIER,
    @comment_id UNIQUEIDENTIFIER,
    @reply_txt VARCHAR(255)
AS
BEGIN
    INSERT INTO social.replies (user_id, comment_id, reply_txt)
    VALUES (@user_id, @comment_id, @reply_txt);
END;
GO