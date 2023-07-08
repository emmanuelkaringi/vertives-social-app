CREATE PROCEDURE social.updatePassword
    @user_id UNIQUEIDENTIFIER,
    @new_password VARCHAR(255)
AS
BEGIN
   
    UPDATE social.user_profile
    SET password = @new_password,
        updated_at = SYSDATETIME()
    WHERE user_id = @user_id;
END