using System;
using System.Linq;
using DAL.Models;

namespace DTO
{
    public class Auto:AutoMapper.Profile
    {
        public Auto()
        {
            CreateMap<UserTbl, UserDTO>();
            CreateMap<UserDTO,UserTbl>();

            CreateMap<TypePlanTbl, TypePlanDTO>();
            CreateMap<TypePlanDTO, TypePlanTbl>();

            CreateMap<StepInPlanTbl, StepInPlanDTO>()
                .ForMember(s => s.PlanName, j => j.MapFrom(d => d.Plan.PlanName));
            CreateMap<StepInPlanDTO, StepInPlanTbl>();

            CreateMap<SongTbl, SongDTO>()
                .ForMember(s => s.UserFirstName, j => j.MapFrom(d => d.User.UserFirstName))
                .ForMember(s => s.UserLastName, j => j.MapFrom(d => d.User.UserLastName))
                .ForMember(s => s.SingerImg, j => j.MapFrom(d => d.User.SingerTbls.ToArray()[0].SingerImg))
                .ForMember(s => s.UserGenre, j => j.MapFrom(d => d.User.UserGenre));
            CreateMap<SongDTO, SongTbl>();

            CreateMap<SingerTbl, SingerDTO>()
                .ForMember(s => s.UserFirstName, j => j.MapFrom(d => d.User.UserFirstName))
                .ForMember(s => s.UserLastName, j => j.MapFrom(d => d.User.UserLastName))
                .ForMember(s => s.UserGenre, j => j.MapFrom(d => d.User.UserGenre));
            CreateMap<SingerDTO, SingerTbl>();

            CreateMap<RatingTbl, RatingDTO>()
                .ForMember(s => s.SongName, j => j.MapFrom(d => d.Song.SongName))
                .ForMember(s => s.UserFirstName, j => j.MapFrom(d => d.User.UserFirstName))
                .ForMember(s => s.UserLastName, j => j.MapFrom(d => d.User.UserLastName));
            CreateMap<RatingDTO, RatingTbl>();

            CreateMap<PlanTbl, PlanDTO>()
                .ForMember(s => s.TypePlanName, j => j.MapFrom(d => d.TypePlan.TypePlanName));
            CreateMap<PlanDTO, PlanTbl>();

            CreateMap<MessageTbl, MessageDTO>()
                .ForMember(s => s.UserFirstName, j => j.MapFrom(d => d.User.UserFirstName))
                .ForMember(s => s.UserLastName, j => j.MapFrom(d => d.User.UserLastName));
            CreateMap<MessageDTO, MessageTbl>();

            CreateMap<JudgForPlanTbl, JudgForPlanDTO>()
                .ForMember(s => s.UserFirstName, j => j.MapFrom(d => d.User.UserFirstName))
                .ForMember(s => s.UserLastName, j => j.MapFrom(d => d.User.UserLastName));
            CreateMap<JudgForPlanDTO, JudgForPlanTbl>();

            CreateMap<JudgeTbl, JudgeDTO>()
                .ForMember(s => s.UserFirstName, j => j.MapFrom(d => d.User.UserFirstName))
                .ForMember(s => s.UserLastName, j => j.MapFrom(d => d.User.UserLastName));
            CreateMap<JudgeDTO, JudgeTbl>();
        }
    }
}
