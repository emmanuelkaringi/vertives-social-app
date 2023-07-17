ALTER DATABASE [vertives_social]
SET SINGLE_USER --or RESTRICTED_USER
WITH ROLLBACK IMMEDIATE;
GO

DROP DATABASE [vertives_social];
GO

CREATE DATABASE vertives_social;
GO

USE vertives_social;
GO

CREATE SCHEMA social;
GO

CREATE TABLE social.user_profile (
    user_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    DOB DATE NOT NULL,
    city VARCHAR(50),
    profilepic_url VARCHAR(MAX) DEFAULT 'https://robohash.org/voluptatemsintnulla.png',
    coverpic_url VARCHAR(MAX) DEFAULT 'https://res.cloudinary.com/ddnpdyaoc/image/upload/v1689599574/jllytsp8ue04fuaumyz3.jpg',
    password VARCHAR(255) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    is_deleted BIT NOT NULL DEFAULT 0
);
GO

CREATE TABLE social.posts (
    post_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    content_txt VARCHAR(255),
    media_url VARCHAR(MAX) NULL,
    like_count INT NOT NULL DEFAULT 0,
    comment_count INT NOT NULL DEFAULT 0,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    is_deleted BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES social.user_profile(user_id) ON DELETE CASCADE
);
GO

CREATE TABLE social.comments (
    comment_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    post_id UNIQUEIDENTIFIER NOT NULL,
    comment_txt VARCHAR(255) NOT NULL,
    like_count INT NOT NULL DEFAULT 0,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    is_deleted BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES social.user_profile(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES social.posts(post_id) ON DELETE NO ACTION
);
GO

CREATE TABLE social.replies (
    reply_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    comment_id UNIQUEIDENTIFIER NOT NULL,
    reply_txt VARCHAR(255) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    is_deleted BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES social.user_profile(user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES social.comments(comment_id) ON DELETE NO ACTION
);
GO

CREATE TABLE social.likes (
    like_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    sender_id UNIQUEIDENTIFIER NOT NULL,
    recipient_id UNIQUEIDENTIFIER NOT NULL,
    post_id UNIQUEIDENTIFIER,
    comment_id UNIQUEIDENTIFIER,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (sender_id) REFERENCES social.user_profile(user_id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES social.user_profile(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (post_id) REFERENCES social.posts(post_id) ON DELETE NO ACTION,
    FOREIGN KEY (comment_id) REFERENCES social.comments(comment_id) ON DELETE NO ACTION
);
GO

CREATE TABLE social.notifications (
    notif_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    recipient_id UNIQUEIDENTIFIER NOT NULL,
    sender_id UNIQUEIDENTIFIER NOT NULL,
    post_id UNIQUEIDENTIFIER,
    comment_id UNIQUEIDENTIFIER,
    notification_type NVARCHAR(50) NOT NULL,
    timestamp DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (recipient_id) REFERENCES social.user_profile(user_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES social.user_profile(user_id) ON DELETE NO ACTION,
    FOREIGN KEY (post_id) REFERENCES social.posts(post_id) ON DELETE NO ACTION,
    FOREIGN KEY (comment_id) REFERENCES social.comments(comment_id) ON DELETE NO ACTION
);
GO

CREATE TABLE social.friendship (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    follower_id UNIQUEIDENTIFIER NOT NULL,
    following_id UNIQUEIDENTIFIER NOT NULL,
    FOREIGN KEY (follower_id) REFERENCES social.user_profile(user_id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES social.user_profile(user_id) ON DELETE NO ACTION
);
GO