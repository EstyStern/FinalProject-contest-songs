using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL
{
    public interface IMessageDAL
    {
        //פונקציה שמחזירה את כל ההודעות 
        List<MessageTbl> GetAllMessages();
        //פונקציה שמחזירה את כל ההודעות של לקוח מסוים
        List<MessageTbl> GetAllMessagesByIdUser(int idUser);
    }
}
