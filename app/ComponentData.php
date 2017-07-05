<?php

namespace App;

use Moloquent;

class ComponentData extends Moloquent
{
    protected $connection = 'mongodb';

    public function metadata()
    {
        return $this->belongsTo('App\Component');
    }
}
