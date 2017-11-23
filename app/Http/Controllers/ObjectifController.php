<?php

namespace App\Http\Controllers;

use App\Objectif;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ObjectifController extends Controller
{
     public function index()
    {
        return DB::table('objectifs')->get();
    }
}
