
import {
    CreateProject, CreateNotifycation, CreateEmployee, Notifycation, Home, InfoProject, InfoEmployee
    , SignUp, SignIn, Project, Profile, Employee,ResetPassword,MyProject
  } from "../Page/index"
import MyProjectEployee from "../Page/home/MyProjectEmployee";
import ContainerProject from "../Page/Container.js/ContainerProject";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    EyeOutlined,
  } from '@ant-design/icons';
export const menuItems = [
    // {
    //   name: "Trang Chủ",
    //   to: "/homepage",
    //   icon: <HomeOutlined />,
    //   component: <Home/>,
    //   role:[1,2]
    // },
    {
      name: "Dự án",
      to: `/project`,
      role:[1,2],
      icon: <EyeOutlined />,
      component: <ContainerProject />,
    },
    // {
    //   name: "Tạo Dự án",
    //   to: `/insert/project`,
    //   role:[1,2],
    //   icon: <EyeOutlined />,
    //   component: <CreateProject />,
    // },
    {
      name: "Nhân Viên",
      to: `/employee`,
      role:[1,2],
      icon: <EyeOutlined />,
      component: <Employee />,
    },
    //  {
    //    name: "Tạo Nhân Viên",
    //    to: `/insert/employee`,
    //    role:[1,2],
    //    icon: <EyeOutlined />,
    //    component: <CreateEmployee />,
    //  },
    {
      name: "Dự án của tôi",
      to: `/myprojectmanager`,
      role:[3],
      icon: <EyeOutlined />,
      component: <MyProject/>,
    },
    {
      name: "Dự án của tôi",
      to: `/myprojectemployee`,
      role:[4],
      icon: <EyeOutlined />,
      component: <MyProjectEployee/>,
    },
     {
      name: "Tạo Thông Báo",
      to: `/insert/notification`,
      role:[1,2],
      icon: <EyeOutlined />,
      component: <CreateNotifycation />
    },
    {
      name: " Thông Báo",
      to: `/notification`,
      role:[3,4],
      icon: <EyeOutlined />,
      component: <Notifycation />
    },
    {
      name: " Thông Tin Cá Nhân",
      role:[1,2,3,4],
      to: `/profile`,
      icon: <EyeOutlined />,
      component: <Profile />
    },
  ];

 export const authRoutes = {
    path: "/auth",
    name: "Auth",
    icon: <EyeOutlined />,
    children: [
        {
            path: "/auth/sign-in",
            name: "Sign In",
            component:<SignIn/>
        },
        {
            path: "/auth/sign-up",
            name: "Sign Up",
            component: <SignUp/>
        },
  
        {
            path: "/auth/reset-password",
            name: "Reset Password",
            component: <ResetPassword/>
        },
       
    ]
};