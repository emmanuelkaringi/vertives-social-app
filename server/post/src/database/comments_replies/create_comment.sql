CREATE OR ALTER PROCEDURE social.AddComment
    @user_id UNIQUEIDENTIFIER,
    @post_id UNIQUEIDENTIFIER,
    @comment_txt TEXT
AS
BEGIN
    BEGIN TRANSACTION;
    
    INSERT INTO social.comments (user_id, post_id, comment_txt)
    VALUES (@user_id, @post_id, @comment_txt);

    -- Increase comment_count in social.posts table
    UPDATE social.posts
    SET comment_count = comment_count + 1
    WHERE post_id = @post_id;

    COMMIT TRANSACTION;
END;