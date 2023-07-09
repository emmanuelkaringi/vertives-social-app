CREATE PROCEDURE social.UnlikeComment
    @sender_id UNIQUEIDENTIFIER,
    @comment_id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user has already unliked the comment
    IF NOT EXISTS (
        SELECT 1
        FROM social.likes
        WHERE sender_id = @sender_id
            AND comment_id = @comment_id
    )
    BEGIN
        -- User has already unliked the comment or hasn't liked it before, return without updating anything
        RETURN;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Decrement the like count for the comment
        UPDATE social.comments
        SET like_count = CASE WHEN like_count > 0 THEN like_count - 1 ELSE 0 END
        WHERE comment_id = @comment_id;

        -- Delete the like entry from the likes table
        DELETE FROM social.likes
        WHERE sender_id = @sender_id
            AND comment_id = @comment_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Error occurred, rollback the transaction
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO