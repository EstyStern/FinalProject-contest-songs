USE [DB_project]
GO
/****** Object:  Table [dbo].[JudgeTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JudgeTbl](
	[JudgeId] [smallint] IDENTITY(1,1) NOT NULL,
	[UserId] [smallint] NOT NULL,
	[JudgeResume] [nvarchar](50) NOT NULL,
	[JudgeType] [nvarchar](20) NOT NULL,
	[JudgeCancalingReason] [nvarchar](max) NULL,
	[JudgePic] [varchar](50) NULL,
 CONSTRAINT [PK_JudgeTbl] PRIMARY KEY CLUSTERED 
(
	[JudgeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JudgForPlanTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JudgForPlanTbl](
	[JudgForPlanId] [smallint] IDENTITY(1,1) NOT NULL,
	[UserId] [smallint] NOT NULL,
	[PlanId] [smallint] NOT NULL,
 CONSTRAINT [PK_JudgForPlanTbl] PRIMARY KEY CLUSTERED 
(
	[JudgForPlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MessageTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MessageTbl](
	[MessageId] [smallint] IDENTITY(1,1) NOT NULL,
	[UserId] [smallint] NOT NULL,
	[MessageDate] [datetime] NOT NULL,
	[MessageValue] [varchar](max) NOT NULL,
 CONSTRAINT [PK_MessageTbl] PRIMARY KEY CLUSTERED 
(
	[MessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PlanTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PlanTbl](
	[PlanId] [smallint] IDENTITY(1,1) NOT NULL,
	[TypePlanId] [smallint] NOT NULL,
	[PlanName] [varchar](50) NOT NULL,
	[PlanStartDate] [datetime] NOT NULL,
	[Pic] [varchar](50) NULL,
 CONSTRAINT [PK_PlanTbl] PRIMARY KEY CLUSTERED 
(
	[PlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RatingTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RatingTbl](
	[RatingId] [smallint] IDENTITY(1,1) NOT NULL,
	[UserId] [smallint] NOT NULL,
	[SongId] [smallint] NOT NULL,
	[RatingByMusical] [int] NULL,
	[RatingByMatchSong] [int] NULL,
	[RatingByMatchShow] [int] NULL,
	[RatingFinal] [int] NOT NULL,
	[RatingExplanation] [varchar](max) NULL,
 CONSTRAINT [PK_RatingTbl] PRIMARY KEY CLUSTERED 
(
	[RatingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SingerTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SingerTbl](
	[SingerId] [smallint] IDENTITY(1,1) NOT NULL,
	[UserId] [smallint] NOT NULL,
	[SingerResume] [varchar](50) NOT NULL,
	[SingerStatus] [varchar](10) NOT NULL,
	[SingerImg] [varchar](50) NOT NULL,
	[SingerCancalingReason] [varchar](max) NULL,
 CONSTRAINT [PK_SingerTbl] PRIMARY KEY CLUSTERED 
(
	[SingerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SongTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SongTbl](
	[SongId] [smallint] IDENTITY(1,1) NOT NULL,
	[UserId] [smallint] NOT NULL,
	[StepInPlanId] [smallint] NOT NULL,
	[SongName] [varchar](50) NOT NULL,
	[SongFile] [varchar](50) NOT NULL,
	[SongChoosingReason] [varchar](max) NOT NULL,
	[SongComposer] [varchar](50) NULL,
	[SongPrecessor] [varchar](50) NULL,
	[SongStatus] [varchar](50) NOT NULL,
	[SongComment] [varchar](max) NULL,
 CONSTRAINT [PK_SongTbl] PRIMARY KEY CLUSTERED 
(
	[SongId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StepInPlanTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StepInPlanTbl](
	[StepInPlanId] [smallint] IDENTITY(1,1) NOT NULL,
	[PlanID] [smallint] NOT NULL,
	[StepInPlanStartDate] [datetime] NOT NULL,
	[StepInPlanEndDateToUploadSong] [datetime] NOT NULL,
	[StepInPlanEndDateToJudg] [datetime] NOT NULL,
	[StepInPlanEndDateToRating] [datetime] NOT NULL,
	[StepInPlanPart] [int] NULL,
 CONSTRAINT [PK_StepInPlanTbl] PRIMARY KEY CLUSTERED 
(
	[StepInPlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypePlanTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypePlanTbl](
	[TypePlanId] [smallint] IDENTITY(1,1) NOT NULL,
	[TypePlanName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TypePlanTbl] PRIMARY KEY CLUSTERED 
(
	[TypePlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTbl]    Script Date: 17/05/2022 13:09:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTbl](
	[UserId] [smallint] IDENTITY(1,1) NOT NULL,
	[UserFirstName] [varchar](50) NOT NULL,
	[UserLastName] [varchar](50) NOT NULL,
	[UserPass] [varchar](9) NOT NULL,
	[UserEmail] [varchar](50) NULL,
	[UserCity] [varchar](50) NULL,
	[UserBirthDate] [date] NULL,
	[UserGender] [varchar](20) NOT NULL,
	[UserGenre] [varchar](20) NULL,
 CONSTRAINT [PK_UserTbl] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[JudgeTbl] ON 
GO
INSERT [dbo].[JudgeTbl] ([JudgeId], [UserId], [JudgeResume], [JudgeType], [JudgeCancalingReason], [JudgePic]) VALUES (2, 1, N'נסיון רב', N'חסידי', N'שירה יפה', NULL)
GO
INSERT [dbo].[JudgeTbl] ([JudgeId], [UserId], [JudgeResume], [JudgeType], [JudgeCancalingReason], [JudgePic]) VALUES (3, 2, N'נסיון רב', N'חסידי', N'שירה יפה', NULL)
GO
INSERT [dbo].[JudgeTbl] ([JudgeId], [UserId], [JudgeResume], [JudgeType], [JudgeCancalingReason], [JudgePic]) VALUES (4, 3, N'נסיון רב', N'מזרחי', N'שירה יפה', NULL)
GO
INSERT [dbo].[JudgeTbl] ([JudgeId], [UserId], [JudgeResume], [JudgeType], [JudgeCancalingReason], [JudgePic]) VALUES (5, 6, N'נסיון רב', N'ישראלי', N'שירה יפה', NULL)
GO
SET IDENTITY_INSERT [dbo].[JudgeTbl] OFF
GO
SET IDENTITY_INSERT [dbo].[JudgForPlanTbl] ON 
GO
INSERT [dbo].[JudgForPlanTbl] ([JudgForPlanId], [UserId], [PlanId]) VALUES (1, 1, 2)
GO
INSERT [dbo].[JudgForPlanTbl] ([JudgForPlanId], [UserId], [PlanId]) VALUES (3, 3, 2)
GO
INSERT [dbo].[JudgForPlanTbl] ([JudgForPlanId], [UserId], [PlanId]) VALUES (4, 6, 2)
GO
INSERT [dbo].[JudgForPlanTbl] ([JudgForPlanId], [UserId], [PlanId]) VALUES (5, 2, 4)
GO
INSERT [dbo].[JudgForPlanTbl] ([JudgForPlanId], [UserId], [PlanId]) VALUES (6, 3, 4)
GO
INSERT [dbo].[JudgForPlanTbl] ([JudgForPlanId], [UserId], [PlanId]) VALUES (7, 6, 4)
GO
INSERT [dbo].[JudgForPlanTbl] ([JudgForPlanId], [UserId], [PlanId]) VALUES (8, 1, 6)
GO
INSERT [dbo].[JudgForPlanTbl] ([JudgForPlanId], [UserId], [PlanId]) VALUES (9, 3, 6)
GO
INSERT [dbo].[JudgForPlanTbl] ([JudgForPlanId], [UserId], [PlanId]) VALUES (10, 6, 6)
GO
SET IDENTITY_INSERT [dbo].[JudgForPlanTbl] OFF
GO
SET IDENTITY_INSERT [dbo].[MessageTbl] ON 
GO
INSERT [dbo].[MessageTbl] ([MessageId], [UserId], [MessageDate], [MessageValue]) VALUES (1, 1, CAST(N'2022-04-09T00:00:00.000' AS DateTime), N'תזכורת דרוג תוכנית ילדים')
GO
INSERT [dbo].[MessageTbl] ([MessageId], [UserId], [MessageDate], [MessageValue]) VALUES (3, 2, CAST(N'2022-03-04T00:00:00.000' AS DateTime), N'תזכורת דרוג תוכנית ילדים')
GO
INSERT [dbo].[MessageTbl] ([MessageId], [UserId], [MessageDate], [MessageValue]) VALUES (4, 11, CAST(N'2022-03-04T00:00:00.000' AS DateTime), N'עלית שלב')
GO
SET IDENTITY_INSERT [dbo].[MessageTbl] OFF
GO
SET IDENTITY_INSERT [dbo].[PlanTbl] ON 
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (2, 1, N'קול הילדים', CAST(N'2021-12-22T00:00:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (4, 2, N'קול הנערים', CAST(N'2022-05-16T00:40:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (6, 3, N'קולות החזנים', CAST(N'2022-01-01T00:00:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (7, 3, N'קול החזנים', CAST(N'2022-08-01T00:00:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (11, 2, N'קולות', CAST(N'2022-06-19T12:16:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (12, 2, N'קולות', CAST(N'2022-05-17T12:20:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (13, 2, N'קולות', CAST(N'2022-05-17T12:20:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (14, 2, N'קולות', CAST(N'2022-05-17T12:20:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (15, 2, N'קולות', CAST(N'2022-05-17T12:20:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (16, 2, N'קולות', CAST(N'2022-05-15T12:23:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (17, 2, N'קולות', CAST(N'2022-05-23T12:33:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (18, 3, N'קולות', CAST(N'2022-05-22T13:49:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (19, 3, N'צצצצ', CAST(N'2022-05-29T13:59:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (20, 3, N'צצצצ', CAST(N'2022-05-29T13:59:00.000' AS DateTime), N'p1.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (21, 3, N'צצצצ', CAST(N'2022-05-29T13:59:00.000' AS DateTime), N'christmas-g93f87c92a_1920.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (22, 3, N'qqq', CAST(N'2022-05-30T14:11:00.000' AS DateTime), N'Creative Music Symbol Poster Background.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (23, 3, N'qqq', CAST(N'2022-05-30T14:11:00.000' AS DateTime), N'Creative Music Symbol Poster Background.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (24, 3, N'qqq', CAST(N'2022-05-30T14:11:00.000' AS DateTime), N'Creative Music Symbol Poster Background.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (25, 3, N'רר', CAST(N'2022-05-30T14:18:00.000' AS DateTime), N'Creative Music Symbol Poster Background.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (27, 3, N'קול', CAST(N'2022-05-23T16:53:00.000' AS DateTime), N'christmas-g93f87c92a_1920.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (28, 20, N'שירים', CAST(N'2022-05-30T16:58:00.000' AS DateTime), N'christmas-g93f87c92a_1920.jpg')
GO
INSERT [dbo].[PlanTbl] ([PlanId], [TypePlanId], [PlanName], [PlanStartDate], [Pic]) VALUES (29, 1, N'תוכנית חדשה', CAST(N'2022-05-29T22:43:00.000' AS DateTime), N'Creative Music Symbol Poster Background.jpg')
GO
SET IDENTITY_INSERT [dbo].[PlanTbl] OFF
GO
SET IDENTITY_INSERT [dbo].[RatingTbl] ON 
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (1, 14, 1, 5, 1, 2, 6, NULL)
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (2, 15, 3, 8, 5, 8, 8, NULL)
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (3, 17, 5, 9, 9, 9, 9, NULL)
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (4, 1, 3, 8, 8, 8, 8, N'יחודי')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (5, 14, 3, 20, 20, 20, 60, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (6, 14, 3, 20, 20, 20, 60, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (7, 14, 3, 20, 20, 20, 60, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (8, 14, 3, 20, 20, 20, 60, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (9, 14, 6, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (10, 14, 6, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (11, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (12, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (13, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (14, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (15, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (16, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (17, 14, 6, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (18, 14, 6, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (19, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (20, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (21, 14, 6, 100, 100, 100, 300, N'jhjhjkghkghj')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (22, 14, 6, 100, 100, 100, 300, N'jhjhjkghkghj')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (23, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (24, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (25, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (26, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (27, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (28, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (29, 14, 6, 20, 20, 20, 60, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (30, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (31, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (32, 14, 6, 20, 20, 20, 60, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (33, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (34, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (35, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (36, 14, 6, 100, 100, 100, 300, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (37, 14, 3, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (38, 14, 3, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (39, 14, 5, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (40, 14, 5, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (41, 14, 5, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (42, 14, 5, 0, 0, 0, 0, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (43, 14, 5, 80, 80, 80, 240, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (44, 14, 5, 80, 80, 80, 240, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (45, 14, 5, 80, 80, 80, 240, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (46, 14, 5, 80, 80, 80, 240, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (47, 14, 5, 80, 80, 80, 240, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (48, 14, 5, 80, 80, 80, 240, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (49, 14, 5, 80, 80, 80, 240, N'')
GO
INSERT [dbo].[RatingTbl] ([RatingId], [UserId], [SongId], [RatingByMusical], [RatingByMatchSong], [RatingByMatchShow], [RatingFinal], [RatingExplanation]) VALUES (50, 14, 5, 80, 80, 80, 240, N'dfg')
GO
SET IDENTITY_INSERT [dbo].[RatingTbl] OFF
GO
SET IDENTITY_INSERT [dbo].[SingerTbl] ON 
GO
INSERT [dbo].[SingerTbl] ([SingerId], [UserId], [SingerResume], [SingerStatus], [SingerImg], [SingerCancalingReason]) VALUES (2, 7, N'7.mp4', N'פעיל', N'7.jpg', NULL)
GO
INSERT [dbo].[SingerTbl] ([SingerId], [UserId], [SingerResume], [SingerStatus], [SingerImg], [SingerCancalingReason]) VALUES (4, 10, N'10.mp4', N'לא פעיל', N'10.jpg', NULL)
GO
INSERT [dbo].[SingerTbl] ([SingerId], [UserId], [SingerResume], [SingerStatus], [SingerImg], [SingerCancalingReason]) VALUES (5, 11, N'11.mp4', N'לא פעיל', N'11.jpg', NULL)
GO
INSERT [dbo].[SingerTbl] ([SingerId], [UserId], [SingerResume], [SingerStatus], [SingerImg], [SingerCancalingReason]) VALUES (6, 13, N'13.mp4', N'לא פעיל', N'13.jpg', NULL)
GO
SET IDENTITY_INSERT [dbo].[SingerTbl] OFF
GO
SET IDENTITY_INSERT [dbo].[SongTbl] ON 
GO
INSERT [dbo].[SongTbl] ([SongId], [UserId], [StepInPlanId], [SongName], [SongFile], [SongChoosingReason], [SongComposer], [SongPrecessor], [SongStatus], [SongComment]) VALUES (1, 7, 5, N'מה תשתוחחי', N'7.mp3', N'התחברתי לשיר', N'שמילי', N'חבר', N'פעיל', NULL)
GO
INSERT [dbo].[SongTbl] ([SongId], [UserId], [StepInPlanId], [SongName], [SongFile], [SongChoosingReason], [SongComposer], [SongPrecessor], [SongStatus], [SongComment]) VALUES (3, 10, 5, N'יונה לבנה', N'10.mp3', N'התחברתי לשיר', N'חיים ישראל', N'חיים ישראל', N'פעיל', NULL)
GO
INSERT [dbo].[SongTbl] ([SongId], [UserId], [StepInPlanId], [SongName], [SongFile], [SongChoosingReason], [SongComposer], [SongPrecessor], [SongStatus], [SongComment]) VALUES (5, 11, 5, N'במה', N'11.mp3', N'התחברתי לשיר', N'חברים', N'חבר', N'פעיל', NULL)
GO
INSERT [dbo].[SongTbl] ([SongId], [UserId], [StepInPlanId], [SongName], [SongFile], [SongChoosingReason], [SongComposer], [SongPrecessor], [SongStatus], [SongComment]) VALUES (6, 13, 5, N'נשמה', N'13.mp3', N'התחברתי לשיר', N'יאיר אליצור', N'יאיר אליצור', N'פעיל', NULL)
GO
SET IDENTITY_INSERT [dbo].[SongTbl] OFF
GO
SET IDENTITY_INSERT [dbo].[StepInPlanTbl] ON 
GO
INSERT [dbo].[StepInPlanTbl] ([StepInPlanId], [PlanID], [StepInPlanStartDate], [StepInPlanEndDateToUploadSong], [StepInPlanEndDateToJudg], [StepInPlanEndDateToRating], [StepInPlanPart]) VALUES (1, 2, CAST(N'2021-12-22T00:00:00.000' AS DateTime), CAST(N'2022-01-05T00:00:00.000' AS DateTime), CAST(N'2022-01-22T00:00:00.000' AS DateTime), CAST(N'2022-05-20T00:00:00.000' AS DateTime), 1)
GO
INSERT [dbo].[StepInPlanTbl] ([StepInPlanId], [PlanID], [StepInPlanStartDate], [StepInPlanEndDateToUploadSong], [StepInPlanEndDateToJudg], [StepInPlanEndDateToRating], [StepInPlanPart]) VALUES (4, 2, CAST(N'2022-01-22T00:00:00.000' AS DateTime), CAST(N'2022-04-29T00:00:00.000' AS DateTime), CAST(N'2022-02-28T00:00:00.000' AS DateTime), CAST(N'2022-05-22T00:00:00.000' AS DateTime), 2)
GO
INSERT [dbo].[StepInPlanTbl] ([StepInPlanId], [PlanID], [StepInPlanStartDate], [StepInPlanEndDateToUploadSong], [StepInPlanEndDateToJudg], [StepInPlanEndDateToRating], [StepInPlanPart]) VALUES (5, 2, CAST(N'2022-04-08T00:00:00.000' AS DateTime), CAST(N'2022-04-16T00:00:00.000' AS DateTime), CAST(N'2022-05-16T00:00:00.000' AS DateTime), CAST(N'2022-05-17T00:00:00.000' AS DateTime), 3)
GO
INSERT [dbo].[StepInPlanTbl] ([StepInPlanId], [PlanID], [StepInPlanStartDate], [StepInPlanEndDateToUploadSong], [StepInPlanEndDateToJudg], [StepInPlanEndDateToRating], [StepInPlanPart]) VALUES (6, 4, CAST(N'2022-05-10T00:00:00.000' AS DateTime), CAST(N'2022-05-05T00:00:00.000' AS DateTime), CAST(N'2022-05-22T00:00:00.000' AS DateTime), CAST(N'2022-05-20T00:00:00.000' AS DateTime), 1)
GO
INSERT [dbo].[StepInPlanTbl] ([StepInPlanId], [PlanID], [StepInPlanStartDate], [StepInPlanEndDateToUploadSong], [StepInPlanEndDateToJudg], [StepInPlanEndDateToRating], [StepInPlanPart]) VALUES (7, 4, CAST(N'2022-02-01T00:00:00.000' AS DateTime), CAST(N'2022-02-15T00:00:00.000' AS DateTime), CAST(N'2022-03-01T00:00:00.000' AS DateTime), CAST(N'2022-02-28T00:00:00.000' AS DateTime), 2)
GO
INSERT [dbo].[StepInPlanTbl] ([StepInPlanId], [PlanID], [StepInPlanStartDate], [StepInPlanEndDateToUploadSong], [StepInPlanEndDateToJudg], [StepInPlanEndDateToRating], [StepInPlanPart]) VALUES (8, 4, CAST(N'2022-03-01T00:00:00.000' AS DateTime), CAST(N'2022-03-15T00:00:00.000' AS DateTime), CAST(N'2022-04-01T00:00:00.000' AS DateTime), CAST(N'2022-03-30T00:00:00.000' AS DateTime), 3)
GO
INSERT [dbo].[StepInPlanTbl] ([StepInPlanId], [PlanID], [StepInPlanStartDate], [StepInPlanEndDateToUploadSong], [StepInPlanEndDateToJudg], [StepInPlanEndDateToRating], [StepInPlanPart]) VALUES (12, 6, CAST(N'2022-01-01T00:00:00.000' AS DateTime), CAST(N'2022-01-15T00:00:00.000' AS DateTime), CAST(N'2022-02-01T00:00:00.000' AS DateTime), CAST(N'2022-01-30T00:00:00.000' AS DateTime), 1)
GO
INSERT [dbo].[StepInPlanTbl] ([StepInPlanId], [PlanID], [StepInPlanStartDate], [StepInPlanEndDateToUploadSong], [StepInPlanEndDateToJudg], [StepInPlanEndDateToRating], [StepInPlanPart]) VALUES (13, 6, CAST(N'2022-02-01T00:00:00.000' AS DateTime), CAST(N'2022-02-15T00:00:00.000' AS DateTime), CAST(N'2022-03-01T00:00:00.000' AS DateTime), CAST(N'2022-02-28T00:00:00.000' AS DateTime), 2)
GO
INSERT [dbo].[StepInPlanTbl] ([StepInPlanId], [PlanID], [StepInPlanStartDate], [StepInPlanEndDateToUploadSong], [StepInPlanEndDateToJudg], [StepInPlanEndDateToRating], [StepInPlanPart]) VALUES (14, 6, CAST(N'2022-03-01T00:00:00.000' AS DateTime), CAST(N'2022-03-15T00:00:00.000' AS DateTime), CAST(N'2022-04-01T00:00:00.000' AS DateTime), CAST(N'2022-03-30T00:00:00.000' AS DateTime), 3)
GO
SET IDENTITY_INSERT [dbo].[StepInPlanTbl] OFF
GO
SET IDENTITY_INSERT [dbo].[TypePlanTbl] ON 
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (1, N'שירת ילדים')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (2, N'שירת נוער')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (3, N'חזנות')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (4, N'ילדי פלא')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (5, N'ילדי !פלא')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (6, N'שירת ילד פלא')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (7, N'שירה כללית')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (13, N'שירת מקהלה')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (14, N'שירת מקהלה')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (15, N'שירת מקהלה')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (16, N'שירת מקהלה')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (17, N'שירת מקהלה')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (18, N'שירת מקהלה')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (19, N'שירת מקהלה')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (20, N'שירה ')
GO
INSERT [dbo].[TypePlanTbl] ([TypePlanId], [TypePlanName]) VALUES (21, N'שירה ')
GO
SET IDENTITY_INSERT [dbo].[TypePlanTbl] OFF
GO
SET IDENTITY_INSERT [dbo].[UserTbl] ON 
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (1, N'יואלי', N'דיקמן', N'213544345', N'yd@gmail.com', N'בני ברק', CAST(N'1998-06-20' AS Date), N'זכר', N'חסידי')
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (2, N'אלי', N'קליין', N'324578677', N'yk@gmail.com', N'ירושלים', CAST(N'1995-02-04' AS Date), N'זכר', N'חסידי')
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (3, N'חיים', N'ישראל', N'324332325', N'cy@gmail.com', N'פתח תקווה', CAST(N'1992-06-01' AS Date), N'זכר', N'מזרחי')
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (6, N'נהוראי', N'אריאלי', N'321415555', N'na@gmail.com', N'בית שמש', CAST(N'2000-01-09' AS Date), N'זכר', N'ישראלי')
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (7, N'שמילי', N'אייזנבאך', N'234564563', N'sa@gmail.com', N'ירושלים', CAST(N'2002-08-16' AS Date), N'זכר', N'חסידי')
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (10, N'יהודה', N'מזרחי', N'028548499', N'ym@gmail.com', N'ראש העין', CAST(N'1980-03-04' AS Date), N'זכר', N'מזרחי')
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (11, N'יהונתן', N'פריד', N'343454324', N'yf@gmail.com', N'בני ברק', CAST(N'1999-07-23' AS Date), N'זכר', N'חסידי')
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (13, N'ראובן', N'לוי', N'239857848', N'rl@gmail.com', N'תל אביב', CAST(N'2003-09-12' AS Date), N'זכר', N'ישראלי')
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (14, N'ריקי', N'לוי', N'342563673', N'rlevi@gmail.com', N'מודיעין עילית', CAST(N'2007-05-09' AS Date), N'נקבה', NULL)
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (15, N'גידי', N'אליצור', N'323446565', N'ga@gmail.com', N'מעלה אדומים', CAST(N'2005-04-01' AS Date), N'זכר', NULL)
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (17, N'אסתי', N'כהן', N'023464644', N'ec@gmail.com', N'בית שמש', CAST(N'2003-01-08' AS Date), N'נקבה', NULL)
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (18, N'יעל', N'הלפרין', N'023465454', N'yh@gmail.com', N'חיפה', CAST(N'1992-05-30' AS Date), N'נקבה', NULL)
GO
INSERT [dbo].[UserTbl] ([UserId], [UserFirstName], [UserLastName], [UserPass], [UserEmail], [UserCity], [UserBirthDate], [UserGender], [UserGenre]) VALUES (19, N'יפי', N'אסתי', N'1', N'ey@gmail.com', N'בית שמש', CAST(N'2002-11-26' AS Date), N'נקבה', NULL)
GO
SET IDENTITY_INSERT [dbo].[UserTbl] OFF
GO
ALTER TABLE [dbo].[JudgeTbl]  WITH CHECK ADD  CONSTRAINT [FK_JudgeTbl_UserTbl] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserTbl] ([UserId])
GO
ALTER TABLE [dbo].[JudgeTbl] CHECK CONSTRAINT [FK_JudgeTbl_UserTbl]
GO
ALTER TABLE [dbo].[JudgForPlanTbl]  WITH CHECK ADD  CONSTRAINT [FK_JudgForPlanTbl_PlanTbl] FOREIGN KEY([PlanId])
REFERENCES [dbo].[PlanTbl] ([PlanId])
GO
ALTER TABLE [dbo].[JudgForPlanTbl] CHECK CONSTRAINT [FK_JudgForPlanTbl_PlanTbl]
GO
ALTER TABLE [dbo].[JudgForPlanTbl]  WITH CHECK ADD  CONSTRAINT [FK_JudgForPlanTbl_UserTbl] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserTbl] ([UserId])
GO
ALTER TABLE [dbo].[JudgForPlanTbl] CHECK CONSTRAINT [FK_JudgForPlanTbl_UserTbl]
GO
ALTER TABLE [dbo].[MessageTbl]  WITH CHECK ADD  CONSTRAINT [FK_MessageTbl_UserTbl] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserTbl] ([UserId])
GO
ALTER TABLE [dbo].[MessageTbl] CHECK CONSTRAINT [FK_MessageTbl_UserTbl]
GO
ALTER TABLE [dbo].[PlanTbl]  WITH CHECK ADD  CONSTRAINT [FK_PlanTbl_TypePlanTbl] FOREIGN KEY([TypePlanId])
REFERENCES [dbo].[TypePlanTbl] ([TypePlanId])
GO
ALTER TABLE [dbo].[PlanTbl] CHECK CONSTRAINT [FK_PlanTbl_TypePlanTbl]
GO
ALTER TABLE [dbo].[RatingTbl]  WITH CHECK ADD  CONSTRAINT [FK_RatingTbl_SongTbl] FOREIGN KEY([SongId])
REFERENCES [dbo].[SongTbl] ([SongId])
GO
ALTER TABLE [dbo].[RatingTbl] CHECK CONSTRAINT [FK_RatingTbl_SongTbl]
GO
ALTER TABLE [dbo].[RatingTbl]  WITH CHECK ADD  CONSTRAINT [FK_RatingTbl_UserTbl] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserTbl] ([UserId])
GO
ALTER TABLE [dbo].[RatingTbl] CHECK CONSTRAINT [FK_RatingTbl_UserTbl]
GO
ALTER TABLE [dbo].[SingerTbl]  WITH CHECK ADD  CONSTRAINT [FK_SingerTbl_UserTbl] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserTbl] ([UserId])
GO
ALTER TABLE [dbo].[SingerTbl] CHECK CONSTRAINT [FK_SingerTbl_UserTbl]
GO
ALTER TABLE [dbo].[SongTbl]  WITH CHECK ADD  CONSTRAINT [FK_SongTbl_StepInPlanTbl] FOREIGN KEY([StepInPlanId])
REFERENCES [dbo].[StepInPlanTbl] ([StepInPlanId])
GO
ALTER TABLE [dbo].[SongTbl] CHECK CONSTRAINT [FK_SongTbl_StepInPlanTbl]
GO
ALTER TABLE [dbo].[SongTbl]  WITH CHECK ADD  CONSTRAINT [FK_SongTbl_UserTbl] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserTbl] ([UserId])
GO
ALTER TABLE [dbo].[SongTbl] CHECK CONSTRAINT [FK_SongTbl_UserTbl]
GO
ALTER TABLE [dbo].[StepInPlanTbl]  WITH CHECK ADD  CONSTRAINT [FK_StepInPlanTbl_PlanTbl] FOREIGN KEY([PlanID])
REFERENCES [dbo].[PlanTbl] ([PlanId])
GO
ALTER TABLE [dbo].[StepInPlanTbl] CHECK CONSTRAINT [FK_StepInPlanTbl_PlanTbl]
GO
