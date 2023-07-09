CREATE PROCEDURE social.DeletePost
    @post_id UNIQUEIDENTIFIER
AS
BEGIN
    
    BEGIN TRANSACTION;
    
    BEGIN TRY
        -- Delete likes associated with the post
        DELETE FROM social.likes
        WHERE post_id = @post_id;
        
        -- Delete notifications associated with the post
        DELETE FROM social.notifications
        WHERE post_id = @post_id;
        
        -- Delete replies associated with the comments of the post
        DELETE FROM social.replies
        WHERE comment_id IN (
            SELECT comment_id
            FROM social.comments
            WHERE post_id = @post_id
        );
        
        -- Delete comments associated with the post
        DELETE FROM social.comments
        WHERE post_id = @post_id;
        
        -- Delete the post
        DELETE FROM social.posts
        WHERE post_id = @post_id;
        
        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW;
    END CATCH;
END;