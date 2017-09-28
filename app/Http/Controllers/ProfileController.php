<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'wants_autosav' => 'required|boolean'
        ]);

        $input = $request->only('name', 'email', 'old_password', 'new_password', 'wants_autosav');

        $user = Auth::user();
        if (isset($input['new_password'])) {
            $this->validate($request, [
                'old_password' => 'required|min:6',
                'new_password' => 'required|min:6|confirmed'
            ]);
            if (Hash::check($input['old_password'], $user->password)) {
                $user->password = bcrypt($input['new_password']);
            }
            else {
                return response([
                    'code' => 'failed_old_password',
                    'status' => 'Wrong password'
                ], 401);
            }
        }

        $user->name = $input['name'];
        $user->wants_autosav = $input['wants_autosav'];
        $user->save();

        return $user->makeVisible('api_token');;
    }
}
