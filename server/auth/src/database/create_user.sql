CREATE PROCEDURE social.CreateUser
    @full_name VARCHAR(255),
    @username VARCHAR(50),
    @email VARCHAR(255),
    @DOB DATE,
    @city VARCHAR(50),
    @profilepic_url VARCHAR(MAX),
    @password VARCHAR(255)
AS
BEGIN
    INSERT INTO social.user_profile (full_name, username, email, DOB, city, profilepic_url, password)
    VALUES (@full_name, @username, @email, @DOB, @city, @profilepic_url, @password);
END



EXEC social.CreateUser
    @full_name = 'John Doe',
    @username = 'johndoe',
    @email = 'johndoe@example.com',
    @DOB = '1990-01-01',
    @city = 'Nairobi',
    @profilepic_url = 'https://example.com/profilepic.jpg',
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