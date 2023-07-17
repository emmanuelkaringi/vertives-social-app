CREATE PROCEDURE social.UpdateUser
    @user_id UNIQUEIDENTIFIER,
    @full_name VARCHAR(255),
    @username VARCHAR(50),
    @DOB DATE,
    @city VARCHAR(50),
    @profilepic_url VARCHAR(MAX),
    @coverpic_url VARCHAR(MAX)
AS
BEGIN

    UPDATE social.user_profile
    SET full_name = @full_name,
        username = @username,
        DOB = @DOB,
        city = @city,
        profilepic_url = @profilepic_url,
        coverpic_url = @coverpic_url,
        updated_at = SYSDATETIME()
    WHERE user_id = @user_id;
END


EXEC social.UpdateUser
    @user_id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    @full_name = 'John Doe',
    @username = 'johndoe',
    @DOB = '1990-01-01',
    @city = 'New York',
    @profilepic_url = 'https://example.com/profilepic.jpg',
    @coverpic_url = 'https://example.com/profilepic.jpg';


SELECT * FROM social.user_profile;