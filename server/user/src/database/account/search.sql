CREATE OR ALTER PROCEDURE social.SearchUsers
    @search_query NVARCHAR(100)
AS
BEGIN
    SELECT user_id, full_name, username, profilepic_url
    FROM social.user_profile
    WHERE full_name LIKE '%' + @search_query + '%' OR username LIKE '%' + @search_query + '%';
END