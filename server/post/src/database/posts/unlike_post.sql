CREATE OR ALTER PROCEDURE social.UnlikePost
    @sender_id UNIQUEIDENTIFIER,
    @post_id UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @like_count INT;

    -- Check if the user has already liked the post
    IF EXISTS (
        SELECT 1
        FROM social.likes
        WHERE sender_id = @sender_id
        AND post_id = @post_id
    )
    BEGIN
        -- Delete the like entry
        DELETE FROM social.likes
        WHERE sender_id = @sender_id
        AND post_id = @post_id;

        -- Update the like count in the posts table
        UPDATE social.posts
        SET like_count = like_count - 1
        WHERE post_id = @post_id
        AND like_count > 0; -- Ensure like count is never less than 0

        -- Get the updated like count
        SELECT @like_count = like_count
        FROM social.posts
        WHERE post_id = @post_id;

        -- Return the updated like count
        SELECT @like_count AS like_count;
    END
    ELSE
    BEGIN
        -- The user has not liked the post, return an error message
        RAISERROR('User has not liked the post.', 16, 1);
        RETURN;
    END;
END;
