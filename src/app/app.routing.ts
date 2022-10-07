import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './services/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tag',
        loadChildren: () => import('./views/tag/tag.module').then(m => m.TagModule),
        data: { title: 'Tags' },
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
        data: { title: 'Users' },
        canActivate: [AuthGuard]
      },
      {
        path: 'role',
        loadChildren: () => import('./views/role/role.module').then(m => m.RoleModule),
        data: { title: 'Roles' },
        canActivate: [AuthGuard]
      },
      {
        path: 'userGroups',
        loadChildren: () => import('./views/user-groups/user-groups.module').then(m => m.UserGroupsModule),
        data: { title: 'User Groups' },
        canActivate: [AuthGuard]
      },
      {
        path: 'userCategory',
        loadChildren: () => import('./views/user-category/user-category.module').then(m => m.UserCategoryModule),
        data: { title: 'User Categories' },
        canActivate: [AuthGuard]
      },
      {
        path: 'userProfile',
        loadChildren: () => import('./views/user-profile/user-profile.module').then(m => m.UserProfileModule),
        data: { title: 'Profile' },
        canActivate: [AuthGuard]
      },
      {
        path: 'lawCategory',
        loadChildren: () => import('./views/law-category/law-category.module').then(m => m.LawCategoryModule),
        data: { title: 'Law Groups' },
        canActivate: [AuthGuard]
      },
      {
        path: 'taxNews',
        loadChildren: () => import('./views/tax-news/tax-news.module').then(m => m.TaxNewsModule),
        data: { title: 'Category' },
        canActivate: [AuthGuard]
      },
      {
        path: 'blogPost',
        loadChildren: () => import('./views/blog-post/blog-post.module').then(m => m.BlogPostModule),
        data: { title: 'Blog Posts' },
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: () => import('./views/notification/notification.module').then(m => m.NotificationModule),
        data: { title: 'Notification' },
        canActivate: [AuthGuard]
      },
      {
        path: 'laws',
        loadChildren: () => import('./views/laws/laws.module').then(m => m.LawsModule),
        data: { title: 'Laws' },
        canActivate: [AuthGuard]
      },
      {
        path: 'approveLaw',
        loadChildren: () => import('./views/approve-edit-law-view/approve-edit-law-view.module').then(m => m.ApproveEditLawViewModule),
        data: { title: 'Approve Law' },
        canActivate: [AuthGuard]
      },
      {
        path: 'homepageLawConfiguration',
        loadChildren: () => import('./views/homepage-law-configuration/homepage-law-configuration.module').then(m => m.HomepageLawConfigurationModule),
        data: { title: 'Homepage Configuration' },
        canActivate: [AuthGuard]
      },
      {
        path: 'importantTaxDate',
        loadChildren: () => import('./views/important-tax-date/important-tax-date.module').then(m => m.ImportantTaxDateModule),
        data: { title: 'Important Tax Date' },
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'lawAmendments',
      //   loadChildren: () => import('./views/law-amendments/law-amendments.module').then(m => m.LawAmendmentsModule),
      //   data: { title: 'Law Amendments' },
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'lawApproval',
        loadChildren: () => import('./views/law-approval/law-approval.module').then(m => m.LawApprovalModule),
        data: { title: 'Law Approval' },
        canActivate: [AuthGuard]
      },
      {
        path: 'blogPostApproval',
        loadChildren: () => import('./views/publish-blog-post/publish-blog-post.module').then(m => m.PublishBlogPostModule),
        data: { title: 'Blog Post Approval' },
        canActivate: [AuthGuard]
      },
      {
        path: 'approveBlogPost',
        loadChildren: () => import('./views/approve-edit-blog-post-view/approve-edit-blog-post-view.module').then(m => m.ApproveEditBlogPostViewModule),
        data: { title: 'Blog Post Approval' },
        canActivate: [AuthGuard]
      },
      {
        path: 'lawRelatedLinks',
        loadChildren: () => import('./views/law-article-related-links/law-article-related-links.module').then(m => m.LawArticleRelatedLinksModule),
        data: { title: 'Law Article Related Links' },
        canActivate: [AuthGuard]
      },
      {
        path: 'lawArticleVersions',
        loadChildren: () => import('./views/law-article-version/law-article-version.module').then(m => m.LawArticleVersionModule),
        data: { title: 'Law Article Versions' },
        canActivate: [AuthGuard]
      },
      {
        path: 'hyperlinks',
        loadChildren: () => import('./views/hyperlinks/hyperlinks.module').then(m => m.HyperlinksModule),
        data: { title: 'Hyper Links' },
        canActivate: [AuthGuard]
      },
      {
        path: 'lawSection',
        loadChildren: () => import('./views/add-edit-law-section/add-edit-law-section.module').then(m => m.AddEditLawSectionModule),
        data: { title: 'Law Section' },
        canActivate: [AuthGuard]
      },
      {
        path: 'lawInAmendment',
        loadChildren: () => import('./views/law-in-amendment/law-in-amendment.module').then(m => m.LawInAmendmentModule),
        data: { title: 'Law Amendment' },
        canActivate: [AuthGuard]
      },
      {
        path: 'lawArticleHistory',
        loadChildren: () => import('./views/law-article-history/law-article-history.module').then(m => m.LawArticleHistoryModule),
        data: { title: 'Law Article History' },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
