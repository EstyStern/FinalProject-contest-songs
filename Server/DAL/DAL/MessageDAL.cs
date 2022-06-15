using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class MessageDAL : IMessageDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public MessageDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל ההודעות 

        public List<MessageTbl> GetAllMessages()
        {
            return _DB.MessageTbls.Include(a => a.User).ToList();
        }

        //פונקציה שמחזירה את כל ההודעות של לקוח מסוים
        public List<MessageTbl> GetAllMessagesByIdUser(int idUser)
        {
            var user = _DB.UserTbls.FirstOrDefault(e => e.UserId == idUser);
            List<MessageTbl> list = user.MessageTbls.ToList();
            return list;
        }
    }
}
