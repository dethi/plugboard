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
        'name', 'email', 'password',
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
    * Get user's Gravatar URL.
    *
    * @param string $size Size in pixels, defaults to 80px [ 1 - 2048 ]
    * @param string $imageset Default imageset to use [ 404 | mm | identicon | monsterid | wavatar ]
    * @param string $rating Maximum rating (inclusive) [ g | pg | r | x ]
    * @return String containing either just a URL or a complete image tag
    * @source https://gravatar.com/site/implement/images/php/
    */
    public function getGravatarUrl(int $size = 80, string $imageset = 'mm', string $rating = 'g')
    {
        $url = '//gravatar.com/avatar/';
        $url .= md5( strtolower( trim( $this->email ) ) );
        $url .= "?s=$size&d=$imageset&r=$rating";
        return $url;
    }
}
