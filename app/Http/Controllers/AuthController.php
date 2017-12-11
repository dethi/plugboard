<?php

namespace App\Http\Controllers;

use App\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $input = $request->only('email', 'password');
        if (Auth::attempt($input, false)) {
            $user = Auth::user();
            if (empty($user->api_token)) {
                $user->api_token = str_random(60);
                $user->save();
            }
            return $user->makeVisible('api_token');
        }

        return response([
            'code' => 'failed_login',
            'status' => 'Wrong email/password combination'
        ], 401);
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        $input = $request->only('name', 'email', 'password');

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => bcrypt($input['password']),
            'api_token' => str_random(60),
        ]);

        return $user->makeVisible('api_token');
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255'
        ]);
        $input = $request->only('name', 'old_password', 'new_password');
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
        $user->save();
        return $user->makeVisible('api_token');;
    }
}
