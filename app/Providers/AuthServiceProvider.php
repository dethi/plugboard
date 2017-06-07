<?php

namespace App\Providers;

use App\Services\Auth\CustomTokenGuard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Auth::extend('custom-token', function ($app, $name, array $config) {
            return new CustomTokenGuard(
                Auth::createUserProvider($config['provider']),
                $app->make('request'));
        });
    }
}
