CREATE OR ALTER PROCEDURE social.LikePost
    @sender_id UNIQUEIDENTIFIER,
    @post_id UNIQUEIDENTIFIER
AS
BEGIN
    -- Check if the user has already liked the post
    IF EXISTS (
        SELECT 1
        FROM social.likes
        WHERE sender_id = @sender_id
            AND post_id = @post_id
    )
    BEGIN
        -- User has already liked the post, return an error or appropriate message
        RAISERROR ('User has already liked the post.', 16, 1);
        RETURN;
    END

    BEGIN TRANSACTION;

    -- Insert the like into the likes table
    INSERT INTO social.likes (like_id, sender_id, recipient_id, post_id, created_at)
    VALUES (NEWID(), @sender_id, (SELECT user_id FROM social.posts WHERE post_id = @post_id), @post_id, SYSDATETIME());

    -- Update the like count in the posts table
    UPDATE social.posts
    SET like_count = like_count + 1
    WHERE post_id = @post_id;

    -- Commit the transaction
    COMMIT;

    -- Return success message or appropriate response
    SELECT 'Post liked successfully' AS message;
END
