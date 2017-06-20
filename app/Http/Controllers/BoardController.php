<?php

namespace App\Http\Controllers;

use App\Board;
use App\BoardData;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class BoardController extends Controller
{
    public function index()
    {
        return Auth::user()->boards()->get();
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:255'
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

        $temp = tempnam(sys_get_temp_dir(), 'plugboard_');
        Image::make($request->input('preview'))->save($temp);
        $preview_path = Storage::putFile('public/preview', new File($temp), 'public');
        unlink($temp);

        $data = new BoardData();
        $data->data = $request->input('data');
        $data->board_id = $board->id;
        $data->preview_path = $preview_path;

        if (!$data->save()) {
            return response([
                'code' => 'failed_add_version',
                'status' => 'Cannot create a new version in MongoDB'
            ], 500);
        }

        $board->last_version_id = $data->_id;
        $board->preview_path = $data->preview_path;

        if (!$board->save()) {
            return response([
                'code' => 'failed_add_version',
                'status' => 'Cannot update board in MySQL'
            ], 500);
        }
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
