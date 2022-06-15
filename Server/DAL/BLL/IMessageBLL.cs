using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface IMessageBLL
    {
        //GetAllMessages
        //פונקציה שמחזירה את כל ההודעות
        List<MessageDTO> GetAllMessages();
        //פונקציה שמחזירה את כל ההודעות של לקוח מסוים
        List<MessageDTO> GetAllMessagesByIdUser(int idUser);
    }
}
