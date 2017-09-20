<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function update(Request $request)
    {


        $input = $request->only('name', 'email', 'old_password', 'new_password', 'wants_autosav');

        if (isset($input['new_password'])) {
             $this->validate($request, [
            'old_password' => 'required|min:6',
            'new_password' => 'required|min:6|confirmed'
        ]);
        }
        $this->validate($request, [
            'name' => 'required|max:255',
            'wants_autosav' => 'required|boolean'
        ]);

        $user = Auth::user();
        $user->name = $input['name'];
        $user->wants_autosav = $input['wants_autosav'];
        $user->save();

        return $user->makeVisible('api_token');;
    }
}
