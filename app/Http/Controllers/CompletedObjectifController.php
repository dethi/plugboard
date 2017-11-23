<?php

namespace App\Http\Controllers;

use App\Objectif;
use App\CompletedObjectif;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class CompletedObjectifController extends Controller
{
    
    public function setObjectifAsCompleted(Request $request)
    {
        $this->validate($request, [
            'objectifId' => 'required',
            'score' => 'required'
        ]);

        $input = $request->only('objectifId', 'score');

        $completedObjectif = CompletedObjectif::where('user_id', '=', Auth::user()->id)
                                ->where('objectif_id', '=', $input['objectifId'])->first();
        
        if ($completedObjectif === null) {
            $completedObjectif = new CompletedObjectif();
            $completedObjectif->user_id = Auth::user()->id;
            $completedObjectif->objectif_id = $input['objectifId'];
        }
        if ($completedObjectif->score < $input['score']) {
            $completedObjectif->score = $input['score'];
        }

        $completedObjectif->save();
         return DB::table('objectifs')
                    ->leftJoin('completed_objectifs', 'objectifs.id', '=', 'completed_objectifs.objectif_id')
                    ->select('objectifs.*' , 'completed_objectifs.score as score')
                    ->get();
    }

    public function getMaxCompletedObjectif(Request $request) {
       return CompletedObjectif::where('user_id', '=', Auth::user()->id)->orderBy('objectif_id', 'desc')->first();
    }

}
