<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_token', 'wants_autosav'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token',
    ];

     /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['gravatar_url'];

    public function getGravatarUrlAttribute()
    {
        $url = '//gravatar.com/avatar/';
        $url .= md5(strtolower($this->email));
        $url .= "?s=80&d=mm&r=g";
        return $url;
    }

    public function boards()
    {
        return $this->hasMany('App\Board');
    }

    public function components()
    {
        return $this->hasMany('App\Component');
    }
}
