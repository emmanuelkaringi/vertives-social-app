CREATE OR ALTER PROCEDURE social.GetAllProfiles
AS
BEGIN
    SELECT
        user_id,
        full_name,
        username,
        email,
        DOB,
        city,
        profilepic_url,
        coverpic_url,
        created_at,
        updated_at
    FROM
        social.user_profile
    WHERE
        is_deleted = 0;
END