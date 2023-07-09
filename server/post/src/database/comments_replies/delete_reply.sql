CREATE PROCEDURE social.DeleteReply
    @reply_id UNIQUEIDENTIFIER
AS
BEGIN
    UPDATE social.replies
    SET is_deleted = 1
    WHERE reply_id = @reply_id;
END;
GO