<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Jenssegers\Mongodb\Eloquent\HybridRelations;

class Component extends Model
{
    use HybridRelations;

    protected $connection = 'mysql';

    protected $hidden = [
        'last_version_id', 'preview_path'
    ];

    protected $appends = ['preview_url'];

    public function getPreviewUrlAttribute()
    {
        return Storage::url($this->preview_path);
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function versions()
    {
        return $this->hasMany('App\ComponentData');
    }
}
