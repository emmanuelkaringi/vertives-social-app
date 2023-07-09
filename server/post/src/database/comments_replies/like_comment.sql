CREATE PROCEDURE social.LikeComment
    @sender_id UNIQUEIDENTIFIER,
    @comment_id UNIQUEIDENTIFIER
AS
BEGIN

    -- Check if the user has already liked the comment
    IF EXISTS (
        SELECT 1
        FROM social.likes
        WHERE sender_id = @sender_id
            AND comment_id = @comment_id
    )
    BEGIN
        -- User has already liked the comment, return without updating anything
        RETURN;
    END

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Insert a new like record
        INSERT INTO social.likes (like_id, sender_id, comment_id, created_at)
        VALUES (NEWID(), @sender_id, @comment_id, SYSDATETIME());

        -- Increment the like count for the comment
        UPDATE social.comments
        SET like_count = like_count + 1
        WHERE comment_id = @comment_id;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Error occurred, rollback the transaction
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO