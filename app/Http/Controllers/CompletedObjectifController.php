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
        $completedObjectif = CompletedObjectif::where('user_id', '=', Auth::user()->id)
                                ->where('objectif_id', '=', $objectif->id)->first();

        if ($completedObjectif === null) {
            $completedObjectif = new CompletedObjectif();
            $completedObjectif->user_id = Auth::user()->id;
            $completedObjectif->objectif_id = $objectif->id;
            $completedObjectif->save();
        }
        else {
            $completedObjectif->touch();
        }
        return $this->getMaxCompletedObjectif($request);
    }

    public function getMaxCompletedObjectif(Request $request) {
       return CompletedObjectif::where('user_id', '=', Auth::user()->id)->orderBy('objectif_id', 'desc')->first();
    }

}
