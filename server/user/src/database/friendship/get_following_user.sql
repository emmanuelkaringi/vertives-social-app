CREATE OR ALTER PROCEDURE social.GetFollowingStatus
    @followerId UNIQUEIDENTIFIER,
    @followingId UNIQUEIDENTIFIER,
    @IsFollowing BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT @IsFollowing = CASE WHEN EXISTS (
        SELECT 1
        FROM social.friendship
        WHERE follower_id = @followerId AND following_id = @followingId
    ) THEN 1 ELSE 0 END;
END
