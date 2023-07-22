CREATE OR ALTER PROCEDURE social.CreatePost
    @user_id UNIQUEIDENTIFIER,
    @content_txt TEXT,
    @media_url TEXT = NULL
AS
BEGIN

    BEGIN TRY
        BEGIN TRANSACTION;
        
        INSERT INTO social.posts (user_id, content_txt, media_url)
        VALUES (@user_id, @content_txt, @media_url);
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        
        THROW;
    END CATCH;
END;