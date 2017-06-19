<?php

namespace App\Http\Controllers;

use App\Board;
use App\BoardData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    public function index()
    {
        return Auth::user()->boards()->get();
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|alpha_dash|max:255'
        ]);

        $board = new Board();
        $board->title = $request->input('title');
        $board->user_id = Auth::id();
        $board->save();
        return $board;
    }

    public function show($id)
    {
        return Auth::user()->boards()->with(['versions' => function ($query) {
            return $query->latest()->first();
        }])->findOrFail($id);
    }

    public function add_version(Request $request, $id)
    {
        $board = Auth::user()->boards()->findOrFail($id);

        $data = new BoardData();
        $data->data = $request->input('data');
        $data->board_id = $board->id;
        $data->save();

        return $board;
    }

    public function update(Request $request, Board $board)
    {
        //
    }

    public function destroy(Board $board)
    {
        //
    }
}
