import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
        title: 'Login',
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
        pathMatch: 'full',
        title: 'Forgot Password',
    },
    {
        path: 'home',
        loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent),
        // canActivate: [authGuard]
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
                title: 'Dashboard',
                // canActivate: [authGuard]
            },
            {
                path: 'user-management',
                loadComponent: () => import('./components/user-management/user-management.component').then(m => m.UserManagementComponent),
                title: 'User-Management',
                // canActivate: [authGuard]
            },
            {
                path: 'view-user',
                loadComponent: () => import('./components/user-management/view-user/view-user.component').then(m => m.ViewUserComponent),
                title: 'View-User',
                // canActivate: [authGuard]
            },
            {
                path: 'seller-management',
                loadComponent: () => import('./components/seller-management/seller-management.component').then(m => m.SellerManagementComponent),
                title: 'Seller-Management',
                // canActivate: [authGuard]
            },
            {
                path: 'view-seller',
                loadComponent: () => import('./components/seller-management/view-seller/view-seller.component').then(m => m.ViewSellerComponent),
                title: 'View-Seller',
                // canActivate: [authGuard]
            },
            {
                path: 'seller-payout',
                loadComponent: () => import('./components/seller-payout/seller-payout.component').then(m => m.SellerPayoutComponent),
                title: 'Seller-Payout',
                // canActivate: [authGuard]
            },

            {
                path: 'order-management',
                loadComponent: () => import('./components/order-management/order-management.component').then(m => m.OrderManagementComponent),
                title: 'Seller-Management',
                // canActivate: [authGuard]
            },
            {
                path: 'view-order',
                loadComponent: () => import('./components/order-management/view-order/view-order.component').then(m => m.ViewOrderComponent),
                title: 'View-Order',
                // canActivate: [authGuard]
            },
            {
                path: 'product-management',
                loadComponent: () => import('./components/product-management/product-management.component').then(m => m.ProductManagementComponent),
                title: 'Seller-Management',
                // canActivate: [authGuard]
            },
            {
                path: 'view-product',
                loadComponent: () => import('./components/product-management/view-product/view-product.component').then(m => m.ViewProductComponent),
                title: 'view-product',
                // canActivate: [authGuard]
            },
            {
                path: 'post-management',
                loadComponent: () => import('./components/post-management/post-management.component').then(m => m.PostManagementComponent),
                title: 'post-management',
                // canActivate: [authGuard]
            },
            {
                path: 'view-post',
                loadComponent: () => import('./components/post-management/view-post/view-post.component').then(m => m.ViewPostComponent),
                title: 'view-post',
                // canActivate: [authGuard]
            },
            {
                path: 'sweepstakes',
                loadComponent: () => import('./components/sweepstakes/sweepstakes.component').then(m => m.SweepstakesComponent),
                title: 'sweepstakes',
                // canActivate: [authGuard]
            },
            {
                path: 'view-sweepstakes',
                loadComponent: () => import('./components/sweepstakes/view-sweepstakes/view-sweepstakes.component').then(m => m.ViewSweepstakesComponent),
                title: 'view-sweepstakes',
                // canActivate: [authGuard]
            },
            {
                path: 'add-sweepstakes',
                loadComponent: () => import('./components/sweepstakes/add-sweepstakes/add-sweepstakes.component').then(m => m.AddSweepstakesComponent),
                title: 'add-sweepstakes',
                // canActivate: [authGuard]
            },
            {
                path: 'rating-reviews',
                loadComponent: () => import('./components/rating-reviews/rating-reviews.component').then(m => m.RatingReviewsComponent),
                title: 'rating-reviews',
                // canActivate: [authGuard]
            },
            {
                path: 'group-management',
                loadComponent: () => import('./components/group-management/group-management.component').then(m => m.GroupManagementComponent),
                title: 'group-management',
                // canActivate: [authGuard]
            },
            {
                path: 'revenue',
                loadComponent: () => import('./components/revenue/revenue.component').then(m => m.RevenueComponent),
                title: 'revenue',
                // canActivate: [authGuard]
            },
            {
                path: 'marketplace-sales',
                loadComponent: () => import('./components/marketplace-sales/marketplace-sales.component').then(m => m.MarketplaceSalesComponent),
                title: 'revenue',
                // canActivate: [authGuard]
            },
            {
                path: 'support',
                loadComponent: () => import('./components/support/support.component').then(m => m.SupportComponent),
                title: 'support',
                // canActivate: [authGuard]
            },
            {
                path: 'view-support',
                loadComponent: () => import('./components/support/view-support/view-support.component').then(m => m.ViewSupportComponent),
                title: 'view-support',
                // canActivate: [authGuard]
            },
            {
                path: 'manage-legal-pages',
                loadComponent: () => import('./components/manage-legal-pages/manage-legal-pages.component').then(m => m.ManageLegalPagesComponent),
                title: 'manage-legal-pages',
                // canActivate: [authGuard]
            },
            {
                path: 'terms-conditions',
                loadComponent: () => import('./components/manage-legal-pages/terms-conditions/terms-conditions.component').then(m => m.TermsConditionsComponent),
                title: 'terms-conditions',
                // canActivate: [authGuard]
            },
            {
                path: 'privacy-policy',
                loadComponent: () => import('./components/manage-legal-pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
                title: 'privacy-policy',
                // canActivate: [authGuard]
            },
            {
                path: 'my-profile',
                loadComponent: () => import('./components/my-profile/my-profile.component').then(m => m.MyProfileComponent),
                title: 'my-profile',
                // canActivate: [authGuard]
            },
            {
                path: 'change-password',
                loadComponent: () => import('./components/change-password/change-password.component').then(m => m.ChangePasswordComponent),
                title: 'change-password',
                // canActivate: [authGuard]
            },
            {
                path: 'notifications',
                loadComponent: () => import('./components/notifications/notifications.component').then(m => m.NotificationsComponent),
                title: 'notifications',
                // canActivate: [authGuard]
            },
        ]
    }

];
