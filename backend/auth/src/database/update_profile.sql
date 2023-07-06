CREATE PROCEDURE social.UpdateUser
    @user_id UNIQUEIDENTIFIER,
    @full_name VARCHAR(255),
    @username VARCHAR(50),
    @DOB DATE,
    @city VARCHAR(50),
    @profilepic_url VARCHAR(MAX),
    @password VARCHAR(255)
AS
BEGIN
    
    UPDATE social.user_profile
    SET full_name = @full_name,
        username = @username,
        DOB = @DOB,
        city = @city,
        profilepic_url = @profilepic_url,
        password = @password,
        updated_at = SYSDATETIME()
    WHERE user_id = @user_id;
END



DECLARE @userId UNIQUEIDENTIFIER = 'b21a0e21-ea2c-4a81-82a2-ab3d45182dcc';
DECLARE @fullName VARCHAR(255) = 'John Dangote';
DECLARE @username VARCHAR(50) = 'johnd';
DECLARE @DOB DATE = '1990-01-01';
DECLARE @city VARCHAR(50) = 'New York';
DECLARE @profilePicUrl VARCHAR(MAX) = 'https://example.com/profilepic.jpg';
DECLARE @password VARCHAR(255) = 'password123';


EXEC social.UpdateUser
    @user_id = @userId,
    @full_name = @fullName,
    @username = @username,
    @DOB = @DOB,
    @city = @city,
    @profilepic_url = @profilePicUrl,
    @password = @password;


SELECT * FROM social.user_profile;