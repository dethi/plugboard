<?php

namespace App\Http\Controllers;

use App\Component;
use App\ComponentData;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ComponentController extends Controller
{
    public function index()
    {
        return Auth::user()->components()->get();
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:30',
        ]);

        $component = new Component();
        $component->title = $request->input('title');
        $component->spec_name = str_replace(' ', '_', strtoupper($request->input('title')));
        $component->user_id = Auth::id();
        $component->is_selected = false;
        $component->save();
        return $component;
    }

    public function show($id)
    {
        return Auth::user()->components()->with(['versions' => function ($query) {
            return $query->latest()->first();
        }])->findOrFail($id);
    }

    public function select(Request $request, $id)
    {
        $component = Auth::user()->components()->with(['versions' => function ($query) {
            return $query->latest()->first();
        }])->findOrFail($id);

        $component->is_selected = $request->input('isSelected');
        $component->save();
        return $component;
    }

    public function add_version(Request $request, $id)
    {
        $component = Auth::user()->components()->findOrFail($id);

        $temp = tempnam(sys_get_temp_dir(), 'plugboard_');
        Image::make($request->input('preview'))->save($temp);
        $preview_path = Storage::putFile('public/preview', new File($temp), 'public');
        unlink($temp);

        $data = new ComponentData();
        $data->data = $request->input('data');
        $data->component_id = $component->id;
        $data->preview_path = $preview_path;

        if (!$data->save()) {
            return response([
                'code' => 'failed_add_version',
                'status' => 'Cannot create a new version in MongoDB'
            ], 500);
        }

        $component->last_version_id = $data->_id;
        $component->preview_path = $data->preview_path;

        if (!$component->save()) {
            return response([
                'code' => 'failed_add_version',
                'status' => 'Cannot update board in MySQL'
            ], 500);
        }
        return $component;
    }

    public function get_elementaire()
    {
        return DB::table('el_components')->get();
    }


    public function update(Request $request, Component $component)
    {
        //
    }

    public function destroy(Component $component)
    {
        //
    }
}
