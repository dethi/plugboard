<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GravatarController extends Controller
{
  /**
  * Get either a Gravatar URL or complete image tag for a specified email address.
  *
  * @param string $email The email address
  * @param string $s Size in pixels, defaults to 80px [ 1 - 2048 ]
  * @param string $d Default imageset to use [ 404 | mm | identicon | monsterid | wavatar ]
  * @param string $r Maximum rating (inclusive) [ g | pg | r | x ]
  * @return String containing either just a URL or a complete image tag
  * @source https://gravatar.com/site/implement/images/php/
  */
  static function get( $email, $s = 80, $d = 'mm', $r = 'g') {
    $url = 'https://www.gravatar.com/avatar/';
    $url .= md5( strtolower( trim( $email ) ) );
    $url .= "?s=$s&d=$d&r=$r";
    return $url;
  }
}
