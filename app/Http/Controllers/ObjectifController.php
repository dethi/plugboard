<?php

namespace App\Http\Controllers;

use App\Objectif;
use Illuminate\Http\Request;

class ObjectifController extends Controller
{
     public function index()
    {
        return Objectif::all();
    }
}
