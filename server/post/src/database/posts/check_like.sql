CREATE PROCEDURE social.CheckLike
    @sender_id UNIQUEIDENTIFIER,
    @post_id UNIQUEIDENTIFIER,
    @has_liked BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT @has_liked = CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END
    FROM social.likes
    WHERE sender_id = @sender_id
    AND post_id = @post_id;
END
GO