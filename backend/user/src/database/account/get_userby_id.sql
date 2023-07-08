CREATE PROCEDURE social.GetUserByID
    @user_id UNIQUEIDENTIFIER
AS
BEGIN
    
    SELECT *
    FROM social.user_profile
    WHERE user_id = @user_id;
END


EXEC social.GetUserByID @user_id = 'b21a0e21-ea2c-4a81-82a2-ab3d45182dcc';