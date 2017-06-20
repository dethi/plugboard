<?php

namespace App;

use Moloquent;

class BoardData extends Moloquent
{
    protected $connection = 'mongodb';

    public function metadata()
    {
        return $this->belongsTo('App\Board');
    }
}
