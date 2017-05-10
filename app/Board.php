<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\HybridRelations;

class Board extends Model
{
    use HybridRelations;

    protected $connection = 'mysql';

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function versions()
    {
        return $this->hasMany('App\BoardData');
    }
}
