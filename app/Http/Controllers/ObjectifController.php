<?php

namespace App\Http\Controllers;

use App\Objectif;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ObjectifController extends Controller
{
     public function index()
    {
        return DB::table('objectifs')
                    ->leftJoin('completed_objectifs', 'objectifs.id', '=', 'completed_objectifs.objectif_id')
                    ->select('objectifs.*' , 'completed_objectifs.score as score')
                    ->get();
    }
}
