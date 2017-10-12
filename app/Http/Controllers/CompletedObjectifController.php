<?php

namespace App\Http\Controllers;

use App\Objectif;
use App\CompletedObjectif;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CompletedObjectifController extends Controller
{
    public function setObjectifAsCompleted(Request $request, Objectif $objectif)
    {
        //
        $completedObjectif = new CompletedObjectif();
       // dd($completedObjectif);

        $completedObjectif->user_id = Auth::user()->id;
        $completedObjectif->objectif_id = $objectif->id;
        $completedObjectif->score = 5;
        $completedObjectif->save();
        //return $completedObjectif;
    }
}
