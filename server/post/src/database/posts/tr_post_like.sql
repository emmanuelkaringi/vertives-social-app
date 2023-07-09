CREATE TRIGGER trg_post_like
ON social.likes
AFTER INSERT
AS
BEGIN
    INSERT INTO social.notifications (notif_id, recipient_id, sender_id, post_id, notification_type, timestamp)
    SELECT NEWID(), i.recipient_id, i.sender_id, i.post_id, 'post like', SYSDATETIME()
    FROM inserted i;
END;
GO