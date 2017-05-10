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
        Auth::loginUsingId(1);

        return Board::where('user_id', Auth::id())->get();
    }

    public function store(Request $request)
    {
        Auth::loginUsingId(1);

        $board = new Board();
        $board->title = $request->input('title');
        $board->user_id = Auth::id();
        $board->save();
        return $board;
    }

    public function show($id)
    {
        return Board::with(['versions' => function ($query) {
            $query->latest()->first();
        }])->findOrFail($id);
    }

    public function add_version(Request $request, $id)
    {
        $board = Board::findOrFail($id);

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
