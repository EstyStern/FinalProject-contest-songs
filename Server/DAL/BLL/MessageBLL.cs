using System;
using System.Collections.Generic;
using System.Text;
using DTO;
using AutoMapper;
using DAL;
using DAL.Models;

namespace BLL
{
    public class MessageBLL:IMessageBLL
    {
        //DALמופע מסוג ה
        IMessageDAL _MessageDAL;
        //IMapper מסוג ה
        IMapper _imapper;

        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלה
        public MessageBLL(IMessageDAL MessageDAL)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _MessageDAL = MessageDAL;
        }

        //פונקצייה שמחזירה רשימה של הודעות  
        public List<MessageDTO> GetAllMessages()
        {
            List<MessageTbl> listMessage = _MessageDAL.GetAllMessages();
            try
            {
                return _imapper.Map<List<MessageTbl>, List<MessageDTO>>(listMessage);
            }
            catch
            {
                throw new Exception("not succeed GetAllMessages!!");
            }
        }

        //פונקציה שמחזירה את כל ההודעות של לקוח מסוים
        public List<MessageDTO> GetAllMessagesByIdUser(int idUser)
        {
            List<MessageTbl> listMessages = _MessageDAL.GetAllMessagesByIdUser(idUser);
            try
            {
                return _imapper.Map<List<MessageTbl>, List<MessageDTO>>(listMessages);
            }
            catch
            {
                throw new Exception("not succeed GetAllMessagesByIdUser!!");
            }
        }
    }
}
