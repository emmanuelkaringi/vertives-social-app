CREATE TRIGGER tr_reply_comment
ON social.replies
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert a notification for the comment reply
    INSERT INTO social.notifications (notif_id, recipient_id, sender_id, comment_id, notification_type, timestamp)
    SELECT NEWID(), c.user_id, i.user_id, c.comment_id, 'reply', SYSDATETIME()
    FROM inserted i
    JOIN social.comments c ON c.comment_id = i.comment_id;
END;
GO