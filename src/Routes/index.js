import {
  CreateProject,
  CreateNotifycation,
  CreateEmployee,
  Notifycation,
  Home,
  InfoProject,
  InfoEmployee,
  SignUp,
  SignIn,
  Project,
  Profile,
  Employee,
  ResetPassword,
  MyProject,
} from "../Page/index";
import MyProjectEployee from "../Page/home/MyProjectEmployee";
import ContainerProject from "../Page/Container.js/ContainerProject";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  EyeOutlined,
} from "@ant-design/icons";
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
    to: `/client-project-manage/project`,
    role: [1, 2],
    icon: <EyeOutlined />,
    component: <ContainerProject />,
  },
  // {
  //   name: "Tạo Dự án",
  //   to: `/client-project-manage/insert/project`,
  //   role:[1,2],
  //   icon: <EyeOutlined />,
  //   component: <CreateProject />,
  // },
  {
    name: "Nhân Viên",
    to: `/client-project-manage/employee`,
    role: [1, 2],
    icon: <EyeOutlined />,
    component: <Employee />,
  },
  //  {
  //    name: "Tạo Nhân Viên",
  //    to: `/client-project-manage/insert/employee`,
  //    role:[1,2],
  //    icon: <EyeOutlined />,
  //    component: <CreateEmployee />,
  //  },
  {
    name: "Dự án của tôi",
    to: `/client-project-manage/myprojectmanager`,
    role: [3],
    icon: <EyeOutlined />,
    component: <MyProject />,
  },
  {
    name: "Dự án của tôi",
    to: `/client-project-manage/myprojectemployee`,
    role: [4],
    icon: <EyeOutlined />,
    component: <MyProjectEployee />,
  },
  {
    name: "Tạo Thông Báo",
    to: `/client-project-manage/insert/notification`,
    role: [1, 2],
    icon: <EyeOutlined />,
    component: <CreateNotifycation />,
  },
  {
    name: " Thông Báo",
    to: `/client-project-manage/notification`,
    role: [3, 4],
    icon: <EyeOutlined />,
    component: <Notifycation />,
  },
  {
    name: " Thông Tin Cá Nhân",
    role: [1, 2, 3, 4],
    to: `/client-project-manage/profile`,
    icon: <EyeOutlined />,
    component: <Profile />,
  },
];

export const authRoutes = {
  path: "/client-project-manage/auth",
  name: "Auth",
  icon: <EyeOutlined />,
  children: [
    {
      path: "/client-project-manage/auth/sign-in",
      name: "Sign In",
      component: <SignIn />,
    },
    {
      path: "/client-project-manage/auth/sign-up",
      name: "Sign Up",
      component: <SignUp />,
    },

    {
      path: "/client-project-manage/auth/reset-password",
      name: "Reset Password",
      component: <ResetPassword />,
    },
  ],
};
