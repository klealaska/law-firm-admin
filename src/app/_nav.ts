import { UserRoleEnum } from './enums/userRoleEnum';
interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}
interface NavUserRole {
  [propName: string]: any;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
  role?: NavUserRole;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    role: [UserRoleEnum.Admin, UserRoleEnum.Editor, UserRoleEnum.Approver]
  },
  {
    title: true,
    name: 'Page Configurations',
    role: [UserRoleEnum.Admin, UserRoleEnum.Editor, UserRoleEnum.Approver]
  },
  {
    name: 'Law',
    url: '/laws',
    icon: 'fa fa-bars',
    class: 'white',
    role: [UserRoleEnum.Admin, UserRoleEnum.Editor, UserRoleEnum.Approver],
    children: [
      {
        name: 'Laws Groups',
        url: '/lawCategory',
        icon: 'fa fa-folder',
        role: [UserRoleEnum.Editor],
      },
      {
        name: 'Law Sections',
        url: '/laws',
        icon: 'fa fa-balance-scale',
        role: [UserRoleEnum.Admin, UserRoleEnum.Editor],
      },
      {
        name: 'Law Related Links',
        url: '/lawRelatedLinks',
        icon: 'fa fa-link',
        role: [UserRoleEnum.Editor],
      },
      {
        name: 'Law Article Versions',
        url: '/lawArticleVersions',
        icon: 'fa fa-code-fork',
        role: [UserRoleEnum.Editor],
      },
      {
        name: 'Law Hyperlinks',
        url: '/hyperlinks',
        icon: 'fa fa-external-link',
        role: [UserRoleEnum.Editor],
      },
      {
        name: 'Law Article History',
        url: '/lawArticleHistory',
        icon: 'fa fa-history',
        role: [UserRoleEnum.Editor],
      }
    ]
  },
  {
    name: 'Tax News',
    url: '/taxNews',
    class: 'white',
    icon: 'fa fa-file',
    role: [UserRoleEnum.Approver, UserRoleEnum.Admin, UserRoleEnum.Editor]
  },
  {
    name: 'Blog Posts',
    url: '/blogPost',
    class: 'white',
    icon: 'fa fa-file-image-o',
    role: [UserRoleEnum.Editor]
  },
  {
    name: 'Important Tax Date',
    url: '/importantTaxDate',
    class: 'white',
    icon: 'fa fa-calendar-check-o',
    role: [UserRoleEnum.Approver, UserRoleEnum.Admin]
  },
  {
    name: 'Homepage Configs',
    url: '/homepageLawConfiguration',
    icon: 'fa fa-home',
    class: 'white',
    role: [UserRoleEnum.Admin]
  },
  {
    name: 'Approver',
    url: '/lawApproval',
    class: 'text-capitalize white',
    icon: 'fa fa-bars',
    role: [UserRoleEnum.Approver],
    children: [
      {
        name: 'Law Approval',
        url: '/lawApproval',
        icon: 'fa fa-cogs'
      },
      {
        name: 'Blog Approval',
        url: '/blogPostApproval',
        icon: 'fa fa-cogs'
      },
    ]
  },
  {
    name: 'Tags',
    url: '/tag',
    class: 'white',
    icon: 'fa fa-tags',
    role: [UserRoleEnum.Admin, UserRoleEnum.Approver]
  },
  {
    title: true,
    name: 'System Configurations',
    role: [UserRoleEnum.Admin]
  },
  {
    name: 'User',
    url: '/user',
    icon: 'fa fa-bars',
    class: 'white',
    role: [UserRoleEnum.Admin],
    children: [
      {
        name: 'Users',
        url: '/user',
        icon: 'fa fa-user'
      },
      {
        name: 'User Groups',
        url: '/userGroups',
        icon: 'fa fa-users'
      },
      {
        name: 'User Categories',
        url: '/userCategory',
        icon: 'fa fa-users'
      },
      {
        name: 'User Roles',
        url: '/role',
        icon: 'fa fa-id-badge'
      },
    ]
  },
  {
    name: 'Notifications',
    url: '/notification',
    class: 'white',
    icon: 'fa fa-bell',
    role: [UserRoleEnum.Admin]
  }
  // {
  //   name: 'Editor',
  //   url: '/lawAmendment',
  //   icon: 'fa fa-bars',
  //   role: [UserRoleEnum.Editor],
  //   children: [
  //     {
  //       name: 'Editor',
  //       url: '/lawAmendment',
  //       icon: 'fa fa-edit',
  //     },
  //     {
  //       name: 'Editors',
  //       url: '/editor',
  //       icon: 'fa fa-edit'
  //     },
  //   ]
  // },
];
