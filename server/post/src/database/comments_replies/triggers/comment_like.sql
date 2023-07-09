CREATE TRIGGER tr_like_comment
ON social.likes
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert a notification for the comment like
    INSERT INTO social.notifications (notif_id, recipient_id, sender_id, comment_id, notification_type, timestamp)
    SELECT NEWID(), c.user_id, i.sender_id, c.comment_id, 'comment like', SYSDATETIME()
    FROM inserted i
    JOIN social.comments c ON c.comment_id = i.comment_id;
END;
GO