using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using BLL;
using DAL;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors(opti => opti.AddPolicy("AllowAll", p => {
                p.AllowAnyOrigin();
                p.AllowAnyMethod();
                p.AllowAnyHeader();
            }
            ));
            //קשרנו בין הממשק של שכבת ה-DAL לבין המחלקה
            //כנ"ל כלפי שכבת ה-BLL

            services.AddScoped(typeof(ISingerDAL), typeof(SingerDAL));
            services.AddScoped(typeof(ISingerBLL), typeof(SingerBLL));

            services.AddScoped(typeof(IRatingDAL), typeof(RatingDAL));
            services.AddScoped(typeof(IRatingBLL), typeof(RatingBLL));

            services.AddScoped(typeof(ITypePlanDAL), typeof(TypePlanDAL));
            services.AddScoped(typeof(ITypePlanBLL), typeof(TypePlanBLL));

            services.AddScoped(typeof(IStepInPlanDAL), typeof(StepInPlanDAL));
            services.AddScoped(typeof(IStepInPlanBLL), typeof(StepInPlanBLL));

            services.AddScoped(typeof(ISongDAL), typeof(SongDAL));
            services.AddScoped(typeof(ISongBLL), typeof(SongBLL));

            services.AddScoped(typeof(IUserDAL), typeof(UserDAL));
            services.AddScoped(typeof(IUserBLL), typeof(UserBLL));

            services.AddScoped(typeof(IJudgeDAL), typeof(JudgeDAL));
            services.AddScoped(typeof(IJudgeBLL), typeof(JudgeBLL));
          
            services.AddScoped<IJudgForPlanDAL, JudgForPlanDAL>();
            services.AddScoped(typeof(IJudgForPlanBLL), typeof(JudgForPlanBLL));

            services.AddScoped(typeof(IPlanDAL), typeof(PlanDAL));
            services.AddScoped(typeof(IPlanBLL), typeof(PlanBLL));

            services.AddScoped(typeof(IMessageDAL), typeof(MessageDAL));
            services.AddScoped(typeof(IMessageBLL), typeof(MessageBLL));


            //services.AddDbContext<DB_projectContext>(option => option.UseSqlServer("Server=kitotsrv\\sql;Database=DB_project;Trusted_Connection=True;"));
            services.AddDbContext<DB_projectContext>(option => option.UseSqlServer("Server=DESKTOP-42NCSL4\\SQLEXPRESS;Database=DB_project;Trusted_Connection=True;"));
           // services.AddDbContext<DB_projectContext>(option => option.UseSqlServer("Server=LAPTOP-L37SNTD8;Database=DB_project1;Trusted_Connection=True;"));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors("AllowAll");

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
