<?php

namespace App\Http\Controllers;

use App\Objectif;
use App\Score;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class ScoreController extends Controller
{
    
    public function setScore(Request $request)
    {
        $this->validate($request, [
            'objectifId' => 'required',
            'score' => 'required'
        ]);

        $input = $request->only('objectifId', 'score');

        $score = Score::where('user_id', '=', Auth::user()->id)
                                ->where('objectif_id', '=', $input['objectifId'])->first();
        
        if ($score === null) {
            $score = new Score();
            $score->user_id = Auth::user()->id;
            $score->objectif_id = $input['objectifId'];
        }
        if ($score->score < $input['score']) {
            $score->score = $input['score'];
        }

        $score->save();
         return $this->getScoresByUser();
    }
/*
    public function getMaxCompletedObjectif(Request $request) {
       return CompletedObjectif::where('user_id', '=', Auth::user()->id)->orderBy('objectif_id', 'desc')->first();
    }
*/
     public function getScoresByUser() {
       return Score::where('user_id', '=', Auth::user()->id)->get();
    }

}
