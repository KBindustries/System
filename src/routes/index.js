import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Courses = lazy(() => import("../pages/CourseTable"));
const Students = lazy(() => import("../pages/StudentTable"));
const Teachers = lazy(() => import("../pages/TeachersTable"));
const Attendance = lazy(() => import("../pages/AttendanceTable"));
const Announcement = lazy(() => import("../pages/AnnouncementTable"));
const Request = lazy(() => import("../pages/StudentRequestTable"));
const Incident = lazy(() => import("../pages/IncidentReport"));
const Timetable = lazy(() => import("../pages/TimetableTable"));
const Forms = lazy(() => import("../pages/Forms"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/courses",
    component: Courses,
  },
  {
    path: "/students",
    component: Students,
  },
  {
    path: "/teachers",
    component: Teachers,
  },
  {
    path: "/attendances",
    component: Attendance,
  },
  {
    path: "/announcements",
    component: Announcement,
  },
  {
    path: "/requests",
    component: Request,
  },
  {
    path: "/incidents",
    component: Incident,
  },
  {
    path: "/timetable",
    component: Timetable,
  },

  {
    path: "/forms",
    component: Forms,
  },
  {
    path: "/cards",
    component: Cards,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/buttons",
    component: Buttons,
  },
  {
    path: "/modals",
    component: Modals,
  },
  {
    path: "/tables",
    component: Tables,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
