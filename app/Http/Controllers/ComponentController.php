<?php

namespace App\Http\Controllers;

use App\Component;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Auth;

class ComponentController extends Controller
{
    public function index()
    {
        return Auth::user()->components()->get();
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:255',
            'truthtable' => 'required|max:255',
            'color' => 'required|max:10',
        ]);

        $component = new Component();
        $component->title = $request->input('title');
        $component->truthtable = $request->input('truthtable');
        $component->color = $request->input('color');
        $component->user_id = Auth::id();
        $component->is_selected = false;
        $component->save();
        return $component;
    }

    public function show($id)
    {
        // 
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
