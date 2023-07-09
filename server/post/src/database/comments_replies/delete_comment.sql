CREATE OR ALTER PROCEDURE social.DeleteComment
    @commentId UNIQUEIDENTIFIER
AS
BEGIN
    -- Delete related entries from the notifications table
    DELETE FROM social.notifications
    WHERE comment_id = @commentId;

    -- Delete the comment from the replies table
    DELETE FROM social.replies
    WHERE comment_id = @commentId;

    -- Delete the comment from the likes table
    DELETE FROM social.likes
    WHERE comment_id = @commentId;

    -- Delete the comment from the comments table
    UPDATE social.comments
    SET is_deleted = 1
    WHERE comment_id = @commentId;
END;
GO