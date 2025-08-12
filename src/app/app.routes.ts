import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent),
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'user-management',
                loadComponent: () => import('./components/user-management/user-management.component').then(m => m.UserManagementComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'view-user',
                loadComponent: () => import('./components/user-management/view-user/view-user.component').then(m => m.ViewUserComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'seller-management',
                loadComponent: () => import('./components/seller-management/seller-management.component').then(m => m.SellerManagementComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'view-seller',
                loadComponent: () => import('./components/seller-management/view-seller/view-seller.component').then(m => m.ViewSellerComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'seller-payout',
                loadComponent: () => import('./components/seller-payout/seller-payout.component').then(m => m.SellerPayoutComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'order-management',
                loadComponent: () => import('./components/order-management/order-management.component').then(m => m.OrderManagementComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'view-order',
                loadComponent: () => import('./components/order-management/view-order/view-order.component').then(m => m.ViewOrderComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'product-management',
                loadComponent: () => import('./components/product-management/product-management.component').then(m => m.ProductManagementComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'view-product',
                loadComponent: () => import('./components/product-management/view-product/view-product.component').then(m => m.ViewProductComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'post-management',
                loadComponent: () => import('./components/post-management/post-management.component').then(m => m.PostManagementComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'view-post',
                loadComponent: () => import('./components/post-management/view-post/view-post.component').then(m => m.ViewPostComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'sweepstakes',
                loadComponent: () => import('./components/sweepstakes/sweepstakes.component').then(m => m.SweepstakesComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'view-sweepstakes',
                loadComponent: () => import('./components/sweepstakes/view-sweepstakes/view-sweepstakes.component').then(m => m.ViewSweepstakesComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'add-sweepstakes',
                loadComponent: () => import('./components/sweepstakes/add-sweepstakes/add-sweepstakes.component').then(m => m.AddSweepstakesComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'rating-reviews',
                loadComponent: () => import('./components/rating-reviews/rating-reviews.component').then(m => m.RatingReviewsComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'group-management',
                loadComponent: () => import('./components/group-management/group-management.component').then(m => m.GroupManagementComponent)
                // canActivate: [authGuard]
            },
            {
                path: 'revenue',
                loadComponent: () => import('./components/revenue/revenue.component').then(m => m.RevenueComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'marketplace-sales',
                loadComponent: () => import('./components/marketplace-sales/marketplace-sales.component').then(m => m.MarketplaceSalesComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'support',
                loadComponent: () => import('./components/support/support.component').then(m => m.SupportComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'view-support',
                loadComponent: () => import('./components/support/view-support/view-support.component').then(m => m.ViewSupportComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'manage-legal-pages',
                loadComponent: () => import('./components/manage-legal-pages/manage-legal-pages.component').then(m => m.ManageLegalPagesComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'terms-conditions',
                loadComponent: () => import('./components/manage-legal-pages/terms-conditions/terms-conditions.component').then(m => m.TermsConditionsComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'privacy-policy',
                loadComponent: () => import('./components/manage-legal-pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'my-profile',
                loadComponent: () => import('./components/my-profile/my-profile.component').then(m => m.MyProfileComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'change-password',
                loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent),
                // canActivate: [authGuard]
            },
            {
                path: 'notifications',
                loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent),
                // canActivate: [authGuard]
            },
        ]
    }

];
