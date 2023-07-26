CREATE OR ALTER PROCEDURE social.CreateUser
    @full_name VARCHAR(255),
    @username VARCHAR(50),
    @email VARCHAR(255),
    @DOB DATE,
    @city VARCHAR(50),
    @profilepic_url VARCHAR(MAX),
    @password VARCHAR(255)
AS
BEGIN
    -- Set the default value for @profilepic_url if it is NULL
    IF @profilepic_url IS NULL
        SET @profilepic_url = 'https://robohash.org/voluptatemsintnulla.png';

    INSERT INTO social.user_profile (full_name, username, email, DOB, city, profilepic_url, password)
    VALUES (@full_name, @username, @email, @DOB, @city, @profilepic_url, @password);
END;




EXEC social.CreateUser
    @full_name = 'John Doe',
    @username = 'johndoe',
    @email = 'johndoe@example.com',
    @DOB = '1990-01-01',
    @city = 'Nairobi',
    @profilepic_url = 'https://example.com/profilepic.jpg',
    @coverpic_url = 'https://res.cloudinary.com/ddnpdyaoc/image/upload/v1689599574/jllytsp8ue04fuaumyz3.jpg'
    @password = 'secretpassword';


EXEC social.CreateUser
    @full_name = 'Marcel Don',
    @username = 'acharlota',
    @email = 'acharlota@liveinternet.ru',
    @DOB = '1995-01-01',
    @city = 'Nairobi',
    @profilepic_url = 'https://robohash.org/impeditautest.png',
    @password = 'M9lbMdydMN';


SELECT * FROM social.user_profile;